import React, { useEffect, useState } from 'react'
import { LayerGroup, Map, ScaleControl, TileLayer } from 'react-leaflet'
import PlanningForces from '../planning-force'
import { MapConstants } from './helper/MapConstants'
import styles from './styles.module.scss'
import PropTypes from './types/props'
import { Map as LMap } from 'leaflet'
import MapControl from '../../map-control'
import _ from 'lodash'

export const SupportMapping: React.FC<PropTypes> = ({
  position, bounds, ownAssets,
  opAssets, filterApplied, setFilterApplied, setSelectedAssets, selectedAssets, forces,
  viewAsCallback, viewAsForce, actionItems, actionCallback, children
}) => {
  const TileLayerProps = MapConstants.TileLayer

  const [leafletElement, setLeafletElement] = useState<LMap | undefined>(undefined)

  useEffect(() => {
    if ((bounds !== undefined) && leafletElement) {
      leafletElement.flyToBounds(bounds, { duration: 0.6 })
    }
  }, [bounds])

  useEffect(() => {
    if (position !== undefined) {
      const defaultZoom = 10
      leafletElement && leafletElement.flyTo(position, defaultZoom, { duration: 0.6 })
    }
  }, [position])

  const handleEvents = (ref: any): void => {
    if (ref && ref.leafletElement) {
      const map: LMap = ref.leafletElement
      if (leafletElement === undefined) {
        setLeafletElement(map)
        bounds && map.fitBounds(bounds)
      }
    }
  }

  return (
    <Map
      className={styles.map}
      ref={handleEvents}
      zoomControl={false}
    >
      <MapControl
        map={leafletElement}
        bounds={bounds}
        filterApplied={filterApplied}
        forces={forces || undefined}
        viewAsCallback={viewAsCallback}
        viewAsForce={viewAsForce}
        zoomStepSize={1}
        actionItems={actionItems}
        actionCallback={actionCallback}
        setFilterApplied={setFilterApplied} />
      <TileLayer {...TileLayerProps} />
      <ScaleControl position='topright' />
      <LayerGroup key={'own-forces'}>
        <PlanningForces opFor={false} assets={ownAssets} setSelectedAssets={setSelectedAssets} selectedAssets={selectedAssets} />
      </LayerGroup>
      <LayerGroup key={'opp-forces'}>
        <PlanningForces opFor={true} assets={opAssets} setSelectedAssets={setSelectedAssets} selectedAssets={selectedAssets} />
      </LayerGroup>
      {children}
    </Map>
  )
}

export default SupportMapping
