const listeners = {}
let addListenersQueue = []
let wargameName = ''
const { wargameSettings, INFO_MESSAGE, dbSuffix, settings, CUSTOM_MESSAGE, databaseUrlPrefix } = require('../consts')

const pouchDb = (app, io, pouchOptions) => {
  const PouchDB = require('pouchdb-core')
    .plugin(require('pouchdb-adapter-node-websql'))
    .plugin(require('pouchdb-adapter-http'))
    .plugin(require('pouchdb-mapreduce'))
    .plugin(require('pouchdb-replication'))
    .defaults(pouchOptions)
  require('pouchdb-all-dbs')(PouchDB)

  const pouchHandle = require('express-pouchdb')(PouchDB, {
    overrideMode: {
      include: ['routes/fauxton']
    }
  })

  const fauxtonIntercept = (req, res, next) => {
    const FauxtonBundlePath = 'js/bundle-34997e32896293a1fa5d71f79eb1b4f7.js'

    if (req.url.endsWith(`_utils/dashboard.assets/${FauxtonBundlePath}`)) {
      const bundlePath = require('path').join(__dirname, '../node_modules/pouchdb-fauxton/www/dashboard.assets/', FauxtonBundlePath)
      let jsFile
      try {
        jsFile = require('fs').readFileSync(bundlePath).toString()
      } catch (err) {
        console.error(`Could not read Fauxton bundle file at ${bundlePath}: ${err.message}`)

        jsFile = ''
      }
      /* eslint-disable no-useless-escape */
      res.send(jsFile
        .replace('host:"../.."', 'host:".."')
        .replace('root:"/_utils"', `root:"${databaseUrlPrefix}/_utils"`)
        .replace(/url:\"\/_session/g, `url:"${databaseUrlPrefix}/_session`)
        .replace(/url:\"\/_replicator/g, `url:"${databaseUrlPrefix}/_replicator`)
        .replace(/window\.location\.origin\+\"\/_replicator/g, `window.location.origin+"${databaseUrlPrefix}/_replicator`)
        .replace(/url:\"\/_users/g, `url:"${databaseUrlPrefix}/_users`)
        .replace('window.location.origin+"/"+o.default.utils.safeURLName', `window.location.origin+"${databaseUrlPrefix}/"+o.default.utils.safeURLName`))
      return
    }
    return pouchHandle(req, res, next)
  }

  app.use(databaseUrlPrefix, fauxtonIntercept)

  // changesListener
  const initChangesListener = (dbName) => {
    const db = new PouchDB(dbName, pouchOptions)
    // saving listener
    listeners[dbName] = db.changes({
      since: 'now',
      live: true,
      timeout: false,
      heartbeat: false,
      include_docs: true
    }).on('change', (result) => io.emit(wargameName, result.doc))
  }

  // check listeners queue to add a new listenr
  setInterval(() => {
    if (addListenersQueue.length) {
      for (const dbName of addListenersQueue) {
        initChangesListener(dbName)
      }
      // clean queue
      addListenersQueue = []
    }
  }, 5000)

  PouchDB.allDbs().then(dbs => {
    dbs.forEach(db => initChangesListener(db))
  }).catch(err => console.log('Error on load alldbs', err))

  const checkSqliteExists = (dbName) => {
    return dbName.indexOf('wargame') !== -1 && dbName.indexOf(dbSuffix) === -1 ? dbName + dbSuffix : dbName
  }

  /**
 * @swagger
 * /{wargame}:
 *   put:
 *     tags:
 *       - Database Operations
 *     summary: Update wargame
 *     description: Updates or creates a document in the specified wargame database.
 *     parameters:
 *       - in: path
 *         name: wargame
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the wargame database to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *             description: The document to be inserted or updated in the wargame database.
 *     responses:
 *       200:
 *         description: Successfully updated or saved the document.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Message indicating the operation performed (Updated or Saved).
 *                 data:
 *                   type: object
 *                   additionalProperties: true
 *                   description: The updated or saved document.
 */
  app.put('/:wargame', async (req, res) => {
    const databaseName = checkSqliteExists(req.params.wargame)
    const db = new PouchDB(databaseName, pouchOptions)
    const putData = req.body
    wargameName = req.params.wargame

    if (!putData._id) {
      return res.status(400).send({ error: '_id is required for PUT requests' })
    }

    if (!listeners[databaseName]) {
      addListenersQueue.push(databaseName)
    }

    const retryUntilWritten = (db, doc) => {
      return db.get(doc._id).then((origDoc) => {
        doc._rev = origDoc._rev
        return db.put(doc).then(async (result) => {
          doc._id = result.id
          doc._rev = result.rev
          await db.compact()
          res.send({ msg: 'Updated', data: doc })
        })
      }).catch(err => {
        if (err.status === 409) {
          return retryUntilWritten(db, doc)
        } else { // new doc
          return db.put(doc)
            .then((result) => {
              doc._id = result.id
              doc._rev = result.rev
              res.send({ msg: 'Saved', data: doc })
            })
            .catch(() => {
              const settingsDoc = {
                ...doc,
                _id: settings
              }
              return retryUntilWritten(db, settingsDoc)
            })
        }
      })
    }
    retryUntilWritten(db, putData)
  })

  // Define a route to handle bulk document updates in a specified database
  /**
 * @swagger
 * /bulkDocs/{dbname}:
 *   put:
 *     tags:
 *       - Database Operations
 *     summary: Bulk document update
 *     description: Updates multiple documents in a specified database in bulk.
 *     parameters:
 *       - in: path
 *         name: dbname
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the database to update documents in.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *             description: Array of documents to update.
 *     responses:
 *       200:
 *         description: Successfully updated documents.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Status message.
 *       500:
 *         description: Error occurred while updating documents.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 data:
 *                   type: object
 *                   description: Error details.
 */
  app.put('/bulkDocs/:dbname', async (req, res) => {
    const databaseName = checkSqliteExists(req.params.dbname)
    const db = new PouchDB(databaseName, pouchOptions)
    // Get the array of documents from the request body
    const docs = req.body
    if (!listeners[databaseName]) {
      addListenersQueue.push(databaseName)
    }

    // Check if there are any documents to update
    if (docs.length === 0) {
      // nothing to do
      res.send({ msg: 'OK' })
    } else {
      // If there are documents, update them in bulk
      return db.bulkDocs(docs).then(async () => {
        // If the bulk update succeeds, emit an event to notify clients of the update
        io.emit(req.params.dbname, docs)

        // Compact the database to free up disk space
        await db.compact()
        res.send({ msg: 'OK' })
      }).catch(err => {
        // If there is an error with the bulk update, send a response with an error message and data
        res.send({ msg: 'err', data: err })
      })
    }
  })

  /**
 * @swagger
 * /replicate/{replicate}/{dbname}:
 *   get:
 *     tags:
 *       - Database Operations
 *     summary: Replicate database
 *     description: Replicates data from an existing database to a new database.
 *     parameters:
 *       - in: path
 *         name: replicate
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the new database to replicate data into.
 *       - in: path
 *         name: dbname
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the existing database to replicate data from.
 *     responses:
 *       200:
 *         description: Successfully replicated the database.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Replicated
 *       400:
 *         description: Error occurred during replication.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 *                 data:
 *                   type: object
 *                   description: Error details
 *                   example:
 *                     status: 500
 *                     name: replication_error
 *                     message: replication target could not be found
 */
  app.get('/replicate/:replicate/:dbname', (req, res) => {
    const newDbName = checkSqliteExists(req.params.replicate) // new db name
    const newDb = new PouchDB(newDbName, pouchOptions)
    const existingDatabase = checkSqliteExists(req.params.dbname) // copy data from
    newDb.replicate.from(existingDatabase).then(() => {
      res.send('Replicated')
    }).catch(err => res.status(400).send({ msg: 'Error on replication', data: err }))
  })

  /**
 * @swagger
 * /delete/{dbName}:
 *   delete:
 *     tags:
 *       - Database Operations
 *     summary: Delete database
 *     description: Deletes a specified database.
 *     parameters:
 *       - in: path
 *         name: dbName
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the database to delete.
 *     responses:
 *       200:
 *         description: Successfully deleted the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: ok
 *                 data:
 *                   type: string
 *                   description: Name of the deleted database.
 *       400:
 *         description: Error occurred during deletion.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: error
 *                 data:
 *                   type: object
 *                   description: Error details.
 */
  app.delete('/delete/:dbName', (req, res) => {
    const dbName = checkSqliteExists(req.params.dbName)
    const db = new PouchDB(dbName, pouchOptions)
    db.destroy().then(() => {
      res.send({ msg: 'ok', data: dbName })
    }).catch((err) => res.status(400).send({ msg: 'error', data: err }))
  })

  /**
 * @swagger
 * /clearAll:
 *   delete:
 *     tags:
 *       - Database Operations
 *     summary: Clear all databases
 *     description: Resets all databases.
 *     responses:
 *       200:
 *         description: Successfully reset all databases.
 *       500:
 *         description: Error occurred during resetting of databases.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Error on clearAll {error message}
 */
  app.delete('/clearAll', (req, res) => {
    PouchDB.resetAllDbs()
      .then(() => res.send())
      .catch(err => res.status(500).send(`Error on clearAll ${err}`))
  })

  // get all wargame names
  /**
 * @swagger
 * /allDbs:
 *   get:
 *     tags:
 *       - Database Operations
 *     summary: Get all wargame names
 *     description: Retrieves the names of all wargame databases.
 *     responses:
 *       200:
 *         description: Successfully retrieved all database names.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: ok
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: List of database names.
 *       500:
 *         description: Error occurred during retrieval of database names.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
  app.get('/allDbs', async (req, res) => {
    PouchDB.allDbs().then(dbs => {
      const dbList = dbs.map(dbName => dbName.replace(dbSuffix, ''))
      res.send({ msg: 'ok', data: dbList || [] })
    }).catch(() => res.send([]))
  })

  /**
 * @swagger
 * /wargameList:
 *   get:
 *     tags:
 *       - Database Operations
 *     summary: Get wargame list
 *     description: Retrieves a list of all wargame databases with their details.
 *     responses:
 *       200:
 *         description: Successfully retrieved wargame list.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       title:
 *                         type: string
 *                       initiated:
 *                         type: boolean
 *                       shortName:
 *                         type: string
 *                 allDbs:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
  app.get('/wargameList', async (req, res) => {
    const allDbsPromise = PouchDB.allDbs()
    const wargameListPromise = allDbsPromise
      .then(dbList => {
        const dbLists = dbList.map(dbName => dbName.replace(dbSuffix, ''))
        const wargameDbs = dbLists.filter(name => name.includes('wargame'))
        const reversedWargameDbs = wargameDbs.reverse()
        const serverPath = `${req.protocol}://${req.get('host')}`
        return Promise.all(reversedWargameDbs.map(async db => {
          const databaseName = checkSqliteExists(db)
          if (!databaseName) {
            return null
          }
          const dbInstance = new PouchDB(databaseName)
          return dbInstance.find({
            selector: {
              $or: [{ messageType: INFO_MESSAGE }, { _id: wargameSettings }],
              _id: { $gte: null }
            },
            sort: [{ _id: 'desc' }],
            fields: ['wargameTitle', 'wargameInitiated', 'name', '_id'],
            limit: 2
          })
            .then(result => {
              if (result.docs && result.docs.length > 0) {
                const lastWargame = result.docs.length > 1 && result.docs[0]._id === wargameSettings ? result.docs[1] : result.docs[0]
                return {
                  name: `${serverPath}/db/${db}`,
                  title: lastWargame.wargameTitle,
                  initiated: lastWargame.wargameInitiated,
                  shortName: lastWargame.name
                }
              } else {
                return null
              }
            })
            .catch(error => {
              console.error(`Error fetching data for database ${db}:`, error)
              return Promise.reject(error)
            })
        }))
      })
    Promise.all([allDbsPromise, wargameListPromise])
      .then(([allDbs, aggregatedData]) => {
        const filteredData = aggregatedData.filter(data => data !== null)
        const wargameList = allDbs.map(dbName => dbName.replace(dbSuffix, ''))
        res.status(200).json({ data: filteredData, allDbs: wargameList })
      })
      .catch(err => {
        console.error('Error on load alldbs:', err)
        res.status(500).json({ error: 'Internal Server Error' })
      })
  })

  // get all message documents for wargame

  /**
 * Middleware for retrieving all message documents for a wargame.
 * @swagger
 * /{wargame}:
 *   get:
 *     tags:
 *       - Database Operations
 *     summary: Retrieve all message documents for the specified wargame.
 *     parameters:
 *       - in: path
 *         name: wargame
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the wargame to retrieve message documents for.
 *     responses:
 *       200:
 *         description: Successfully retrieved message documents.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Indicates the operation result ('ok').
 *                 data:
 *                   type: array
 *                   description: Array of message documents.
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Document ID.
 *                       _rev:
 *                         type: string
 *                         description: Document revision.
 */
  app.get('/:wargame', async (req, res) => {
    const databaseName = checkSqliteExists(req.params.wargame)

    if (!databaseName) {
      return res.status(404).send({ msg: 'Wrong Wargame Name', data: null })
    }

    const db = new PouchDB(databaseName, pouchOptions)

    db.allDocs({ include_docs: true, attachments: true })
      .then(result => {
        // unpack the documents
        const docs = result.rows.map((item) => item.doc)
        // drop wargame & info messages
        // NO, don't. We need the info messages, for the turn markers
        // const ignoreTypes = [] //INFO_MESSAGE, COUNTER_MESSAGE]
        // const messages = docs.filter((doc) => !ignoreTypes.includes(doc.messageType))
        res.send({ msg: 'ok', data: docs })
      }).catch(() => res.send([]))
  })

  /**
 * @swagger
 * /{wargame}/last:
 *   get:
 *     tags:
 *       - Database Operations
 *     summary: Get the last wargame
 *     description: Retrieves the last document for the specified wargame.
 *     parameters:
 *       - in: path
 *         name: wargame
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the wargame database.
 *     responses:
 *       200:
 *         description: Successfully retrieved the last wargame document.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       wargameTitle:
 *                         type: string
 *                       wargameInitiated:
 *                         type: boolean
 *                       name:
 *                         type: string
 *       404:
 *         description: Wrong wargame name.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Wrong Wargame Name
 *                 data:
 *                   type: null
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
  app.get('/:wargame/last', (req, res) => {
    const databaseName = checkSqliteExists(req.params.wargame)

    if (!databaseName) {
      res.status(404).send({ msg: 'Wrong Wargame Name', data: null })
    }

    const db = new PouchDB(databaseName, pouchOptions)
    // NOTE: if we end up with a performance problem from the "reverse sort" processing
    // NOTE: here is a suggested alternate strategy:
    // NOTE: for each "new wargame" we push two documents: the wargame with date-time id
    // NOTE: "and" one with a fixed id "settings"
    // NOTE: So, when calling 'last' we first try to retrieve "settings", if it's not there
    // NOTE: then we do reverse-sort to find the latest one.
    // NOTE: If we do "wind-back" of wargame, delete "settings"
    db.find({
      selector: {
        $or: [{ messageType: INFO_MESSAGE }, { _id: wargameSettings }],
        _id: { $gte: null }
      },
      sort: [{ _id: 'desc' }],
      limit: 2
    }).then((result) => {
      if (result.docs && result.docs.length > 0) {
        const responseData = result.docs.length > 1 && result.docs[0]._id === wargameSettings ? [result.docs[1]] : [result.docs[0]]

        return res.send({ msg: 'ok', data: responseData })
      } else {
        return res.send([])
      }
    }
    ).catch(() => res.send([]))
  })

  /**
 * @swagger
 * /{wargame}/lastDoc/{id}:
 *   get:
 *     tags:
 *       - Database Operations
 *     summary: Get the last document or documents since a specific ID
 *     description: Retrieves the latest document or all documents since a specific ID for the specified wargame.
 *     parameters:
 *       - in: path
 *         name: wargame
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the wargame database.
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: false
 *         description: The ID to retrieve documents since.
 *     responses:
 *       200:
 *         description: Successfully retrieved the document(s).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: ok
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       [other properties based on your schema]:
 *                         type: [appropriate type]
 *       404:
 *         description: Wrong wargame name.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Wrong Wargame Name
 *                 data:
 *                   type: null
 *       500:
 *         description: Error fetching documents.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Error fetching documents
 *                 data:
 *                   type: object
 */
  app.get('/:wargame/lastDoc/:id?', async (req, res) => {
    const databaseName = checkSqliteExists(req.params.wargame)

    if (!databaseName) {
      return res.status(404).send({ msg: 'Wrong Wargame Name', data: null })
    }
    const db = new PouchDB(databaseName, pouchOptions)
    // If an _id is provided, return all documents since that _id
    if (req.params.id) {
      try {
        const result = await db.find({
          selector: {
            _id: { $gt: req.params.id }
          },
          sort: [{ _id: 'asc' }]
        })
        return res.send({ msg: 'ok', data: result.docs })
      } catch (error) {
        console.error(`Error fetching documents since ID ${req.params.id}:`, error)
        return res.status(500).send({ msg: 'Error fetching documents', data: error })
      }
    }

    // If no ID is provided, return the latest document
    try {
      const result = await db.find({
        selector: {
          _id: { $gte: null }
        },
        sort: [{ _id: 'desc' }],
        limit: 1
      })

      return res.send({ msg: 'ok', data: result.docs })
    } catch (error) {
      console.error('Error fetching the latest document:', error)
      return res.status(500).send({ msg: 'Error fetching the latest document', data: error })
    }
  })

  /**
 * @swagger
 * /{wargame}/turns:
 *   get:
 *     tags:
 *       - Database Operations
 *     summary: Get game turns for a specified wargame
 *     description: Retrieves all game turns for the specified wargame.
 *     parameters:
 *       - in: path
 *         name: wargame
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the wargame database.
 *     responses:
 *       200:
 *         description: Successfully retrieved the game turns.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: ok
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       gameTurn:
 *                         type: integer
 *                       gameTurnTime:
 *                         type: string
 *                       gameDate:
 *                         type: string
 *       404:
 *         description: Wrong wargame name.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Wrong Wargame Name
 *                 data:
 *                   type: null
 */
  app.get('/:wargame/turns', (req, res) => {
    const databaseName = checkSqliteExists(req.params.wargame)

    if (!databaseName) {
      res.status(404).send({ msg: 'Wrong Wargame Name', data: null })
    }

    const db = new PouchDB(databaseName, pouchOptions)

    db.find({
      selector: {
        adjudicationStartTime: { $exists: true }
      },
      fields: ['data', 'gameTurn']

    }).then((result) => {
      const uniqBy = (data, key) => {
        return [
          ...new Map(
            data.map(x => [key(x),
              {
                gameTurn: x.gameTurn,
                gameTurnTime: x.data.overview.gameTurnTime,
                gameDate: x.data.overview.gameDate

              }])
          ).values()
        ]
      }
      const resaultData = uniqBy(result.docs, it => it.gameTurn)

      res.send({ msg: 'ok', data: resaultData })
    })
      .catch(() => res.send([]))
  })

  /**
 * @swagger
 * /{wargame}/{dbname}/logs:
 *   get:
 *     tags:
 *       - Database Operations
 *     summary: Get logs for a specific database within a wargame
 *     description: Retrieves logs for a specified database within the specified wargame.
 *     parameters:
 *       - in: path
 *         name: wargame
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the wargame.
 *       - in: path
 *         name: dbname
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the database within the wargame.
 *     responses:
 *       200:
 *         description: Successfully retrieved the logs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: ok
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       [fields based on your log schema]:
 *                         type: [appropriate type]
 *       404:
 *         description: Wrong database name.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Wrong Player Name
 *                 data:
 *                   type: null
 */
  app.get('/:wargame/:dbname/logs', (req, res) => {
    const databaseName = checkSqliteExists(req.params.dbname)

    if (!databaseName) {
      res.status(404).send({ msg: 'Wrong Player Name', data: null })
    }

    console.log('databaseName', databaseName)
    console.log('req.params.wargame', req.params.wargame)
    const db = new PouchDB(databaseName, pouchOptions)

    db.find({
      selector: {
        wargame: req.params.wargame
      }
    }).then((result) => {
      res.send({ msg: 'ok', data: result.docs })
    })
      .catch(() => res.send([]))
  })

  /**
 * @swagger
 * /{wargame}/{force}/{id}/counter:
 *   get:
 *     tags:
 *       - Database Operations
 *     summary: Get the message counter for a specified force in a wargame
 *     description: Retrieves the message counter for the specified force in the given wargame.
 *     parameters:
 *       - in: path
 *         name: wargame
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the wargame database.
 *       - in: path
 *         name: force
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the force.
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the message.
 *     responses:
 *       200:
 *         description: Successfully retrieved the message counter.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: ok
 *                 data:
 *                   type: integer
 *       404:
 *         description: Wrong wargame name.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Wrong Wargame Name
 *                 data:
 *                   type: null
 */
  app.get('/:wargame/:force/:id/counter', (req, res) => {
    const databaseName = checkSqliteExists(req.params.wargame)

    if (!databaseName) {
      res.status(404).send({ msg: 'Wrong Wargame Name', data: null })
    }

    const db = new PouchDB(databaseName, pouchOptions)
    let messageDefaultCount = 1

    db.get(req.params.id)
      .then(data => res.send({ msg: 'ok', data: data.details.counter }))
      .catch(() => {
        db.find({
          selector: {
            messageType: CUSTOM_MESSAGE,
            details: {
              from: { force: req.params.force },
              counter: { $exists: true }
            },
            _id: { $ne: settings }
          },
          fields: ['details.counter']
        }).then((result) => {
          if (result.docs.length) {
            const Biggestcount = Math.max(...result.docs.map(data => data.details.counter))
            if (Biggestcount) {
              messageDefaultCount += Biggestcount
            }
          }
          res.send({ msg: 'ok', data: messageDefaultCount })
        })
          .catch(() => res.send([]))
      })
  })

  /**
 * @swagger
 * /{wargame}/{dbname}/logs-latest:
 *   get:
 *     tags:
 *       - Database Operations
 *     summary: Get the latest logs for a specific database within a wargame
 *     description: Retrieves the latest logs for a specified database within the specified wargame.
 *     parameters:
 *       - in: path
 *         name: wargame
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the wargame.
 *       - in: path
 *         name: dbname
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the database within the wargame.
 *     responses:
 *       200:
 *         description: Successfully retrieved the latest logs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: ok
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       role:
 *                         type: string
 *                       activityTime:
 *                         type: string
 *                       activityType:
 *                         type: string
 *       404:
 *         description: Wrong database name.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Wrong Player Name
 *                 data:
 *                   type: null
 */
  app.get('/:wargame/:dbname/logs-latest', (req, res) => {
    const databaseName = checkSqliteExists(req.params.dbname)

    if (!databaseName) {
      res.status(404).send({ msg: 'Wrong Player Name', data: null })
    }
    console.log('databaseName', databaseName)
    console.log('req.params.wargame', req.params.wargame)
    const db = new PouchDB(databaseName, pouchOptions)

    db.find({
      selector: {
        wargame: req.params.wargame
      },
      fields: ['role', 'activityTime', 'activityType']
    }).then((result) => {
      const uniqByKeepLast = (data, key) => {
        return [
          ...new Map(
            data.map(x => [key(x), x])
          ).values()
        ]
      }

      const lastLogs = result.docs && uniqByKeepLast(result.docs, it => it.role)

      res.send({ msg: 'ok', data: lastLogs })
    })
      .catch(() => res.send([]))
  })

  // get document for wargame
  /**
 * @swagger
 * /get/{wargame}/{id}:
 *   get:
 *     tags:
 *       - Database Operations
 *     summary: Get document for a specified wargame
 *     description: Retrieves a document for the specified wargame and document ID.
 *     parameters:
 *       - in: path
 *         name: wargame
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the wargame database.
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the document.
 *     responses:
 *       200:
 *         description: Successfully retrieved the document.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: ok
 *                 data:
 *                   type: object
 *       404:
 *         description: Wrong ID or wargame name.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Wrong Id or Wargame
 *                 data:
 *                   type: null
 */
  app.get('/get/:wargame/:id', (req, res) => {
    const databaseName = checkSqliteExists(req.params.wargame)
    const db = new PouchDB(databaseName, pouchOptions)
    const id = `${req.params.id}`

    if (!id || !databaseName) {
      res.status(404).send({ msg: 'Wrong Id or Wargame', data: null })
    }

    db.get(id)
      .then(data => res.send({ msg: 'ok', data: data }))
      .catch(() => {
        // TODO: if the id doesn't exist, it looks for 'settings', but we
        // TODO: won't have a 'settings' document.
        db.get(settings)
          .then(data => res.send({ msg: 'ok', data: data }))
          .catch((err) => res.send({ msg: 'err', data: err }))
      })
  })
}

module.exports = pouchDb
