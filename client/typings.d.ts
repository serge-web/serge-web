// export {}

declare module '*.md' {
  const content: string
  export = content;
}

declare global {
  interface Window {
    G_CONFIG: any
  }
}

interface Window {
  channelTabsContainer?: any
  selectedChannel: string
}

declare module 'react-leaflet-vectorgrid'
declare module '@json-editor/json-editor'
declare module 'milstd'
declare module 'redux-logger'
// TODO: Remove the line below when the store package has been converted
declare module '@serge/store'
declare module 'whatwg-fetch'
declare module '@ginkgo-bioworks/react-json-schema-form-builder'
