import { CUSTOM_MESSAGE, CollaborativeMessageStates } from '@serge/config'
import { MessageCustom, Role } from '@serge/custom-types'
import { forces } from "./forces.mock";

const whiteGC: Role = forces[0].roles[0]
const blueCO: Role = forces[1].roles[0]
const redCO: Role = forces[2].roles[0]

export const messageDataCollaborativeEditing: MessageCustom[] = [
  {
    messageType: CUSTOM_MESSAGE,
    details: {
      channel: 'channel-BlueRFI',
      from: {
        force: 'Blue',
        forceColor: '#00F',
        iconURL: 'default_img/umpireDefault.png',
        roleName: blueCO.name,
        roleId: blueCO.roleId
      },
      messageType: 'RFI',
      timestamp: '2020-10-13T08:54:21.119Z',
      collaboration: {
        status: CollaborativeMessageStates.Finalized
      }
    },
    message: {
      Reference: 'Blue-3',
      Request: 'RFI 3 request goes in here',
      Title: 'RFI 3 from Blue'
    },
    _id: 'id_3a',
    _rev: '2',
    hasBeenRead: false,
    isOpen: false
  },
  {
    messageType: CUSTOM_MESSAGE,
    details: {
      channel: 'Red RFI',
      from: {
        force: 'Red',
        roleName: redCO.name,
        forceColor: '#F00',
        iconURL: 'default_img/umpireDefault.png',
        roleId: redCO.roleId
      },
      messageType: 'RFI',
      timestamp: '2020-10-13T08:55:21.119Z',
      collaboration: {
        status: CollaborativeMessageStates.Closed
      }
    },
    message: {
      Reference: 'RED-1',
      Request: 'RFI 1 request from red goes in here',
      Title: 'RFI 1 from RED'
    },
    _rev: '1',
    _id: 'id_4',
    hasBeenRead: false,
    isOpen: false
  },
  {
    messageType: CUSTOM_MESSAGE,
    details: {
      channel: 'channel-k63pjit0',
      from: {
        force: 'White',
        forceColor: '#FCFBEE',
        iconURL: 'default_img/umpireDefault.png',
        roleName: whiteGC.name,
        roleId: whiteGC.roleId
      },
      messageType: 'Chat',
      privateMessage: 'The private content goes in here',
      timestamp: '2020-10-13T08:52:40.930Z',
      collaboration: {
        status: CollaborativeMessageStates.PendingReview,
        response: 'Game control response to RFI 444'
      }
    },
    message: {
      content: 'Message from White, with Private content'
    },
    _id: '2020-03-25T15:08:47.540Z',
    _rev: '1',
    hasBeenRead: false,
    isOpen: false
  },
  {
    messageType: CUSTOM_MESSAGE,
    details: {
      channel: 'channel-k63pjit0',
      from: {
        force: 'Red',
        forceColor: '#F00',
        roleName: redCO.name,
        iconURL: 'default_img/umpireDefault.png',
        roleId: redCO.roleId
      },
      messageType: 'Chat',
      timestamp: '2020-10-13T08:52:04.394Z',
      collaboration: {
        status: CollaborativeMessageStates.EditDocument,
        response: 'Game control response to RFI 4'
      }
    },
    message: {
      content: 'message from Red'
    },
    _id: '2020-03-25T15:08:47.525Z',
    _rev: '1',
    hasBeenRead: false,
    isOpen: false
  },
  {
    messageType: CUSTOM_MESSAGE,
    details: {
      channel: 'ks8soryj',
      from: {
        force: 'Blue',
        forceColor: '#00F',
        roleName: blueCO.name,
        iconURL: 'default_img/umpireDefault.png',
        roleId: blueCO.roleId
      },
      messageType: 'Chat',
      timestamp: '2020-10-13T08:52:21.119Z',
      collaboration: {
        status: CollaborativeMessageStates.DocumentPending,
        response: 'Game control response to RFI 4'
      }
    },
    message: {
      content: 'Message from Blue'
    },
    _id: '2020-03-25T15:08:47.530Z',
    _rev: '1',
    hasBeenRead: false,
    isOpen: false
  }
]

export const messageDataCollaborativeResponding: MessageCustom[] = [
  {
    messageType: CUSTOM_MESSAGE,
    details: {
      channel: 'channel-BlueRFI',
      from: {
        force: 'Blue',
        forceColor: '#00F',
        iconURL: 'default_img/umpireDefault.png',
        roleName: blueCO.name,
        roleId: blueCO.roleId
      },
      messageType: 'RFI',
      timestamp: '2020-10-13T08:54:21.119Z',
      collaboration: {
        status: CollaborativeMessageStates.ResponsePending
      }
    },
    message: {
      Reference: 'Blue-3',
      Request: 'RFI 3 request goes in here',
      Title: 'RFI 3 from Blue'
    },
    _id: 'id_3a',
    _rev: '2',
    hasBeenRead: false,
    isOpen: false
  },
  {
    messageType: CUSTOM_MESSAGE,
    details: {
      channel: 'Red RFI',
      from: {
        force: 'Red',
        roleName: redCO.name,
        forceColor: '#F00',
        iconURL: 'default_img/umpireDefault.png',
        roleId: redCO.roleId
      },
      messageType: 'RFI',
      timestamp: '2020-10-13T08:55:21.119Z',
      collaboration: {
        status: CollaborativeMessageStates.EditResponse
      }
    },
    message: {
      Reference: 'RED-1',
      Request: 'RFI 1 request from red goes in here',
      Title: 'RFI 1 from RED'
    },
    _rev: '1',
    _id: 'id_4',
    hasBeenRead: false,
    isOpen: false
  },
  {
    messageType: CUSTOM_MESSAGE,
    details: {
      channel: 'channel-k63pjit0',
      from: {
        force: 'White',
        forceColor: '#FCFBEE',
        iconURL: 'default_img/umpireDefault.png',
        roleName: whiteGC.name,
        roleId: whiteGC.roleId
      },
      messageType: 'Chat',
      privateMessage: 'The private content goes in here',
      timestamp: '2020-10-13T08:52:40.930Z',
      collaboration: {
        status: CollaborativeMessageStates.Closed,
        response: 'Game control response to RFI 4'
      }
    },
    message: {
      content: 'Message from White, with Private content'
    },
    _id: '2020-03-25T15:08:47.540Z',
    _rev: '1',
    hasBeenRead: false,
    isOpen: false
  },
  {
    messageType: CUSTOM_MESSAGE,
    details: {
      channel: 'channel-k63pjit0',
      from: {
        force: 'Red',
        forceColor: '#F00',
        roleName: redCO.name,
        iconURL: 'default_img/umpireDefault.png',
        roleId: redCO.roleId
      },
      messageType: 'Chat',
      timestamp: '2020-10-13T08:52:04.394Z',
      collaboration: {
        status: CollaborativeMessageStates.PendingReview,
        response: 'Game control response to RFI 4'
      }
    },
    message: {
      content: 'message from Red'
    },
    _id: '2020-03-25T15:08:47.525Z',
    _rev: '1',
    hasBeenRead: false,
    isOpen: false
  },
  {
    messageType: CUSTOM_MESSAGE,
    details: {
      channel: 'channel-k63pjit0',
      from: {
        force: 'Blue',
        forceColor: '#00F',
        roleName: blueCO.name,
        iconURL: 'default_img/umpireDefault.png',
        roleId: blueCO.roleId
      },
      messageType: 'Chat',
      timestamp: '2020-10-13T08:52:21.119Z',
      collaboration: {
        status: CollaborativeMessageStates.Released,
        response: 'Game control response to RFI 4'
      }
    },
    message: {
      content: 'Message from Blue'
    },
    _id: '2020-03-25T15:08:47.530Z',
    _rev: '1',
    hasBeenRead: false,
    isOpen: false
  }
]