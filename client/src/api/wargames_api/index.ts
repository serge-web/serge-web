/* eslint-disable no-unused-vars */
import { ADJUDICATION_PHASE, clearAll, COUNTER_MESSAGE, CUSTOM_MESSAGE, wargameList, databasePath, FEEDBACK_MESSAGE, hiddenPrefix, INFO_MESSAGE, MSG_STORE, MSG_TYPE_STORE, PLANNING_PHASE, SERGE_INFO, serverPath, wargameSettings, dbDefaultSettings } from 'src/config'
import { deleteRoleAndParts, duplicateThisForce } from 'src/Helpers'
import _ from 'lodash'
import moment from 'moment'
import fetch, { Response } from 'node-fetch'
import uniqid from 'uniqid'
import deepCopy from '../../Helpers/copyStateHelper'

import {
  setCurrentWargame, setLatestFeedbackMessage, setLatestWargameMessage
} from '../../ActionsAndReducers/playerUi/playerUi_ActionCreators'
import { saveAllWargameNames } from '../../ActionsAndReducers/dbWargames/wargames_ActionCreators'
import { ActivityLogsInterface, WargameDispatch, ChannelTypes, ForceData, GameTurnLength, Message, MessageChannel, MessageCustom, MessageDetailsFrom, MessageDetails, MessageFeedback, MessageInfoType, MessageStructure, ParticipantChat, ParticipantTypes, PlayerLogEntries, PlayerUiDispatch, Role, Wargame, WargameOverview, WargameRevision, MappingMessage, MappingMessageDelta, TypeOfCustomMessage, WargameList } from 'src/custom-types'
import {
  ApiWargameDb, ApiWargameDbObject, ListenNewMessageType
} from './types.d'

import incrementGameTime from '../../Helpers/increment-game-time'
import DbProvider from '../db'

const wargameDbStore: ApiWargameDbObject[] = []

const rejectDefault = (err: string): any => {
  console.log(err)
  return err
}

// get db name from path
const getNameFromPath = (dbPath: string): string => {
  if (!dbPath) throw new Error('Wrong dbPath')
  const path: string = new URL(dbPath).pathname
  const index: number = path.lastIndexOf('/')
  if (index === -1) throw new Error('Wrong dbPath')
  return path.substring(index + 1)
}

// get database object by :name key
const getWargameDbByName = (name: string): ApiWargameDbObject => {
  name = name.replace(hiddenPrefix, '')
  const dbObject = wargameDbStore.find((item) => item.name === name)
  if (dbObject === undefined) throw new Error(`wargame database with '${name}' not found`)
  return dbObject
}

// get database object by database path
// const getWargameDbByDbPath = (dbPath: string): WargameDb => {
//   const name: string = getNameFromPath(dbPath)
//   return getWargameDbByName(name)
// }

// add a new wargame database
export const addWargameDbStore = (wargameDbObject: ApiWargameDbObject) => {
  wargameDbStore.unshift(wargameDbObject)
}

// remove wargame database
export const deleteWargame = async (wargamePath: string): Promise<string> => {
  const name: string = getNameFromPath(wargamePath) 
  const wargame = getWargameDbByName(name) 
  
  if (!wargame) {
    throw new Error(`Wargame '${name}' not found`)
  }

  await wargame.db.destroy() 

  const index = wargameDbStore.findIndex((item) => item.name === name) 
  if (index !== -1) {
    wargameDbStore.splice(index, 1) 
  } else {
    throw new Error(`Wargame '${name}' not found in the store`)
  }

  return name 
}

export const listenNewMessage = ({ db, dispatch }: ListenNewMessageType): void => {
  db.changes((msg) => {
    const doc = msg as Message
    if (doc === undefined) return
    if (doc.messageType === INFO_MESSAGE) {
      const infoM = doc as MessageInfoType
      dispatch(setCurrentWargame(doc as Wargame))
      const asAny = infoM as any
      const asMsg = asAny as MessageChannel
      dispatch(setLatestWargameMessage(asMsg))
      return
    }

    if (doc.messageType === FEEDBACK_MESSAGE) {
      const feedbackM = doc as MessageFeedback
      dispatch(setLatestFeedbackMessage(feedbackM))
    } else if (doc.messageType === COUNTER_MESSAGE) {
      // eslint-disable-next-line no-useless-return
      return
    } else {
      dispatch(setLatestWargameMessage(doc as MessageChannel))
    }
  })
}

export const listenForWargameChanges = (name: string, dispatch: PlayerUiDispatch): void => {
  const wargame = getWargameDbByName(name)
  const db = wargame.db
  listenNewMessage({ db, name, dispatch })
}

/** dual function method, to both check the server is still running, and to push
 * details of recent player activity
 * @param log a list of the most recent interactions
 * @param logAllActivity whether to store all events since last ping, or just the most recent one
 * @returns the server response
 */
export const pingServer2 = async (log: ActivityLogsInterface, logAllActivity: boolean): Promise<string> => { 
  const allItems = log.items
  
  // if we're not storing all activity, just store the latest item
  const items: PlayerLogEntries = logAllActivity ? allItems : allItems.length > 0 ? [allItems[allItems.length - 1]] : []

  // get the wargame to operate upon
  const { db } = getWargameDbByName(log.currentDbname)
 
  // In addition to pushing data to the server, we're also checking the server is still alive
  // So, even if the log is empty, we should push an empty list, since still we want to get a 
  // 'success' back from the server
  return db.bulkDocs(items).then(res => res.msg)
}
 
export const getPlayerActivityLogs = async (wargame: string, dbName: string, query: string): Promise<PlayerLogEntries> => {
  const { db } = getWargameDbByName(dbName)

  return await db.getPlayerLogs(wargame, query)
    .then(res => res)
    .catch(err => err)
}

export const fetchWargameList = async (): Promise<any> => {
  const additionalDataRes = await fetch(serverPath + wargameList)
  const additionalData = await additionalDataRes.json()
  return additionalData
}

export const populateWargameList = (): Promise<string | Wargame[]> => {
  return fetchWargameList()
    .then(async (res) => { 
      const dbs = await res.allDbs
      const wargameNames: string[] = wargameDbStore.map((db) => db.name)
      const toCreateDiff: string[] = _.difference(dbs, wargameNames)
      const toCreate: string[] = _.pull(toCreateDiff, MSG_STORE, MSG_TYPE_STORE, SERGE_INFO, '_replicator', '_users')
      // Filter out only the databases that contain "wargame" in their names
      const wargameDbs: string[] = toCreate.filter(name => name.includes('wargame'))

      wargameDbs.forEach(name => {
        const db = new DbProvider(databasePath + name)
        wargameDbStore.unshift({ name, db })
      })
      return res.data
    })
    .catch((err: string) => {
      console.log(err)
      return err
    })
}

export const clearWargames = (): void => {
  fetch(serverPath + clearAll, { method: 'DELETE' }).then(() => {
    window.location.reload()
  })
}

export const downloadAllWargames = (): void => {
  window.open(serverPath + 'downloadAll')
}

export const openFauxtonUI = (): void => {
  window.open(serverPath + 'db/_utils/')
}

// Note: when the download button is cicked, the SQLITE database be downloaded in a zip format
// This function downloads a wargame by sending a GET request to the server
// with the wargame's name in the URL. The server will respond with the file's contents.
// This function allows a user to download a wargame database in zip format using the given database path as input.
export const downloadWargame = (dbPath: string): void => {
  const dbName = getNameFromPath(dbPath)

  // Construct the URL for downloading the file
  // `serverPath` is a global variable that holds the base URL for the server
  // The URL will look something like this: `http://example.com/download/wargame.db`
  window.open(serverPath + 'download' + '/' + dbName)
}

export const getIpAddress = (): Promise<{ ip: string }> => {
  return fetch(serverPath + 'getIp').then<{ ip: string }>((res: Response) => res.json())
}

// TODO: Need to check component 'ImageDropzone' it returns file with Any type
export const saveIcon = (file: string) => {
  return fetch(serverPath + 'saveIcon', {
    method: 'POST',
    headers: {
      'Content-Type': 'image/png'
    },
    body: file
  }).then((res: Response) => res.json())
}

export const createWargame = async (dispatch: WargameDispatch, wargameLists : WargameList[]): Promise<Wargame> => {
  const name = `wargame-${uniqid.time()}`
  const db = new DbProvider(databasePath + name)
  addWargameDbStore({ name, db })

  const settings: Wargame = { 
    ...dbDefaultSettings, 
    name, 
    wargameTitle: name, 
    phase: ADJUDICATION_PHASE 
  }
  
  return new Promise((resolve, reject) => {
    // TODO: this method returns the inserted wargame.  I believe we could
    // return that, instead of `getLatestWargameRevisiion`
    db.put(settings)
      .then((res) => {
        const wargame = res.data as Wargame
        const newWargameListItem: WargameList = {
          name: db.name,
          title: wargame.wargameTitle,
          initiated: wargame.wargameInitiated as boolean,
          shortName: wargame.name
        } 
        wargameLists.unshift(newWargameListItem)
        dispatch(saveAllWargameNames(wargameLists))
        resolve(wargame)
      }).catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}

export const checkIfWargameStarted = (dbName: string): Promise<boolean> => {
  return getAllMessages(dbName).then((messages) => {
    const latestWargame = messages.find((message) => (message.messageType === INFO_MESSAGE))
    return !!latestWargame
  })
}

// TODO: this gets all the messages from the server, then finds
// the newest wargame. I'm pretty sure that instead of that, we 
// should have a server-side end-point that returns latest wargame,
// then only one document goes over network.
export const getLatestWargameRevision = (dbName: string): Promise<Wargame> => {
  const { db } = getWargameDbByName(dbName)
  return db.lastWargame().then((message) => {
    if (message) return message
    // TODO: if we haven't got an INFO MESSAGE then the database hasn't been
    // TODO: created properly, and we should thrown an error
    return getWargameLocalFromName(dbName)
  }).catch(err => err)
}

export const editWargame = (dbPath: string): Promise<Wargame> => (
  getLatestWargameRevision(getNameFromPath(dbPath))
)

export const exportWargame = (dbPath: string): Promise<Wargame> => {
  const dbName = getNameFromPath(dbPath)
  return getAllMessages(dbName).then((messages) => {
    const nonInfoMessage = messages.filter((msg) => msg.messageType === INFO_MESSAGE) as Message[]
    return getLatestWargameRevision(dbName).then((game) => ({
      ...game, exportMessagelist: nonInfoMessage
    }))
  })
}

export const initiateGame = (dbName: string): Promise<MessageInfoType> => {
  const { db } = getWargameDbByName(dbName)
  return db.get(wargameSettings).then((res) => {
    const wargame = res as Wargame
    const initiatedWargame: Wargame = {
      ...wargame,
      phase: ADJUDICATION_PHASE,
      adjudicationStartTime: moment().format(),
      turnEndTime: moment().add(wargame.data.overview.realtimeTurnTime, 'ms').format(),
      wargameInitiated: true
    }
    return db.put(initiatedWargame).then(() => initiatedWargame)
  }).then((wargame) => {
    const messageInfoType: MessageInfoType = {
      ...wargame,
      _rev: undefined,
      _id: new Date().toISOString(),
      messageType: INFO_MESSAGE,
      gameTurn: 0
    }
    return db.put(messageInfoType).then(() => messageInfoType)
  }).catch((err) => {
    console.log(err)
    return err
  })
}

const updateWargame = (nextWargame: Wargame, dbName: string, revisionCheck = true): Promise<Wargame> => {
  const { db } = getWargameDbByName(dbName)
  return updateWargameByDb(nextWargame, dbName, revisionCheck, db)
}

const updateWargameByDb = (nextWargame: Wargame, dbName: string, revisionCheck = true, db: ApiWargameDb): Promise<Wargame> => {
  console.log('revisionCheck', revisionCheck)
  if (nextWargame.wargameInitiated) {
    // store with new id
    return createLatestWargameRevision(dbName, nextWargame)
  } else {
    // retain un-initiated status id
    // TODO: this put() method returns the inserted wargame.  I believe we could
    // return that, instead of `getLatestWargameRevisiion`
    return db.put({
      ...nextWargame,
      _id: wargameSettings
    }).then((resault) => {
      return resault.data as Wargame
    })
  }
}

export const updateWargameTitle = async (games: WargameList[], dbName: string, title: string): Promise<Wargame> => {
  if (games.some((game) => game && game.title === title && getNameFromPath(game.name) !== dbName)) {
    throw new Error('Name already in use.')
  }
  return getLatestWargameRevision(dbName).then((doc) => {
    return updateWargame({ ...doc, wargameTitle: title }, dbName)
  })
}

export const saveSettings = (dbName: string, data: WargameOverview): Promise<Wargame> => {
  return getLatestWargameRevision(dbName).then((res) => {
    const wargame: Wargame = deepCopy(res)
    wargame.data.overview = data
    return updateWargame(wargame, dbName)
  })
}

export const saveChannel = (dbName: string, newData: ChannelTypes): Promise<Wargame> => {
  return getLatestWargameRevision(dbName).then((res) => {
    const newDoc: Wargame = deepCopy(res)
    const updatedData = newDoc.data
    const channels = updatedData.channels.channels || []
    const channelNew = channels.every((channel: ChannelTypes) => channel.uniqid !== newData.uniqid)

    if (channelNew) {
      channels.unshift({ ...newData, name: newData.name })
    } else {
      const channelIndex = channels.findIndex((channel) => channel.uniqid === newData.uniqid)
      channels.splice(channelIndex, 1, { ...newData, name: newData.name })
    }

    updatedData.channels.channels = channels

    return updateWargame({ ...res, data: updatedData }, dbName)
  })
}

export const duplicateChannel = (dbName: string, channelUniqid: string): Promise<Wargame> => {
  return getLatestWargameRevision(dbName).then((res) => {
    const newDoc: Wargame = deepCopy(res)
    const updatedData = newDoc.data
    const channels = updatedData.channels.channels || []
    const channelIndex = channels.findIndex((channel) => channel.uniqid === channelUniqid)

    const duplicateChannel = deepCopy(channels[channelIndex])

    const uniq = uniqid.time()

    duplicateChannel.name = duplicateChannel.name + `-${uniq}`
    duplicateChannel.uniqid = `channel-${uniq}`

    channels.splice(channelIndex, 0, duplicateChannel)
    updatedData.channels.channels = channels
    updatedData.channels.selectedChannel = duplicateChannel
    return updateWargame({ ...res, data: updatedData }, dbName)
  })
}

export const deleteChannel = (dbName: string, channelUniqid: string): Promise<Wargame> => {
  return getLatestWargameRevision(dbName).then((res) => {
    const newDoc: Wargame = deepCopy(res)
    const updatedData = newDoc.data
    const channels = updatedData.channels.channels || []
    updatedData.channels.channels = channels.filter((channel: ChannelTypes) => channel.uniqid != channelUniqid)
    return updateWargame({ ...res, data: updatedData }, dbName)
  })
}

export const saveForces = (dbName: string, newData: ForceData[]) => {
  return getLatestWargameRevision(dbName).then((res) => {
    const newDoc: Wargame = deepCopy(res)
    const updatedData = newDoc.data
    updatedData.forces.forces = newData
    return updateWargame({ ...res, data: updatedData }, dbName)
  })
}

export const saveForce = (dbName: string, newData: ForceData) => {
  return getLatestWargameRevision(dbName).then((res) => {
    const newDoc: Wargame = deepCopy(res)
    const updatedData = newDoc.data
    const forces = updatedData.forces.forces
    const forceNew = forces.every((force) => force.uniqid !== newData.uniqid)

    if (forceNew) {
      forces.unshift({ ...newData, name: newData.name })
    } else {
      const forceIndex = forces.findIndex((force) => force.uniqid === newData.uniqid)
      // forces.forceName = newName;
      forces.splice(forceIndex, 1, { ...newData, name: newData.name })
    }

    updatedData.forces.forces = forces

    // remove default before calc

    const forceCheck: ForceData[] = deepCopy(forces)
    const umpireIndex = forceCheck.findIndex((force) => force.umpire)
    forceCheck.splice(umpireIndex, 1)

    return updateWargame({ ...res, data: updatedData }, dbName)
    // if (newDoc.wargameInitiated) {
    //   return createLatestWargameRevision(dbName, newDoc) // TODO: <<< check this part  `updatedData` saves only if wargame not Initiated
    // } else {
    //   return db.put({
    //     ...newDoc,
    //     _id: dbDefaultSettings._id,
    //     data: updatedData,  // TODO: <<< check this part  `updatedData` saves only if wargame not Initiated
    //     turnEndTime: moment().add(res.data.overview.realtimeTurnTime, 'ms').format(),
    //     wargameInitiated: res.wargameInitiated
    //   }).then<Wargame>(() => {
    //     return db.get(dbDefaultSettings._id)
    //   })
    // }
  })
}

export const deleteForce = (dbName: string, forceId: string): Promise<Wargame> => {
  return getLatestWargameRevision(dbName).then((res) => {
    const newDoc: Wargame = deepCopy(res)
    const updatedData = newDoc.data
    const forces = updatedData.forces.forces

    // remove the indicated force
    updatedData.forces.forces = forces.filter((force: ForceData) => force.uniqid !== forceId)

    // remove participations for this force
    updatedData.channels.channels.forEach((channel: ChannelTypes) => {
      // in the next time we're 'tricking' the compiler into accepting the
      // provided list.  We're not worried about the list being in the correct type
      // since all the entries came from that list
      const parts = channel.participants as ParticipantChat[]

      // drop participations for this force
      channel.participants = parts.filter((sub: ParticipantTypes) => sub.forceUniqid !== forceId)
    })

    // now delete channels with zero participations
    updatedData.channels.channels = updatedData.channels.channels.filter((channel: ChannelTypes) => channel.participants.length > 0)

    if (updatedData.forces.forces.length === 0) {
      updatedData.channels = {
        name: 'Channels',
        channels: [],
        selectedChannel: '',
        dirty: false
      }
    }
    return updateWargame({ ...res, data: updatedData }, dbName)
  })
}

export const duplicateForce = (dbName: string, currentForce: ForceData): Promise<Wargame> => {
  return getLatestWargameRevision(dbName).then((res) => {
    const newDoc: Wargame = deepCopy(res)
    const updatedData = newDoc.data
    const forces = updatedData.forces.forces || []
    const forceIndex = forces.findIndex((force) => force.uniqid === currentForce.uniqid)
    const duplicate = duplicateThisForce(forces[forceIndex])
    forces.splice(forceIndex, 0, duplicate)
    updatedData.forces.forces = forces
    updatedData.forces.selectedForce = duplicate

    return updateWargame({ ...res, data: updatedData }, dbName)
  })
}

export const deleteRolesParticipations = (dbName: string, roles: Role[], key: number): Promise<Wargame> => {
  return getLatestWargameRevision(dbName).then((res): any => {
    const processedData = deleteRoleAndParts(res.data, roles, key)
    if (_.isArray(processedData)) {
      updateWargame({ ...res, data: processedData[0] }, dbName)
      return processedData[1]
    }
    return updateWargame({ ...res, data: processedData }, dbName)
  })
}

export const cleanWargame = (dbPath: string): Promise<WargameRevision[]> => {
  const dbName = getNameFromPath(dbPath)
  const { db } = getWargameDbByName(dbName)
  const uniqId = uniqid.time()
  const newDbName = `wargame-${uniqId}`
  const newDb: ApiWargameDb = new DbProvider(databasePath + newDbName)
  return db.get(wargameSettings).then((res) => {
    const wargame = res as Wargame
    return updateWargameByDb({
      ...wargame,
      _rev: undefined,
      name: newDbName,
      wargameTitle: `${wargame.wargameTitle}-${uniqId}`,
      wargameInitiated: false
    }, newDbName, undefined, newDb).then(() => {
      addWargameDbStore({ name: newDbName, db: newDb })
      return getAllWargames()
    }).catch(rejectDefault)
  })
}

export const duplicateWargame = (dbPath: string): Promise<WargameRevision[]> => {
  const dbName = getNameFromPath(dbPath)
  const { db } = getWargameDbByName(dbName)
  const uniqId = uniqid.time()
  const newDbName = `wargame-${uniqId}`
  const newDb: ApiWargameDb = new DbProvider(databasePath + newDbName)
  return db.replicate(newDb as any).then((): Promise<Wargame> => {
    addWargameDbStore({ name: newDbName, db: newDb })
    // get default wargame
    return getWargameLocalFromName(dbName)
  }).then((res) => {
    const wargame = {
      ...res,
      _rev: undefined,
      _id: dbDefaultSettings._id,
      name: newDbName,
      wargameTitle: `${res.wargameTitle}-${uniqId}`
    }
    return newDb.put(wargame).then(() => {
      if (wargame.wargameInitiated) {
        // if wargameInitiated get last infoType and modify name
        return getLatestWargameRevision(newDbName).then((lastWargame: Wargame) => {
          return newDb.put({
            ...lastWargame,
            name: newDbName,
            wargameTitle: `${res.wargameTitle}-${uniqId}`
          })
        }).then(() => getAllWargames())
      }
      return getAllWargames()
    }).catch(rejectDefault)
  }).catch(rejectDefault)
}

export const updateWargameVisible = async (dbPath: string): Promise<Wargame> => {
  const dbName = getNameFromPath(dbPath)
  const { db } = getWargameDbByName(dbName)
  return getLatestWargameRevision(dbName).then(async (wargame: Wargame) => {
    wargame.name = wargame.name.startsWith(hiddenPrefix) ? wargame.name.substr(hiddenPrefix.length) : `${hiddenPrefix}${wargame.name}`
    return db.put(wargame).catch(rejectDefault)
  })
}

// TODO: suspect calls to this should be replaced by:
// TODO: calls to: getLatestWargameRevision
export const getWargameLocalFromName = (dbName: string): Promise<Wargame> => {
  const { db } = getWargameDbByName(dbName)
  // TODO: this should look for most recent wargame (INFO), it currently
  // looks for the un-initiated version of the wargame
  return db.get(wargameSettings).then((res) => res as Wargame)
}

export const getWargame = (gamePath: string): Promise<Wargame> => {
  return (async () => {
    const name = getNameFromPath(gamePath)
    return await getLatestWargameRevision(name)
  })()
}

export const createLatestWargameRevision = (dbName: string, wargame: Wargame): Promise<Wargame> => {
  const copiedData = deepCopy(wargame)
  const { db } = getWargameDbByName(dbName)

  // TODO: this put() method returns the inserted wargame.  I believe we could
  // return that, instead of `getLatestWargameRevisiion`
  return db.put({
    ...copiedData,
    _rev: undefined,
    _id: new Date().toISOString(),
    messageType: INFO_MESSAGE
  }).then((result) => {
    return result.data
  }).catch(rejectDefault)
}

export const getAllWargameRevisions = (dbName: string) => {
  getAllMessages(dbName).then((messages) => {
    return messages.filter((message) => (message.messageType === INFO_MESSAGE))
  }).catch(rejectDefault)
}

export const nextGameTurn = (dbName: string): Promise<Wargame> => {
  return getLatestWargameRevision(dbName).then((res) => {
    switch (res.phase) {
      case PLANNING_PHASE:
        res.phase = ADJUDICATION_PHASE
        res.turnEndTime = '0'
        res.adjudicationStartTime = moment().format()
        break
      case ADJUDICATION_PHASE:
        res.phase = PLANNING_PHASE
        res.gameTurn += 1
        res.adjudicationStartTime = '0'
        // move the turn forward

        const gameDate: string = res.data.overview.gameDate
        const gameTurn: GameTurnLength = res.data.overview.gameTurnTime
        const newTime: number = incrementGameTime(gameDate, gameTurn)
        res.data.overview.gameDate = moment(newTime).format('YYYY-MM-DDTHH:mm')
        
        // calculate when the planning must finish
        res.turnEndTime = moment().add(res.data.overview.realtimeTurnTime, 'ms').format()
        break
    }
    return createLatestWargameRevision(dbName, res)
  })
    .catch(rejectDefault)
}

export const postFeedback = (dbName: string, fromDetails: MessageDetailsFrom, turnNumber: number, message: string, name: string): Promise<MessageFeedback> => {
  const { db } = getWargameDbByName(dbName)
  const feedback: MessageFeedback = {
    _id: new Date().toISOString(),
    details: {
      channel: 'Feedback',
      from: fromDetails,
      timestamp: new Date().toISOString(),
      turnNumber
    },
    message: {
      content: message
    },
    messageType: FEEDBACK_MESSAGE
  }

  if (name) feedback.name = name
  
  return db.put(feedback).catch(rejectDefault)
}

export const postMappingMessage = (dbName: string, message: MappingMessage | MappingMessageDelta): Promise<MappingMessage> => {
  const { db } = getWargameDbByName(dbName)
  return db.put(message).catch(rejectDefault)
}

const checkReference = async (message: MessageCustom, db: ApiWargameDb, details: MessageCustom['details']): Promise<MessageCustom> => {
  if (message.templateId !== 'Chat' && typeof message.message.Reference === 'string' && message.message.Reference.length === 0) {
    try {
      const counter = await db.lastCounter(details.from.force, details.timestamp)
      message.details.counter = counter
      message.message.Reference = [message.details.from.force, counter].join('-')
    } catch (err) {
      console.error(err)
    }
  }
  return message
}

export const postNewMessage = async (
  dbName: string, 
  details: MessageDetails,
  message: MessageStructure, 
  templateId: string, 
  messageType: TypeOfCustomMessage
): Promise<MessageCustom> => {
  const { db } = getWargameDbByName(dbName)
  const id = details.timestamp ? details.timestamp : new Date().toISOString()
  const customMessage: MessageCustom = {
    _id: id,
    // defined constat for messages, it's not same as message.templateId,
    // ex for all template based messages will be used CUSTOM_MESSAGE Type
    messageType: messageType || CUSTOM_MESSAGE,
    templateId,
    details,
    message
  }

  if (customMessage.message && typeof customMessage.message.Reference !== 'undefined') {
    await checkReference(customMessage, db, details)
  }
  
  // Save the message
  return db.put(customMessage).catch(rejectDefault)
}

/**
 * Populate a new wargame with bulk data
 * @returns Promise that resolves with the populated wargame
 */
export const populateWargame = (dbName: string, bulkData: Array<Message | Wargame>): Promise<Wargame> => {
  // Generate a unique name for the wargame by appending a timestamp to the end of the name
  const name = `${'wargame'}-${dbName}-${uniqid.time()}`

  // Create a new database provider instance for the new wargame
  const db = new DbProvider(databasePath + name)
  addWargameDbStore({ name, db })
  const customBulkMessage = bulkData

  // Return a new promise that will resolve with the populated wargame
  return new Promise((resolve, reject) => {
    // Call the bulkDocs() function of the new database instance, passing in the bulk data
    db.bulkDocs(customBulkMessage).then(() => {
      // Call getLatestWargameRevision() to retrieve the latest revision of the new wargame
      getLatestWargameRevision(name).then((res) => {
        return resolve(res)
      }).catch((err) => {
        reject(err)
      })
    }).catch((err) => {
      console.log(err)
      reject(err)
    })
  })
}

export const getAllMessages = (dbName: string): Promise<(Wargame | Message)[]> => {
  const { db } = getWargameDbByName(dbName)
  return db.allDocs()
    // TODO: this should probably be a filter function
    .then((res): (Wargame | Message)[] => {
      // drop counters
      
      const nonCounter = res.filter((message) => message.messageType !== COUNTER_MESSAGE)

      // NOTE: SPECIAL CASE. It appears the docs are being sorted by _id before being returned.
      // This is putting the initial 'settings' doc at the end. It should be at the start. 
      // If it's at the end, move it to the start
      if (nonCounter.length > 0) {
        const lastDoc = nonCounter[nonCounter.length - 1] as any
        if (lastDoc._id === 'settings') {
          nonCounter.pop()
          nonCounter.unshift(lastDoc)
        }
      }
      return nonCounter
    }
    )
    .catch(() => {
      throw new Error('Serge disconnected')
    })
}

export const getAllWargames = async (): Promise<WargameRevision[]> => {
  const wargameList = await fetchWargameList()
  return wargameList.data
}
