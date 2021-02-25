
import { INFO_MESSAGE } from '@serge/config'
import { MessageInfoType } from '@serge/custom-types'

const message1: MessageInfoType = {
  gameTurn: 0,
  messageType: INFO_MESSAGE,
  infoType: true,
  details: { channel: 'Net 16'},
  _id: "2021-02-24T17:50:31.603Z",
}
const message2: MessageInfoType = {
  gameTurn: 1,
  messageType: INFO_MESSAGE,
  infoType: true,
  details: { channel: 'Net 16'},
  _id: "2021-02-24T17:52:31.603Z",
}

const messages: MessageInfoType[] = [message1, message2]

export default messages
