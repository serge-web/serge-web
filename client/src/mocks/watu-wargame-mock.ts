import { Wargame } from 'src/custom-types'

const wargame: Wargame = {
  adjudicationStartTime: '2021-08-10T16:12:25+01:00',
  wargameList: [],
  data: {
    channels: {
      channels: [
        {
          name: 'VHF C16',
          channelType: 'ChannelCustom',
          participants: [
            {
              forceUniqid: 'umpire',
              roles: [],
              subscriptionId: '8qsze9',
              templates: [],
              pType: 'ParticipantCustom'
            },
            {
              forceUniqid: 'Blue-1',
              roles: [],
              subscriptionId: 'hzrzp',
              templates: [],
              pType: 'ParticipantCustom'
            },
            {
              forceUniqid: 'Red-1',
              roles: [],
              subscriptionId: 'icrx',
              templates: [],
              pType: 'ParticipantCustom'
            }
          ],
          uniqid: 'channel-koirdijk'
        },
        {
          name: 'General chit-chat',
          channelType: 'ChannelChat',
          participants: [
            {
              pType: 'ParticipantChat',
              forceUniqid: 'umpire',
              roles: [],
              subscriptionId: 'white-view'
            },
            {
              pType: 'ParticipantChat',
              forceUniqid: 'umpire',
              roles: ['umpire-GC'],
              subscriptionId: 'white-control-green-all'
            },
            {
              pType: 'ParticipantChat',
              forceUniqid: 'umpire',
              roles: ['umpire-blue-hq'],
              subscriptionId: 'white-control-green-asset'
            },
            {
              forceUniqid: 'Blue-1',
              roles: [],
              subscriptionId: 'w9lmf',
              pType: 'ParticipantChat'
            },
            {
              forceUniqid: 'Blue-1',
              roles: ['nortCO'],
              subscriptionId: 'nortCO-control',
              pType: 'ParticipantChat'
            },
            {
              forceUniqid: 'Blue-1',
              roles: ['blueCO'],
              subscriptionId: 'blue-CO-control-all',
              pType: 'ParticipantChat'
            },
            {
              forceUniqid: 'Red-1',
              roles: ['red-CO'],
              subscriptionId: 'red-co-all',
              pType: 'ParticipantChat'
            },
            {
              forceUniqid: 'Red-1',
              roles: [],
              subscriptionId: 'red-viewers',
              pType: 'ParticipantChat'
            }
          ],
          uniqid: 'channel-koirldxk'
        }
      ],
      dirty: false,
      name: 'Channels',
      selectedChannel: ''
    },
    forces: {
      dirty: false,
      forces: [
        {
          color: '#FCFBEE',
          dirty: false,
          iconURL: 'http://localhost:8080/default_img/umpireDefault.png',
          name: 'White Force',
          overview: 'Umpire force.',
          roles: [
            {
              isGameControl: true,
              isInsightViewer: true,
              isObserver: true,
              isRFIManager: false,
              name: 'Game Control',
              roleId: 'umpire-GC'
            },
            {
              isGameControl: false,
              isInsightViewer: true,
              isObserver: false,
              isRFIManager: true,
              name: 'RFI Mgr',
              roleId: 'rks5zfzd3'
            },
            {
              isGameControl: false,
              isInsightViewer: false,
              isObserver: false,
              isRFIManager: false,
              name: 'Blue HHQ',
              roleId: 'umpire-blue-hq'
            },
            {
              isGameControl: false,
              isInsightViewer: false,
              isObserver: false,
              isRFIManager: false,
              name: 'Red HHQ',
              roleId: 'rks5zfzd5'
            }
          ],
          umpire: true,
          uniqid: 'umpire'
        },
        {
          color: '#00aaff',
          dirty: false,
          iconURL: 'http://localhost:8080/default_img/forceDefault.png',
          name: 'Blue-1 Force',
          overview: 'An overview written here..',
          roles: [
            {
              isGameControl: false,
              isInsightViewer: false,
              isObserver: false,
              name: 'CO',
              roleId: 'blueCO'
            },
            {
              isGameControl: false,
              isInsightViewer: false,
              isObserver: false,
              isRFIManager: false,
              name: 'NORT CO',
              roleId: 'nortCO'
            },
            {
              isGameControl: false,
              isInsightViewer: false,
              isObserver: false,
              isRFIManager: false,
              name: 'Comms',
              roleId: 'blue-comms'
            }

          ],
          umpire: false,
          uniqid: 'Blue-1',
          visibleTo: []
        },
        {
          color: '#f00',
          dirty: false,
          iconURL: 'http://localhost:8080/default_img/forceDefault.png',
          name: 'Red-1 Force',
          overview: 'An overview written here..',
          roles: [
            {
              isGameControl: false,
              isInsightViewer: false,
              isObserver: false,
              name: 'CO',
              roleId: 'red-CO'
            },
            {
              isGameControl: false,
              isInsightViewer: false,
              isObserver: false,
              isRFIManager: false,
              name: 'CTF Y1',
              roleId: 'rks5zfzdj'
            },
            {
              isGameControl: false,
              isInsightViewer: false,
              isObserver: false,
              isRFIManager: false,
              name: 'CTF Y2',
              roleId: 'rks5zfzdk'
            },
            {
              isGameControl: false,
              isInsightViewer: false,
              isObserver: false,
              isRFIManager: false,
              name: 'CTF Y3',
              roleId: 'rks5zfzdl'
            },
            {
              isGameControl: false,
              isInsightViewer: false,
              isObserver: false,
              isRFIManager: false,
              name: 'CTF Y4',
              roleId: 'rks5zfzdm'
            },
            {
              isGameControl: false,
              isInsightViewer: false,
              isObserver: false,
              isRFIManager: false,
              name: 'CTF Y5',
              roleId: 'rks5zfzdn'
            }
          ],
          umpire: false,
          uniqid: 'Red-1',
          visibleTo: []
        },
        {
          color: '#0d0',
          dirty: false,
          iconURL: 'http://localhost:8080/default_img/umpireDefault.png',
          name: 'Green Force',
          overview: 'Green force.',
          roles: [],
          umpire: false,
          uniqid: 'green-force'
        }
      ],
      name: 'Forces',
      selectedForce: ''
    },
    overview: {
      dirty: false,
      gameDate: '2021-05-13T16:12',
      gameDescription: '',
      gameTurnTime: {
        millis: 240000,
        unit: 'millis'
      },
      name: 'Overview - settings',
      realtimeTurnTime: 300000,
      showAccessCodes: true,
      timeWarning: 60000,
      logPlayerActivity: true,
      turnPresentation: 'Natural'
    },
    templates: {
      name: 'templates',
      selectedTemplate: '',
      dirty: false,
      templates: [
        {
          lastUpdated: '2019-09-30T12:37:26.705Z',
          title: 'Chat',
          details: {
            schema: {
              type: 'object',
              properties: {
                Chat: {
                  title: 'Chat',
                  type: 'string',
                  description: 'content',
                  default: 'type the text '
                }
              },
              dependencies: {},
              required: []
            },
            uischema: {
              Chat: {
                'ui:widget': 'textarea'
              },
              'ui:order': [
                'Chat'
              ]
            },
            title: 'Chat'
          },
          completed: false,
          _id: 'k16eedkl',
          _rev: '1-09ab7a18ff677cec5d9a56f02a45788d'
        },
        {
          completed: false,
          details: {
            schema: {
              type: 'object',
              title: 'State of World (laydown 2)',
              properties: {
                completed: {
                  title: 'completed',
                  type: 'boolean'
                },
                Reference: {
                  title: 'Reference',
                  type: 'string'
                },
                Title: {
                  title: 'Title',
                  type: 'string'
                },
                Forces: {
                  items: {
                    type: 'object',
                    properties: {
                      Forces: {
                        enum: [
                          'Blue',
                          'Red',
                          'Green'
                        ],
                        type: 'string',
                        title: 'Forces'
                      }
                    },
                    dependencies: {},
                    required: []
                  },
                  title: 'Forces',
                  type: 'array'
                }
              },
              dependencies: {},
              required: []
            },
            uischema: {
              Forces: {
                items: {
                  'ui:order': [
                    'Forces'
                  ]
                }
              },
              'ui:order': [
                'completed',
                'Reference',
                'Title',
                'Forces'
              ]
            },
            title: 'State of World L'
          },
          lastUpdated: '2019-09-30T12:37:26.705Z',
          title: 'State of World L',
          _id: 'k16eedkp',
          _rev: '1-612d7dc5d10fc81bc7459b2801c66816'
        },
        {
          lastUpdated: '2019-09-30T12:37:26.705Z',
          title: 'Daily intentions',
          details: {
            schema: {
              type: 'object',
              properties: {
                TurnNumber: {
                  title: 'Turn',
                  type: 'string'
                },
                OverallIntentions: {
                  title: 'Overall intentions',
                  type: 'string'
                },
                orders: {
                  items: {
                    type: 'object',
                    title: '',
                    properties: {
                      Unit: {
                        title: 'Unit',
                        type: 'string'
                      },
                      Tasking: {
                        title: 'Tasking',
                        type: 'string'
                      },
                      'Search Policy': {
                        title: 'Search Policy',
                        type: 'string'
                      },
                      'Action on Contact': {
                        enum: [
                          'Ignore',
                          'Evade',
                          'Covert Trail',
                          'Overt Trail',
                          'Harass'
                        ],
                        title: 'Action on Contact',
                        type: 'string',
                        enumNames: null
                      },
                      'Any other comments': {
                        title: 'Any other comments',
                        type: 'string'
                      }
                    },
                    dependencies: {},
                    required: []
                  },
                  title: 'orders',
                  type: 'array'
                }
              },
              dependencies: {},
              required: []
            },
            uischema: {
              orders: {
                items: {
                  Tasking: {
                    'ui:widget': 'textarea'
                  },
                  'Search Policy': {
                    'ui:widget': 'textarea'
                  },
                  'Any other comments': {
                    'ui:widget': 'textarea'
                  },
                  'ui:order': [
                    'Unit',
                    'Tasking',
                    'Search Policy',
                    'Action on Contact',
                    'Any other comments'
                  ]
                }
              },
              'ui:order': [
                'TurnNumber',
                'OverallIntentions',
                'orders'
              ]
            },
            title: 'Daily Intent'
          },
          completed: false,
          _id: 'k16eedkn',
          _rev: '1-cc8e8cdb01447959c266761066448382'
        }
      ]
    }
  },
  gameTurn: 3,
  infoType: true,
  messageType: 'InfoMessage',
  name: 'wargame-kzod28lc',
  phase: 'planning',
  turnEndTime: '2022-02-15T16:55:11+00:00',
  wargameInitiated: false,
  wargameTitle: 'Small wargame'
}

export default wargame
