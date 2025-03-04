import ExpiredStorage from 'expired-storage'
import { Wargame, TemplateBody } from 'src/custom-types'
// import { wargameSettings } from 'src/config'
import uniqId from 'uniqid'
import moment from 'moment'

export const DEFAULT_SERVER = 'Nelson'
export const DEFAULT_PORT = '8080'

export const MSG_STORE = 'messages'
export const MSG_TYPE_STORE = 'message_types'
export const SERGE_INFO = 'serge_info'
export const CHAT_CHANNEL_ID = 'game-admin'

export const PLANNING_PHASE = 'planning'
export const ADJUDICATION_PHASE = 'adjudication'

export const expiredStorage = new ExpiredStorage()
export const LOCAL_STORAGE_TIMEOUT = 2592000 // one month

export const UMPIRE_FORCE = 'umpire'

export const LOCATION_PENDING = 'LocationPending' // special state where platforms can be moved at turn zero

export const GAME_START_TAB = 'overview' 
// series of constants used for `messageType` when sending map events

// series of constants used for `messageType` when sending custom messages
export const CUSTOM_MESSAGE = 'CustomMessage'

// series of constants used for `messageType` when sending chat messages
export const CHAT_MESSAGE = 'ChatMessage'

// series of constants used for `messageType` when sending feedback
export const FEEDBACK_MESSAGE = 'FeedbackMessage'

// series of constants used for `messageType` when using Counter message for COA and RFI messages
export const COUNTER_MESSAGE = 'CounterMessage'

// mapping messages
export const MAPPING_MESSAGE = 'MappingMessage'
export const MAPPING_MESSAGE_DELTA = 'MappingMessageDelta'

// series of constants used for `messageType` when sending system messages
// an INFO_MESSAGE is an update to the wargame document
export const INFO_MESSAGE = 'InfoMessage'
export const INFO_MESSAGE_CLIPPED = 'InfoMessageClipped'

// return states of adjudication form
export const PLAN_ACCEPTED = 'accepted'
export const PLAN_REJECTED = 'rejected'

// types of UI interaction
export const PLAIN_INTERACTION = 'plain-interaction'
export const CHANGE_TAB_INTERACTION = 'change-tab-interaction'
export const MESSAGE_SENT_INTERACTION = 'msg-sent-interaction'
export const MESSAGE_READ_INTERACTION = 'msg-read-interaction'
export const MESSAGE_UNREAD_INTERACTION = 'msg-unread-interaction'
export const MAP_ANNOTATION_READ_INTERACTION = 'map-anno-read-interaction'

// export item types
export const EXPORT_ITEM_MESSAGES = 'messages'
export const EXPORT_ITEM_FORCES = 'forces'

// names of special channels
export const CHANNEL_RFI_STATUS = 'rfis'

// types of channel
export const CHANNEL_CHAT = 'ChannelChat'
export const CHANNEL_CUSTOM = 'ChannelCustom'
export const CHANNEL_COLLAB = 'ChannelCollab'
export const CHANNEL_MAPPING = 'ChannelMapping'

// types of participant
export const PARTICIPANT_CHAT = 'ParticipantChat'
export const PARTICIPANT_CUSTOM = 'ParticipantCustom'
export const PARTICIPANT_COLLAB = 'ParticipantCollab'
export const PARTICIPANT_MAPPING = 'ParticipantMapping'

// Chat template ID
export const CHAT_MESSAGE_TEMPLATE_ID = 'k16eedkl'

// value to use in DataTable filters for value not present
export const EMPTY_CELL = '[Empty]'

// name of property used for storing time/type of last activity

// marker character to tell updateMarker handler that the update is coming 
// from the marker form - and the maker may have been separately dragged around
export const FLAG_MARKER = '!'

// NOTE: time period to wait if server returns an error. One frequent cause of error
// during development is that the server is stopped.  We're introducing a
// throttle value to prevent the browser going into a race condition
// as it sends 1000s of requests to the server
export const ERROR_THROTTLE = 3000

// Nov 2019. Ian modified the server path to use the
// current URL, so we can use Heroku to provide
// review instances of the app.  In these
// review instances, we can't predict the URL, so
// were failing CORS test

const { hostname, protocol, href, origin } = window.location

export const baseUrl = () => {
  const host = (new URL(href)).searchParams.get('host')

  // NOTE: for all non-heroku deployments, we need to append the port number
  const portDetails = hostname.toLowerCase().indexOf('herokuapp') !== -1 ? '' : ':' + DEFAULT_PORT

  const res = host || `${protocol}//${hostname}` + portDetails

  return res
}

export const serverPath = (
  // Removed G_CONFIG tempoararily.
  // window.G_CONFIG.REACT_APP_SERVER_PATH || process.env.REACT_APP_SERVER_PATH || baseUrl() + '/'
  process.env.REACT_APP_SERVER_PATH || baseUrl() + '/'
).replace(/\/?$/, '/')

export const databasePath = `${serverPath}db/`
export const iconUploaderPath = `${serverPath}saveIcon`
export const hiddenPrefix = '_#_'

export const clearAll = 'clearAll'
export const allDbs = 'allDbs'
export const wargameList = 'wargameList'
export const playerlogs = 'playerlogs'
// Note: On heroku we don't use the additional port for the socket, we use the plain origin
export const socketPath = origin.toLowerCase().indexOf('herokuapp') !== -1 ? origin : origin.replace(/3000|8080/g, '4000')
export const replicate = 'replicate/'
export const deletePath = 'delete/'
/** name of the document used to store the initial wargame definition */
export const wargameSettings = 'initial_wargame'
// default name for role name
export const NEW_ROLE = 'New Role'

/** flag to indicate a role can control all assets */

// 
/** there has been some user interaction, so log the current time
 * The storage we're using is shared across browser tabs, so previously
 * one session would overwrite the history for another. So, we prepend the
 * activity type with the role name - to let one player use multiple tabs.
 * @param role - current role id
 * @param event - name of event that just happened
 */
export const UNSENT_CHAT_MESSAGE_TYPE = 'chat'
export const UNSENT_SELECT_BY_DEFAULT_VALUE = 'BY_DEFAULT_VALUE'

export const STORYBOOK_ROUTE = './storybook'

// Interval for check server heartbeats
export const SERVER_PING_INTERVAL = 20000

export const CUSTOM_SIDC = '10031000000000000000'

export const headers = { // +
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Headers': 'Authorization, Lang'
}

export const defaultGameInfo = { // +
  imageUrlSet: false,
  imageUrl: '/default_img/sergeDefault.png',
  title: 'Serge',
  description: `You have arrived at the Development Centre Gaming Facility.\n
  You will use this web-based application to interact with players from other forces, together with the umpires in the White Cell.\n
  At any point during your time here you can submit insights via the Insights button at the top-right of the gaming page.\n
  These insights could relate to the current doctrine being explored, the performance of your force, or how the game is being organised / facilitated.\n
  Thanks in advance for your participation.\n
  Maj Duncan Dare, PO1 Gaming`,
  showAccessCodes: true
}

export const forceTemplate = { // +
  name: '',
  uniqid: '',
  overview: 'An overview written here..',
  roles: [
    {
      name: 'CO',
      roleId: `p${uniqId.time()}`,
      isGameControl: false,
      isObserver: false,
      isInsightViewer: false
    }
  ],
  iconURL: serverPath + 'default_img/forceDefault.png',
  color: '#3dd0ff',
  umpire: false,
  dirty: false
}

export const umpireForceTemplate = { // +-
  name: 'White',
  uniqid: 'umpire',
  overview: 'Umpire force.',
  roles: [
    {
      name: 'Game Control',
      roleId: `p${uniqId.time()}`,
      isGameControl: true,
      isObserver: true,
      isInsightViewer: true
    }
  ],
  iconURL: serverPath + 'default_img/umpireDefault.png',
  color: '#FCFBEE',
  umpire: true,
  dirty: false
}

export const channelTemplate = { // +
  name: '',
  uniqid: '',
  participants: []
}

export const dbDefaultmessageTypes: TemplateBody[] = [
  {
    _id: 'lvm8sl32',
    _rev: '1-e3ba4c546257a8e2afcabf9205067045',
    lastUpdated: '2024-04-30T10:25:24.926Z',
    title: 'Machinery failure',
    details: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          Title: 'Title'
        },
        Date: {
          type: 'string',
          format: 'datetime-local',
          options: {
            flatpickr: {
              wrap: true,
              time_24hr: true,
              allowInput: true
            }
          }
        },
        Status: {
          type: 'string',
          enum: [
            'Minor',
            'Major',
            'Critical'
          ]
        },
        Description: {
          type: 'string',
          format: 'textarea'
        }
      },
      title: 'Machinery Failure'
    },
    completed: false
  },
  {
    _id: 'lvm8sl33',
    _rev: '1-250b2f4f0373d6655aabdad82223c55b',
    lastUpdated: '2024-04-30T10:25:24.927Z',
    title: 'Weather forecast',
    details: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          title: 'Title'
        },
        Location: {
          type: 'object',
          properties: {
            Lat: {
              type: 'number'
            },
            'Lat Hemi': {
              type: 'string',
              enum: [
                'N',
                'S'
              ]
            },
            Long: {
              type: 'number'
            },
            'Long Hemi': {
              type: 'string',
              enum: [
                'E',
                'W'
              ]
            }
          },
          format: 'grid'
        },
        'Valid from': {
          type: 'string',
          format: 'datetime-local',
          options: {
            flatpickr: {
              wrap: true,
              time_24hr: true,
              allowInput: true
            }
          }
        },
        'Valid until': {
          type: 'string',
          format: 'datetime-local',
          options: {
            flatpickr: {
              wrap: true,
              time_24hr: true,
              allowInput: true
            }
          }
        },
        Forecast: {
          type: 'string',
          format: 'textarea'
        }
      },
      title: 'Weather Forecast'
    },
    completed: false
  },
  {
    _id: 'lvm8sl34',
    _rev: '1-f3df979cd76ad5bbe7a978029a069821',
    lastUpdated: '2024-04-30T10:25:24.927Z',
    title: 'Message',
    details: {
      type: 'object',
      properties: {
        title: {
          type: 'string'
        },
        content: {
          type: 'string',
          format: 'textarea'
        }
      },
      title: 'Message',
      format: 'grid'
    },
    completed: false
  },
  {
    _id: 'lvm8sl35',
    _rev: '1-06bcca4cfd8438b8af1873f1b1968dbf',
    lastUpdated: '2024-04-30T10:25:24.927Z',
    title: 'Request for Information',
    details: {
      type: 'object',
      properties: {
        Addressee: {
          type: 'string'
        },
        Request: {
          type: 'string',
          format: 'textarea'
        }
      },
      title: 'Request for Information',
      format: 'grid'
    },
    completed: false
  },
  {
    _id: 'lvm8sl36',
    _rev: '1-81350fbba426db63aef6a2a7a39b5be7',
    lastUpdated: '2024-04-30T10:25:24.927Z',
    title: 'Request for Support',
    details: {
      type: 'object',
      properties: {
        Addressee: {
          type: 'string'
        },
        Request: {
          type: 'string',
          format: 'textarea'
        }
      },
      title: 'Request for Support',
      format: 'grid'
    },
    completed: false
  },
  {
    _id: 'lvm8sl37',
    _rev: '1-00245951456f901d11e15906f3fd03a1',
    lastUpdated: '2024-04-30T10:25:24.927Z',
    title: 'Chat',
    details: {
      type: 'object',
      properties: {
        content: {
          type: 'string',
          format: 'textarea',
          options: {
            inputAttributes: {
              placeholder: 'type the text'
            }
          }
        }
      },
      title: 'Chat',
      format: 'grid'
    },
    completed: false
  },
  {
    _id: 'lvm8sl38',
    _rev: '1-14da0a326ad938ff56463ab36e63a44d',
    lastUpdated: '2024-04-30T10:25:24.928Z',
    title: 'Link',
    details: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          format: 'text'
        },
        URL: {
          type: 'string',
          format: 'url'
        }
      },
      title: 'Link',
      format: 'grid'
    },
    completed: false
  },
  {
    _id: 'lvm8sl39',
    _rev: '1-b92748a044f73bb62b773a9f201c0bcf',
    lastUpdated: '2024-04-30T10:25:24.928Z',
    title: 'Daily intentions',
    details: {
      type: 'object',
      properties: {
        TurnNumber: {
          title: 'Turn',
          type: 'string',
          format: 'number'
        },
        OverallIntentions: {
          title: 'Overall intentions',
          type: 'string',
          format: 'textarea'
        },
        Orders: {
          items: {
            properties: {
              Unit: {
                title: 'Unit',
                type: 'string',
                format: 'text'
              },
              Tasking: {
                title: 'Tasking',
                type: 'string',
                format: 'textarea'
              },
              SearchPolicy: {
                title: 'Search Policy',
                type: 'string',
                format: 'textarea'
              },
              ActionOnContact: {
                title: 'Action on Contact',
                type: 'string',
                enum: [
                  'Ignore',
                  'Evade',
                  'Covert Trail',
                  'Overt Trail',
                  'Harass'
                ]
              },
              AnyOtherComments: {
                title: 'Any other comments',
                type: 'string',
                format: 'textarea'
              }
            },
            type: 'object'
          },
          title: 'Orders',
          type: 'array',
          format: 'table',
          minItems: 1
        }
      },
      title: 'Daily Intent',
      required: [
        'OverallIntentions',
        'Orders'
      ]
    },
    completed: false
  },
  {
    _id: 'lvm8sl3a',
    _rev: '1-a76bf0f37103102e305c559b2d4f413d',
    lastUpdated: '2024-04-30T10:25:24.928Z',
    title: 'PG19 Weekly Orders',
    details: {
      type: 'object',
      properties: {
        CommandersIntent: {
          title: 'Commanders Intent',
          type: 'string',
          format: 'textarea'
        },
        Orders: {
          items: {
            properties: {
              Unit: {
                title: 'Unit',
                type: 'string',
                format: 'text'
              },
              Orders: {
                title: 'Orders',
                type: 'string',
                format: 'textarea'
              },
              ContingencyOrders: {
                title: 'Contingency Orders',
                type: 'string',
                format: 'textarea'
              }
            },
            type: 'object'
          },
          title: 'Orders',
          type: 'array',
          format: 'table',
          minItems: 1
        },
        PxTasking: {
          title: 'Px Tasking',
          type: 'string',
          format: 'textarea'
        },
        AlliedUnitTasking: {
          title: 'Allied Unit Tasking',
          type: 'string',
          format: 'textarea'
        },
        ForceActionOnContact: {
          title: 'Force action on contact',
          type: 'string',
          format: 'textarea'
        },
        ForceActionOnLossOfContact: {
          title: 'Force action on loss of contact',
          type: 'string',
          format: 'textarea'
        },
        SupportingLogisticsActivity: {
          title: 'Supporting logistics activity',
          type: 'string',
          format: 'textarea'
        }
      },
      title: 'PG19 Weekly Orders',
      required: [
        'CommandersIntent',
        'Orders',
        'PxTasking',
        'AlliedUnitTasking',
        'ForceActionOnContact',
        'ForceActionOnLossOfContact',
        'SupportingLogisticsActivity'
      ]
    },
    completed: false
  },
  {
    _id: 'lvm8sl3b',
    _rev: '1-78f054e00e8cdec68d0190842a96484b',
    lastUpdated: '2024-04-30T10:25:24.928Z',
    title: 'State of World',
    details: {
      type: 'object',
      properties: {
        TurnNumber: {
          title: 'Turn',
          type: 'string',
          format: 'number'
        },
        Summary: {
          title: 'Summary',
          type: 'string',
          format: 'textarea'
        },
        ForceDisposition: {
          title: 'Force disposition',
          type: 'string',
          format: 'url'
        },
        Narrative: {
          items: {
            properties: {
              Serial: {
                title: 'Serial',
                type: 'string',
                format: 'text'
              },
              Description: {
                title: 'Description',
                type: 'string',
                format: 'textarea'
              }
            },
            title: 'Events',
            type: 'object'
          },
          title: 'Narrative',
          type: 'array',
          format: 'table',
          minItems: 1
        }
      },
      title: 'State of World 2',
      required: [
        'TurnNumber',
        'Summary',
        'ForceDisposition',
        'Narrative'
      ]
    },
    completed: false
  }
]

export const dbDefaultPlaylogSettings = { // +-
  wargame: 'missing',
  role: 'missing',
  activityType: {
    aType: 'pending'
  },
  activityTime: '',
  _id: new Date().toISOString(), 
  isOpen: false
}

export const dbDefaultSettings: Wargame = { // +
  _id: wargameSettings,
  wargameTitle: '',
  name: '',
  data: {
    overview: {
      name: 'Overview - settings',
      gameDescription: '',
      // spatialRepresentation: '',
      gameTurnTime: {
        unit: 'millis',
        millis: 43200000
      },
      realtimeTurnTime: 300000,
      timeWarning: 60000,
      // turnStrategy: '',
      gameDate: moment(new Date(), moment.ISO_8601).format(),
      showAccessCodes: true,
      logPlayerActivity: true,
      dirty: false
    },
    forces: {
      name: 'Forces',
      forces: [umpireForceTemplate],
      selectedForce: umpireForceTemplate,
      dirty: false
    },
    channels: {
      name: 'Channels',
      channels: [],
      selectedChannel: '',
      dirty: false
    },
    templates: { templates: dbDefaultmessageTypes }
  },
  wargameList: [],
  wargameInitiated: false,
  gameTurn: 0,
  phase: ADJUDICATION_PHASE,
  adjudicationStartTime: moment(new Date(), moment.ISO_8601).format()
}

export const FLEX_LAYOUT_MODEL_DEFAULT: any = {
  global: {
    tabSetTabStripHeight: 45,
    tabEnableClose: false,
    tabEnableRenderOnDemand: false,
    tabSetEnableMaximize: false
  },
  borders: [],
  layout: {
    type: 'row' as string,
    weight: 100,
    children: [
    ]
  }
}
