import { Wargame } from '@serge/custom-types'
const wargame: Wargame =  {
  _id: '1',
  name:'mock',
  adjudicationStartTime: '',
  phase: 'planning',
  gameTurn: 2,
  "isLoading": false,
  "wargameList": [
    {
      "name": "http://localhost:8080/db/wargame-k5xyxas9",
      "title": "IMWARC-T2 Playing",
      "initiated": true
    },
    {
      "name": "http://localhost:8080/db/wargame-k5xxsr4b",
      "title": "IMWARC-T1 Adjudication",
      "initiated": true
    },
    {
      "name": "http://localhost:8080/db/wargame-k5pap52f",
      "title": "IMWARC-Initialised",
      "initiated": true
    },
    {
      "name": "http://localhost:8080/db/wargame-k5pafxci",
      "title": "IMWARC",
      "initiated": false
    },
    {
      "name": "http://localhost:8080/db/wargame-k16fadm4",
      "title": "Monday",
      "initiated": true
    }
  ],
  "currentWargame": "",
  "exportMessagelist": [],
  "wargameTitle": "Task-Group",
  "data": {
    "overview": {
      "name": "Overview - settings",
      "gameDescription": "",
      "gameTurnTime": 43200000,
      "realtimeTurnTime": 300000,
      "timeWarning": 60000,
      "gameDate": "2020-02-21T12:41:20+00:00",
      "showAccessCodes": false,
      "complete": false,
      "dirty": false
    },
    "forces": {
      "name": "Forces",
      "forces": [
        {
          "name": "White",
          "uniqid": "umpire",
          "overview": "Umpire force.",
          "roles": [
            {
              "roleId": "r12345",
              "name": "Game Control",
              "password": "pk6w5y28j",
              "isGameControl":true,
              "isObserver": true,
              "isInsightViewer": true,
              "isRFIManager": true,
              "canSubmitPlans": true
            }
          ],
          "icon": "http://localhost:8080/default_img/umpireDefault.png",
          "color": "#FCFBEE",
          "umpire": true,
          "dirty": false
        }
      ],
      "selectedForce": "",
      "complete": false,
      "dirty": false
    },
    "channels": {
      "name": "Channels",
      "channels": [],
      "selectedChannel": "",
      "complete": false,
      "dirty": false
    }
  },
  "currentTab": "overview",
  "wargameInitiated": false,
  "adminNotLoggedIn": false
}

export default wargame
