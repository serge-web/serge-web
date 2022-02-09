import { Terrain } from '@serge/config'
import { H3Index } from 'h3-js'
import L from 'leaflet'

type H3pos = number[]

/** definition of cell using h3 coords */
export interface SergeHex3 {
  centreLatLng: L.LatLng
  name: string // human-readable index
  index: H3Index // h3 index
  terrain?: Terrain // 'land' or 'sea' (initially undefined)
  styles: number // logical or of style numbers
  fillColor?: string
  poly: H3pos[]
}

export type SergeGrid3 = SergeHex3[]