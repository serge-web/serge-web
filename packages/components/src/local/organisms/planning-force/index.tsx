import cx from 'classnames'
import L, { LatLng, latLng, LeafletMouseEvent, MarkerCluster } from 'leaflet'
import 'leaflet.markercluster/dist/leaflet.markercluster'
import React, {useContext, useEffect, useState } from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { LayerGroup, Marker, Tooltip, useMap } from 'react-leaflet-v4'
import AssetIcon from '../../asset-icon'
import SymbolAssetIcon from '../../symbol-asset-icon'
import { AssetRow } from '../planning-assets/types/props'
import { SupportPanelContext } from '../support-panel'
import styles from './styles.module.scss'
import PropTypes from './types/props'

const PlanningForces: React.FC<PropTypes> = ({ assets, selectedAssets, setSelectedAssets, interactive }) => {
  const [clusterGroup, setClusterGroup] = useState<any | undefined>(undefined)
  const [clustereredMarkers, setClusteredMarkers] = useState<AssetRow[]>([])
  const [rawMarkers, setRawMarkers] = useState<AssetRow[]>([])
  const { assetsCache } = useContext(SupportPanelContext)

  const createIcon = () => {
    return {
      iconCreateFunction: function (cluster: MarkerCluster) {
        const markers = cluster.getAllChildMarkers()
        const size = markers.length / 5 + 40
        const changeColor = markers.length > 10
        const color = styles.circle
        const html = ReactDOMServer.renderToString(<div className={cx({ [color]: true, [styles.yellow]: changeColor })} >{markers.length}</div>)
        return L.divIcon({ html: html, className: cx({ [styles.mycluster]: true, [styles.yellow]: changeColor }), iconSize: L.point(size, size) })
      },
      spiderfyOnMaxZoom: false,
      showCoverageOnHover: true,
      zoomToBoundsOnClick: true,
      removeOutsideVisibleBounds: true
    }
  }

  useEffect(() => {
    if (clusterGroup === undefined) {
      setClusterGroup(new L.MarkerClusterGroup(createIcon()))
    }
    const clustered: AssetRow[] = []
    const raw: AssetRow[] = []
    assets.forEach((asset) => {
      if (selectedAssets.includes(asset.id)) {
        raw.push(asset)
      } else {
        clustered.push(asset)
      }
    })
    setClusteredMarkers(clustered)
    setRawMarkers(raw)
  }, [assets])

  const getAssetIcon = (asset: AssetRow, isSelected: boolean, isDestroyed: boolean): string => {
    const [imageSrc, bgColor] = asset.icon.split(',')

    /** note: we only fill in the background for icons that require shading.  The NATO assets,
      * that begin with `n_` don't require background shading
      */
    const shadeBackground = !imageSrc.startsWith('n_')
    const shadeBackgroundStyle = shadeBackground ? { backgroundColor: bgColor } : {}

    return (
      ReactDOMServer.renderToString(<div className={cx({ [styles.iconbase]: true, [styles.selected]: isSelected })} style={shadeBackgroundStyle}>
        {!asset.sidc && <AssetIcon imageSrc={imageSrc} destroyed={isDestroyed} isSelected={isSelected} health={asset.health} />}
        {asset.sidc && <SymbolAssetIcon force={asset.force} sidc={asset.sidc} iconName={asset.name} isSelected={isSelected} assetsCache={assetsCache} />}
      </div>)
    )
  }

  const MarkerCluster = ({ markers }: { markers: AssetRow[] }) => {
    const map = useMap()

    useEffect(() => {
      if (clusterGroup) {
      clusterGroup.clearLayers()
      const markersWithLocation = markers.filter((row: AssetRow) => row.position)
      const markerList = markersWithLocation.map((asset) => getClusteredMarkerOption(asset))
        // const theMarker = markersWithLocation.find((asset) => asset.id === 'a111')
        // console.log('render marker', theMarker && theMarker.position)
      clusterGroup.addLayers(markerList)

      // add the marker cluster group to the map
      map.addLayer(clusterGroup)
      }
    }, [markers, map, clusterGroup])

    return null
  }

  const handleAssetClick = (assetId: string): void => {
    const idx = selectedAssets.indexOf(assetId)
    if (idx !== -1) {
      selectedAssets.splice(idx, 1)
    } else {
      selectedAssets.push(assetId)
    }
    setSelectedAssets([...selectedAssets])
  }

  const getRawMarkerOption = (asset: AssetRow, index: number) => {
    const loc: LatLng = asset.position ? asset.position : latLng([0, 0])
    const isSelected = selectedAssets.includes(asset.id)
    const isDestroyed = asset.health && asset.health === 0
    return {
      eventHandlers: {
        click: (): void => {
          if (interactive) {
            handleAssetClick(asset.id)
          }
        }
      },
      key: `asset-icon-${index}`,
      position: loc,
      icon: L.divIcon({
        iconSize: [30, 30],
        html: getAssetIcon(asset, isSelected, !!isDestroyed),
        className: styles['map-icon']
      })
    }
  }

  const getClusteredMarkerOption = (asset: AssetRow) => {
    const loc: LatLng = asset.position ? asset.position : latLng([0, 0])
    const isSelected = selectedAssets.includes(asset.id)
    const isDestroyed = asset.health && asset.health === 0

    const interactiveIcon = (): void => {
      if (interactive) {
        handleAssetClick(asset.id)
      }
    }

    return (
      L.marker(new L.LatLng(loc.lat, loc.lng),
        {
          pmIgnore: interactive,
          interactive: interactive,
          icon: L.divIcon({
            iconSize: [30, 30],
            html: getAssetIcon(asset, isSelected, !!isDestroyed),
            className: styles['map-icon']
          })
        })
        .addTo(clusterGroup)
        .bindPopup(asset.name)
        .on('click', interactiveIcon)
        .on('mouseover', (ev: LeafletMouseEvent) => ev.target.openPopup())
    )
  }

  return <>
    {
      <LayerGroup key={'first-forces-layer'}>
        <MarkerCluster markers={clustereredMarkers} />
        {rawMarkers && rawMarkers.map((asset: AssetRow, index: number) => {
          const markerOption = getRawMarkerOption(asset, index)
          return <Marker
            pmIgnore
            interactive={false}
            {...markerOption}
          >
            <Tooltip>{asset.name}</Tooltip>
          </Marker>
        })}
      </LayerGroup >
    }
  </>
}

export default PlanningForces
