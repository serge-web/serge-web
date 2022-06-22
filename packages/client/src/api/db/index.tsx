import { 
  serverPath,
  databasePath,
  socketPath,
  replicate,
  deletePath
} from '@serge/config'
import { Message, MessageCustom, Wargame } from '@serge/custom-types'
import { io } from 'socket.io-client'
import {
  ProviderDbInterface,
  DbProviderInterface,
  FetchData,
  FetchDataArray
} from './types'

export class DbProvider implements DbProviderInterface {
  private provider: ProviderDbInterface
  name: string
  message_ID: string

  constructor (databasePath: string) {
    this.provider = {
      db: databasePath
    }
    this.name = databasePath
    this.message_ID = '' 
  }

  // reset socket room before repeating  
  // of dublicate messages
  changes (listener: (doc: Message) => void): void {
    const socket = io(socketPath)
    const listenerMessage = (data: MessageCustom) => {
      this.message_ID !== data._id ? listener(data) : socket.off('changes', listenerMessage) 
      this.message_ID = data._id 
    }
    socket.on('changes', listenerMessage)
  }

  destroy (): void {
    fetch(serverPath + deletePath + this.getDbName(), {
      method: 'DELETE'
    })
  }

  get (query: string): Promise<Wargame | Message | { status: number }> {
    return new Promise((resolve, reject) => {
      fetch(serverPath + 'get/' + this.getDbName() + '/' + query)
        .then(res => res.json() as Promise<FetchData>)
        .then(({ msg, data }) => {
          if (msg === 'ok') resolve(data)
          else resolve({ status: 404 })
        })
    })
  }

  private getDbName (): string {
    return this.getDbNameFromUrl(this.provider.db)
  }

  private getDbNameFromUrl (url: string): string {
    return url.replace(databasePath, '')
  }

  put (doc: Wargame | Message): Promise<Wargame | Message> {
    return new Promise((resolve, reject) => {
      fetch(serverPath + this.getDbName(), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(doc)
      }).then((res) => resolve(res.json()))
    })
  }

  allDocs (): Promise<MessageCustom[]> {
    return new Promise((resolve, reject) => {
      fetch(serverPath + this.getDbName())
        .then(res => res.json() as Promise<FetchDataArray>)
        .then((res) => {
          const { msg, data } = res
          // @ts-ignore
          if (msg === 'ok') resolve(data[0] && data[0].docs ? data[0].docs : data as Message[])
          else reject(msg)
        })
    })
  }

  replicate (newDbProvider: { name: string, db: ProviderDbInterface }): Promise<DbProvider> {
    return new Promise((resolve, reject) => {
      fetch(serverPath + replicate + `${this.getDbNameFromUrl(newDbProvider.name)}/${this.getDbName()}`)
        .then(() => resolve(new DbProvider(newDbProvider.name)))
        .catch((err: string) => reject(err))
    })
  }
}

export default DbProvider
