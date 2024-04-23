/* eslint-disable quotes */
import { TemplateBody } from 'src/custom-types'

const messageTemplatesMock: TemplateBody[] = [
  {
    completed: false,
    details: {
      schema: "{\"type\":\"object\",\"title\":\"State of World (laydown 2)\",\"properties\":{\"completed\":{\"title\":\"completed\",\"type\":\"boolean\"},\"Reference\":{\"title\":\"Reference\",\"type\":\"string\"},\"Title\":{\"title\":\"Title\",\"type\":\"string\"},\"Forces\":{\"items\":{\"type\":\"object\",\"properties\":{\"Forces\":{\"enum\":[\"Blue\",\"Red\",\"Green\"],\"type\":\"string\",\"title\":\"Forces\"}},\"dependencies\":{},\"required\":[]},\"title\":\"Forces\",\"type\":\"array\"}},\"dependencies\":{},\"required\":[]}",
      uischema: "{\"Forces\":{\"items\":{\"ui:order\":[\"Forces\"]}},\"ui:order\":[\"completed\",\"Reference\",\"Title\",\"Forces\"]}",
      title: 'State of World L'
    },
    lastUpdated: '2019-09-30T12:37:26.705Z',
    title: 'State of World L',
    _id: 'k16eedkp',
    _rev: '1-612d7dc5d10fc81bc7459b2801c66816'
  },
  {
    lastUpdated: '2019-09-30T12:37:26.705Z',
    title: 'Chat',
    details: {
      schema: "{\"type\":\"object\",\"properties\":{\"Chat\":{\"title\":\"Chat\",\"type\":\"string\",\"description\":\"content\",\"default\":\"type the text \"}},\"dependencies\":{},\"required\":[]}",
      uischema: "{\"Chat\":{\"ui:widget\":\"textarea\"},\"ui:order\":[\"Chat\"]}",
      title: 'Chat'
    },
    completed: false,
    _id: 'k16eedkl',
    _rev: '1-09ab7a18ff677cec5d9a56f02a45788d'
  },
  {
    lastUpdated: '2019-09-30T12:37:26.705Z',
    title: 'Daily intentions',
    details: {
      schema: "{\"type\":\"object\",\"properties\":{\"TurnNumber\":{\"title\":\"Turn\",\"type\":\"string\"},\"OverallIntentions\":{\"title\":\"Overall intentions\",\"type\":\"string\"},\"orders\":{\"items\":{\"type\":\"object\",\"title\":\"\",\"properties\":{\"Unit\":{\"title\":\"Unit\",\"type\":\"string\"},\"Tasking\":{\"title\":\"Tasking\",\"type\":\"string\"},\"Search Policy\":{\"title\":\"Search Policy\",\"type\":\"string\"},\"Action on Contact\":{\"enum\":[\"Ignore\",\"Evade\",\"Covert Trail\",\"Overt Trail\",\"Harass\"],\"title\":\"Action on Contact\",\"type\":\"string\",\"enumNames\":null},\"Any other comments\":{\"title\":\"Any other comments\",\"type\":\"string\"}},\"dependencies\":{},\"required\":[]},\"title\":\"orders\",\"type\":\"array\"}},\"dependencies\":{},\"required\":[]}",
      uischema: "{\"orders\":{\"items\":{\"Tasking\":{\"ui:widget\":\"textarea\"},\"Search Policy\":{\"ui:widget\":\"textarea\"},\"Any other comments\":{\"ui:widget\":\"textarea\"},\"ui:order\":[\"Unit\",\"Tasking\",\"Search Policy\",\"Action on Contact\",\"Any other comments\"]}},\"ui:order\":[\"TurnNumber\",\"OverallIntentions\",\"orders\"]}",
      title: 'Daily Intent'
    },
    completed: false,
    _id: 'k16eedkn',
    _rev: '1-cc8e8cdb01447959c266761066448382'
  },
  {
    lastUpdated: '2019-09-30T12:37:26.705Z',
    title: 'Link',
    details: {
      title: 'Link',
      schema: "{\"type\":\"object\",\"properties\":{\"Title\":{\"title\":\"Title\",\"type\":\"string\"},\"URL\":{\"title\":\"URL\",\"type\":\"string\"}},\"dependencies\":{},\"required\":[],\"title\":\"Link\"}",
      uischema: "{\"ui:order\":[\"Title\",\"URL\"]}"
    },
    completed: false,
    _id: 'k16eedkm',
    _rev: '1-7fa1e6dd6b4ac5b6afc45b596ee7af61'
  },

  {
    completed: false,
    details: {
      title: 'COA',
      schema: '{"type":"object","properties":{"Reference":{"type":"string","title":"Reference (sys generated)","readonly":true},"Title":{"type":"string","title":"*COA / Op Name","format":"textarea"},"LOCATION":{"title":"*Location of activities in this turn","type":"object","properties":{"region":{"title":"Region","type":"string","enum":["Asia Pacific","Europe","Americas"],"default":"Europe"},"Europe":{"title":"Country","type":"string","enum":["United Kingdom","Germany"],"options":{"dependencies":{"region":"Europe"}}},"Americas":{"title":"Country","type":"string","enum":["United States of America","Brazil"],"options":{"dependencies":{"region":"Americas"}}},"AsiaPacific":{"title":"Country","type":"string","enum":["India","China"],"options":{"dependencies":{"region":"Asia Pacific"}}}}},"PRESCRIPTED":{"type":"boolean","title":"*Is this a pre-scripted activity? E.g. DXP","default":true,"format":"checkbox"},"VISIBILITY":{"type":"string","title":"*Intended visibility to adversary","enum":["Overt","Covert","Clandestine","Complex"]},"COA_SUPPORTS_AS":{"type":"boolean","title":"*This COA supports / uses an AS plan / effect","default":true,"format":"checkbox"},"TARGET":{"type":"string","title":"*Target(s) – Adversary, Ally, specific audience within Adversary or allied polity etc","format":"textarea"},"STRAT_COMMS":{"type":"string","title":"Outline of associated Strategic Communications","format":"textarea"},"OBJECTIVES_TURN":{"type":"string","title":"Objectives in this turn","format":"textarea"},"OBJECTIVES_OVERALL":{"type":"string","title":"Overall Objectives","format":"textarea"},"TARGET_CENTRE_OF_GRAVITY":{"type":"string","title":"Target’s Centre of Gravity","format":"textarea"},"DESIRED_ENDSTATE_TURN":{"type":"string","title":"*Desired Endstate in this turn","format":"textarea"},"DESIRED_ENDSTATE_OVERALL":{"ui:placeholder":"Enter Desired Endstate Overall, if NOT in this turn"},"EFFECTS_AND_ACTIONS":{"ui:placeholder":"Enter Effects and actions"},"SEQUENCING_AND_PHASES":{"ui:placeholder":"Enter Sequencing and phases"},"ADVERSARY_UNDERSTANDING":{"ui:placeholder":"Enter What would my adversary see / understand of this activity / messaging?"},"ADVERSARY_REACTION_COUNTER_ACTION":{"ADVERSARY_MLCOA":{"ui:placeholder":"Enter Adversary MLCOA"},"MLCOA_RESPONSE":{"ui:placeholder":"Enter Own Response"},"ADVERSARY_MDCOA":{"ui:placeholder":"Enter Adversary MDCOA"},"MDCOA_RESPONSE":{"ui:placeholder":"Enter Own Response"}},"ORBAT":{"items":{"FEName":{"ui:placeholder":"Enter FE Name"}}},"TIMINGS":{"START_PLANNING":{"ui:placeholder":"Select Start planning date"},"START_DEPLOYMENT":{"ui:placeholder":"Select Start deployment date"},"START_OPERATION":{"ui:placeholder":"Select Start Operation date"},"END_OPERATION":{"ui:placeholder":"Select End Operation date"},"END_RECOVERY":{"ui:placeholder":"Select End recovery date"}},"DEPENDENCIES":{"ui:placeholder":"Enter Dependencies on Allied capability"},"PEER_REVIEW":{"ui:placeholder":"Enter Peer Review by"},"INSIGHT":{"ui:placeholder":"Enter Insight"}}}',
      uischema: ' {"Reference":{"ui:widget":"hidden"},"Title":{"ui:placeholder":"Enter COA / Op Name"},"LOCATION":{"region":{"ui:widget":"select"}},"PRESCRIPTED":{"ui:widget":"radio"},"VISIBILITY":{"ui:widget":"select"},"COA_SUPPORTS_AS":{"ui:widget":"radio"},"TARGET":{"ui:placeholder":"Enter Target(s)"},"STRAT_COMMS":{"ui:placeholder":"Enter Outline of associated Strategic Communications"},"OBJECTIVES_TURN":{"ui:placeholder":"Enter Objectives in this turn"},"OBJECTIVES_OVERALL":{"ui:placeholder":"Enter Overall Objectives"},"TARGET_CENTRE_OF_GRAVITY":{"ui:placeholder":"Enter Target’s Centre of Gravity"},"DESIRED_ENDSTATE_TURN":{"ui:placeholder":"Enter Desired Endstate in this turn"},"DESIRED_ENDSTATE_OVERALL":{"ui:placeholder":"Enter Desired Endstate Overall, if NOT in this turn"},"EFFECTS_AND_ACTIONS":{"ui:placeholder":"Enter Effects and actions"},"SEQUENCING_AND_PHASES":{"ui:placeholder":"Enter Sequencing and phases"},"ADVERSARY_UNDERSTANDING":{"ui:placeholder":"Enter What would my adversary see / understand of this activity / messaging?"},"ADVERSARY_REACTION_COUNTER_ACTION":{"ADVERSARY_MLCOA":{"ui:placeholder":"Enter Adversary MLCOA"},"MLCOA_RESPONSE":{"ui:placeholder":"Enter Own Response"},"ADVERSARY_MDCOA":{"ui:placeholder":"Enter Adversary MDCOA"},"MDCOA_RESPONSE":{"ui:placeholder":"Enter Own Response"}},"ORBAT":{"items":{"FEName":{"ui:placeholder":"Enter FE Name"}}},"TIMINGS":{"START_PLANNING":{"ui:widget":"datetime"},"START_DEPLOYMENT":{"ui:widget":"datetime"},"START_OPERATION":{"ui:widget":"datetime"},"END_OPERATION":{"ui:widget":"datetime"},"END_RECOVERY":{"ui:widget":"datetime"}},"CONTINUES_INTO_NEXT_TURN":{"ui:widget":"radio"},"DEPENDENCIES":{"ui:placeholder":"Enter Dependencies on Allied capability"},"AdjudicationSupport":{"ui:widget":"checkboxes"},"PEER_REVIEW":{"ui:placeholder":"Enter Peer Review by"},"INSIGHT":{"ui:placeholder":"Enter Insight"}}'
    },
    lastUpdated: '2019-09-30T12:37:26.705Z',
    title: 'COA',
    _id: 'k16eedkk',
    _rev: '1-4c3969d57f8cf470858dd1819ee5c2e8'
  },
  {
    lastUpdated: '2019-09-30T12:37:26.705Z',
    title: 'RFI',
    details: {
      schema: "{\"type\":\"object\",\"properties\":{\"\":{\"title\":\"\",\"type\":\"object\",\"properties\":{\"Reference (sys generated)\":{\"title\":\"Reference (sys generated)\",\"type\":\"string\"},\"Title\":{\"title\":\"Title\",\"type\":\"string\"}},\"dependencies\":{},\"required\":[]},\"RFI\":{\"title\":\"RFI\",\"type\":\"string\"},\"newInput1\":{\"title\":\"RFI\",\"type\":\"object\",\"properties\":{\"Priority\":{\"enum\":[\"High\",\"Medium\",\"Low\"],\"title\":\"Priority\",\"type\":\"string\"},\"FAO\":{\"enum\":[\"J2\",\"SME - CEMA\",\"SME - Space\",\"SME - Logs & Med\",\"SME - IO\",\"SME - White\",\"Actor - White\",\"Actor - Red\",\"Other\"],\"title\":\"FAO\",\"type\":\"string\"},\"Response required by\":{\"enum\":[\"Within in hour\",\"NlT 1300\",\"NLT 1600\",\"Not Urgent\"],\"title\":\"Response required by\",\"type\":\"string\"}},\"dependencies\":{},\"required\":[]}},\"dependencies\":{},\"required\":[]}",
      uischema: "{\"\":{\"ui:order\":[\"Reference (sys generated)\",\"Title\"]},\"RFI\":{\"ui:widget\":\"textarea\"},\"newInput1\":{\"ui:order\":[\"Priority\",\"FAO\",\"Response required by\"]},\"ui:order\":[\"\",\"RFI\",\"newInput1\"]}",
      title: 'RFI'
    },
    completed: false,
    _id: 'k16eedkj',
    _rev: '1-683379b9418a2ba688eb4a8dfec4de11'
  },
  {
    lastUpdated: '2019-09-30T12:37:26.705Z',
    title: 'Message',
    details: {
      schema: "{\"type\":\"object\",\"properties\":{\"title\":{\"title\":\"title\",\"type\":\"string\"},\"content\":{\"title\":\"content\",\"type\":\"string\"}},\"dependencies\":{},\"required\":[]}",
      uischema: "{\"content\":{\"ui:widget\":\"textarea\"},\"ui:order\":[\"title\",\"content\"]}",
      title: 'Message'
    },
    completed: false,
    _id: 'k16eedki',
    _rev: '1-7de33e447b392eeaf7164f4ec331bc57'
  },
  {
    lastUpdated: '2019-09-30T12:37:26.705Z',
    title: 'Weather forecast',
    details: {
      schema: "{\"type\":\"object\",\"properties\":{\"Weather forecast\":{\"title\":\"Weather forecast\",\"type\":\"object\",\"properties\":{\"Title\":{\"title\":\"Title\",\"type\":\"string\"}},\"dependencies\":{},\"required\":[]},\"Location\":{\"title\":\"Location\",\"type\":\"object\",\"properties\":{\"Lat\":{\"title\":\"Lat\",\"type\":\"number\"},\"Lat Hemi\":{\"enum\":[\"N/S\",\"N\",\"S\"],\"title\":\"Lat Hemi\",\"type\":\"string\"},\"Long\":{\"title\":\"Long\",\"type\":\"number\"},\"Long Hemi\":{\"title\":\"Long Hemi\",\"type\":\"number\"}},\"dependencies\":{},\"required\":[]},\"Valid from\":{\"format\":\"date\",\"title\":\"Valid from\",\"type\":\"string\"},\"Valid until\":{\"format\":\"date\",\"title\":\"Valid until\",\"type\":\"string\"},\"Forecast\":{\"title\":\"Forecast\",\"type\":\"string\"}},\"dependencies\":{},\"required\":[]}",
      uischema: "{\"Weather forecast\":{\"ui:order\":[\"Title\"]},\"Location\":{\"ui:order\":[\"Lat\",\"Lat Hemi\",\"Long\",\"Long Hemi\"]},\"Forecast\":{\"ui:widget\":\"textarea\"},\"ui:order\":[\"Weather forecast\",\"Location\",\"Valid from\",\"Valid until\",\"Forecast\"]}",
      title: 'Weather Forecast'
    },
    completed: false,
    _id: 'k16eedkh',
    _rev: '1-f332e0104a371b590346b66dc8e9fa2b'
  },
  {
    lastUpdated: '2019-09-30T12:37:26.704Z',
    title: 'Machinery failure',
    details: {
      schema: "{\"type\":\"object\",\"properties\":{\"title\":{\"type\":\"string\"},\"Date\":{\"format\":\"date\",\"title\":\"Date\",\"type\":\"string\"},\"Status\":{\"enum\":[\"Minor\",\"Major\",\"Critical\"],\"title\":\"Status\",\"type\":\"string\"},\"Description\":{\"title\":\"Description\",\"type\":\"string\"}},\"dependencies\":{},\"required\":[],\"description\":\"\",\"title\":\"Machinery failure\"}",
      uischema: "{\"Description\":{\"ui:widget\":\"textarea\"},\"ui:order\":[\"title\",\"Date\",\"Status\",\"Description\"]}",
      title: 'Machinery Failure'
    },
    completed: false,
    _id: 'k16eedkg',
    _rev: '1-80fc0c1feca8eb6d812d3fa2068ffe89'
  },
  {
    completed: false,
    details: {
      schema: "{\"type\":\"object\",\"properties\":{\"Forces\":{\"items\":{\"type\":\"string\"},\"title\":\"Forces\",\"type\":\"array\",\"minItems\":1}},\"dependencies\":{},\"required\":[]}",
      uischema: "{\"Forces\":{\"items\":{}},\"ui:order\":[\"Forces\"]}",
      title: 'State of World (Full 2)'
    },
    lastUpdated: '2019-12-20T15:57:11.519Z',
    title: 'State of world (full 2)',
    _id: '2019-12-20T15:57:11.519Z',
    _rev: '1-4bd7b0b5488182f39f10d5203bb1fad8'
  }
]

export default messageTemplatesMock
