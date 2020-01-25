import L from 'leaflet'

// the images we use to annotate planning legs
import turn0deg from '../images/turn0deg.png'
import turn30deg from '../images/turn30deg.png'
import turn60deg from '../images/turn60deg.png'
import turn90deg from '../images/turn90deg.png'
import turn120deg from '../images/turn120deg.png'
import turn150deg from '../images/turn150deg.png'
import noTurn from '../images/no-turn.png'
import lightTurn from '../images/light-turn.png'

import turnNameFor from './turnNameFor'
import roundToNearest from './roundToNearest'
import { min } from 'moment'

// http://192.168.1.25:8080/?wargame=wargame-k5kw38gf&access=p5543

function lineFor (/* array */ plannedTurns, /* latLng */ start,
  /* boolean */ lightweight, /* grid */ grid, /* string */ color) {
  const weight = lightweight ? 2 : 4
  const dashArray = lightweight ? [1, 4] : [4, 8]
  const polyLine = L.polyline([], {
    dashArray: dashArray,
    weight: weight,
    color: color
  })
  const latLongs = [start]
  plannedTurns.forEach(turn => {
    // loop through the routes
    if (turn.route) {
      // loop through the steps in this route
      turn.route.forEach(step => {
        const ptHex = grid.hexNamed(step)
        if (ptHex) {
          const location = ptHex.centrePos
          latLongs.push(location)
        }
      })
    }
  })
  polyLine.setLatLngs(latLongs)

  return polyLine
}

function bearingBetween (/* latLng */ p1, /* latLng */ p2) {
  var d2r = Math.PI / 180
  var r2d = 180 / Math.PI
  var lat1 = p1.lat * d2r
  var lat2 = p2.lat * d2r
  var dLon = (p2.lng - p1.lng) * d2r
  var y = Math.sin(dLon) * Math.cos(lat2)
  var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon)
  var brng = Math.atan2(y, x)
  brng = parseInt(brng * r2d)
  brng = (brng + 360) % 360
  return brng
};

/** we plot a line marker perpendicular to the direction
 * of travel at route waypoints.  Determine the marker to use for this bearing
 */
function bearingMarkerFor(/* number */ angle) {
  let icon
  var iconAngles = {
    deg0: {icon: turn0deg, markerAngle: 0},
    deg30: {icon: turn30deg, markerAngle: 30},
    deg60: {icon: turn60deg, markerAngle: 60},
    deg90: {icon: turn90deg, markerAngle: 90},
    deg120: {icon: turn120deg, markerAngle: 120},
    deg150: {icon: turn150deg, markerAngle: 150},
    turnLightVar: {icon: lightTurn, markerAngle: null},
  }

  console.log("Rounded angle", angle)
  if(angle === 0 || angle === 90 ||angle === 180 || angle === 360){
    // 90
    icon = iconAngles.deg90.icon  // testing out a dynamic way of moving the markers
    console.log("90 degree marker", iconAngles.deg90.markerAngle)
  } else if(angle === 30){
    // 30
    icon = iconAngles.deg30.icon
    console.log("30 degree marker", iconAngles.deg30.markerAngle)
  } else if(angle === 60){
    // 60
    icon = iconAngles.deg60.icon
    console.log("60 degree marker", iconAngles.deg60.markerAngle)
  } else if(angle === 120){
    // 120
    icon = iconAngles.deg30.icon
    console.log("30 degree marker", iconAngles.deg30.markerAngle)
  } else if(angle === 150){
    // 150
    icon = iconAngles.deg30.icon
    console.log("30 degree marker", iconAngles.deg30.markerAngle)
  } else if(angle === 210){
    // 210
    icon = iconAngles.deg30.icon
    console.log("30 degree marker", iconAngles.deg30.markerAngle)
  } else if(angle === 240) {
    // 240
    icon = iconAngles.deg150.icon
    console.log("150 degree marker", iconAngles.deg150.markerAngle)
  } else if(angle === 270){
    // 30
    icon = iconAngles.deg0.icon
    console.log("0 degree marker", iconAngles.deg0.markerAngle)
  } else if(angle === 300){
    // 30
    icon = iconAngles.deg30.icon
    console.log("30 degree marker", iconAngles.deg30.markerAngle)
  } else if (angle === 330){
    // 330
    icon = iconAngles.deg120.icon
    console.log("120 degree marker", iconAngles.deg120.markerAngle)
  } else if (angle === undefined || angle === null) {
    // as some angles are undefined just use the end icon until this can be figured out
    // 90
    icon = iconAngles.deg90.icon
    console.log("90 degree marker", iconAngles.deg90.markerAngle)
  } else {
    // 90
    icon = iconAngles.deg90.icon
    console.log("90 degree marker", iconAngles.deg90.markerAngle)
  }
  return icon
}

function turnFor(/* latLng */ minus2, /* latLng */ minus1, /* latLng */ current, /* string */ comment) {
  let bearing = null
  let bearingFloat = null
  if (!minus2) {
    // ok, just the angle to current from minus 1
    bearingFloat = bearingBetween(minus1, current)
    bearing = parseInt(bearingFloat)
    if (comment) {
      console.log(comment, 'type 1', minus1, current, bearing)
    }
  } else if (!current) {
    // ok, for the previous 2 legs
    bearingFloat = bearingBetween(minus2, minus1)
    bearing = parseInt(bearingFloat)
    if (comment) {
      console.log(comment, 'type 2', minus1, minus2, bearing)
    }
  } else {
    // sort out the two directions
    const bearing1 = bearingBetween(minus2, minus1)
    const bearing2 = bearingBetween(minus1, current)
    bearingFloat = (bearing1 + bearing2) / 2
    bearing = parseInt(bearingFloat)
    if (comment) {
      console.log(comment, 'type 3', bearing1, bearing2, bearing)
      console.log("Final bearing", roundToNearest(bearing, 30))
    }
  }
  return bearing
}

function createMarker (/* string */ icon, /* latLng */ location, /* boolean */ lightweight,
  /* string */ title, /* function */ waypointCallback, /* object */ context, /* int */ turnId) {
  // actually, we're adding two items, so put them into a layer group
  const res = L.layerGroup()

  // we use a flag to prevent these items being de-cluttered - since we want the
  // marker and the label stay next to each other
  res.do_not_declutter = true

  const iconToUse = lightweight ? lightTurn : icon

  const turnIcon = L.icon({
    iconUrl: iconToUse,
    iconSize: [15, 15],
    iconAnchor: [7.5, 7.5]
  })
  const marker = L.marker(location, {
    icon: turnIcon, title: title, zIndexOffset: 1000
  })
  console.log(title)
  if (!lightweight) {
    marker.on('click', waypointCallback)
    marker.bindPopup(title).openPopup() // note: this won't work - we can't do it until the marker is on the map
    // also create the divIcon, with the name
    const label = L.divIcon({ html: title, className: 'map-turn-marker', iconSize: [200, 20], iconAnchor: [0, 10] })
    const divMarker = L.marker(location, { icon: label })
    res.addLayer(divMarker)
  }

  // TODO we probably should be passing the context (scope) like this
  marker.context = context
  marker.turnId = turnId

  res.addLayer(marker)

  return res
}

function markersFor (/* array */ plannedTurns, /* latLng */ start,
  /* boolean */ lightweight, /* grid */ grid, /* function */ waypointCallback, /* object */ context) {
  const result = L.layerGroup()
  let minus1 = start // the start point of the track is used as the 'last point'
  let minus2 = null
  let pendingTurnLocation = null
  let pendingTurnName = null
  let current = start
  let turnId = 0
  plannedTurns.forEach(turn => {
    const stateSuffix = turn.speed ? ' @ ' + turn.speed + 'kts' : ''
    const turnName = turnNameFor(turn.turn) + ': ' + turn.state.name + stateSuffix
    turnId = turn.turn

    // loop through the routes
    if (turn.route) {
      // loop through the steps in this route
      turn.route.forEach(step => {
        const ptHex = grid.hexNamed(step)
        if (ptHex) {
          // remember the coords
          current = ptHex.centrePos

          // are we waiting to populate a marker?
          if (pendingTurnLocation) {
            // have we got enough data?
            if (minus1) {
              const angle = turnFor(minus2, minus1, current, turnNameFor(turn.turn - 1))
              //console.log("The pending angle is:", angle)
              const iconName = bearingMarkerFor(roundToNearest(angle, 30))
              result.addLayer(createMarker(iconName, pendingTurnLocation, lightweight, pendingTurnName, waypointCallback, context, turnId))
              pendingTurnLocation = false
            }
          }
          // move everyone down the bed
          minus2 = minus1
          minus1 = current
        }
      })
      pendingTurnLocation = current
      pendingTurnName = turnName
    } else {
      minus2 = minus1
      minus1 = current
      // ok, nothing happening. add a static marker
      result.addLayer(createMarker(noTurn, minus1, lightweight, turnName, waypointCallback, context, turnId))

      // forget about waiting for more coords
      pendingTurnLocation = null
    }
  })
  // are we waiting to populate a marker?
  // do we have a trailing pending turn?
  if (pendingTurnLocation) {
    // have we got enough data?
    if (minus1) {
      const angle = turnFor(minus2, minus1, null, turnNameFor(turnId))
      // console.log("The current angle is:", angle)
      const icon = bearingMarkerFor(angle)
      result.addLayer(createMarker(icon, current, lightweight, pendingTurnName, waypointCallback, context, turnId))
      pendingTurnLocation = false
    }
  }
  return result
}

/** create a Leaflet elememt for this set of routes
  */
export default function planningRouteFor (/* array */ plannedTurns, /* latLng */ start,
  /* boolean */ lightweight, /* grid */ grid, /* string */ color, /* function */ waypointCallback, /* object */ context) {
  const thisLayer = L.layerGroup()

  // start with the line
  const theLine = lineFor(plannedTurns, start, lightweight, grid, color)

  // set the styling
  theLine.color = color

  thisLayer.addLayer(theLine)

  // also sort out the markers
  const markers = markersFor(plannedTurns, start, lightweight, grid, waypointCallback, context)

  // also declutter the markers

  thisLayer.addLayer(markers)

  return thisLayer
}
