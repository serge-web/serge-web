var map;

var image_top = 14.194809302;
var image_left = 42.3558566271;
var image_right = 43.7417816271;
var image_bottom = 12.401259302;

// zoomDelta: 0.5,
//     zoomSnap: 0,

map = L.map('map', {
    minZoom: 8,
    maxZoom: 12,
    center: [(image_top + image_bottom) / 2, (image_left + image_right) / 2],
    zoom: 9,
    attributionControl: false,
    zoomAnimation: false
});
map.zoomControl.setPosition('topleft');

var tiledBackdrop = L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
    attribution: 'Data © <a href="http://osm.org/copyright">OpenStreetMap</a>',
    //maxZoom: 18
});

var land_cells = [
    "M00",
    "N00", "N01",
    "O00", "O01", "O02", "O03",
    "P00", "P01", "P02", "P03", "P04", "P05", "P09",
    "Q00", "Q01", "Q02", "Q03", "Q04", "Q05", "Q06", "Q07", "Q08", "Q09",
    "R00", "R01", "R02", "R03", "R04", "R05", "R06", "R07", "R08", "R09",
    "S00", "S01", "S02", "S03", "S04", "S05", "S06", "S07", "S08", "S09",
    "T00", "T01", "T02", "T03", "T04", "T05", "T06", "T07", "T08", "T09",
    "U00", "U01", "U02", "U03", "U04", "U05", "U06", "U07", "U08", "U09",
    "V00", "V01", "V02", "V03", "V04", "V05", "V06", "V07", "V08", "V09",
    "W00", "W01", "W02", "W03", "W04", "W05", "W06", "W07", "W08", "W09",
    "X00", "X01", "X02", "X03", "X04", "X05", "X06", "X07", "X08", "X09",
]

var sea_cells = ["A00", "A01", "A02", "A03", "A04", "A05", "A06", "A07", "A08", "A09",
    "B00", "B01", "B02", "B03", "B04", "B05", "B06", "B07", "B08", "B09",
    "C00", "C01", "C02", "C03", "C04", "C05", "C06", "C07", "C08", "C09",
    "D00", "D01", "D02", "D03", "D04", "D05", "D06", "D07", "D08", "D09",
    "E00", "E01", "E02", "E03", "E04", "E05", "E06", "E07", "E08", "E09",
    "F00", "F02", "F03", "F04", "F05", "F06", "F07", "F08", "F09",
    "G00", "G01", "G02", "G03", "G04", "G05", "G06", "G07", "G08", "G09",
    "H00", "H01", "H02", "H03", "H04", "H05", "H06", "H07", "H08", "H09",
    "I00", "I01", "I02", "I03", "I04", "I05", "I06", "I07", "I08", "I09",
    "J00", "J01", "J02", "J03", "J04", "J05", "J06", "J07", "J08", "J09",
    "K00", "K01", "K02", "K03", "K04", "K05", "K06", "K07", "K08", "K09",
    "L00", "L01", "L02", "L03", "L04", "L05", "L06", "L07", "L08", "L09",
    "M00", "M01", "M02", "M03", "M04", "M05", "M06", "M07", "M08", "M09",
    "N00", "N01", "N02", "N03", "N04", "N05", "N06", "N07", "N08", "N09",
    "O02", "O03", "O04", "O05", "O06", "O07", "O08", "O09",
    "P03", "P04", "P05", "P06", "P07", "P08", "P09",
    "Q07", "Q08", "Q09"
]

var imageUrl = 'images/new_map.jpg',
    imageBounds = [
        [image_top, image_left],
        [image_bottom, image_right]
    ];
var overlay = L.imageOverlay(imageUrl, imageBounds, {
    opacity: 0.8
}).addTo(map);

L.control.mousePosition().addTo(map);


class GridImpl {
    constructor(origin, delta, width, height) {
        this.origin = origin
        this.delta = delta
        this.grid = Honeycomb.defineGrid()
        this.grid_cells = this.grid.rectangle({
            width: width,
            height: height,
            direction: 'E'
        })

        // the hexes all have the same corners object, so just use the first one
        const hexOne = this.grid_cells[0]
        this.corners = hexOne.corners();

        // get the coordinates of the centre of the hex, relative
        // to the top-left origin
        this.centreH = hexOne.center()

        // and the coords of the top-left origin
        const cellOrigin = hexOne.coordinates()

        // capture the offset between a cell centre, and the cell origin
        this.centreOffset = L.point(this.centreH).subtract(L.point(cellOrigin))

    }
    /** get the array of cells */
    get cells() {
        return this.grid_cells
    }
    /** convert this point in cell coordinates to lat/long */
    toWorld(point) {
        return this.toWorld2(this.origin, point)
    }
    /** calculate the position from the supplied offset */
    toWorld2(origin, point) {
        return L.latLng(origin.lat - point.x * this.delta, origin.lng + point.y * this.delta)
    }
    /** convert this lat/long to Hex coordinates */
    toHex(point) {
        var latVal = (this.origin.lat - point.lat) / this.delta
        var lngVal = (point.lng - this.origin.lng) / this.delta
        return L.point(latVal, lngVal)
    }
    /** get the cells at the indicated distance from the origin */
    hexesInRange(startHex, stepLimit) {
        return this.grid_cells.hexesInRange(startHex, stepLimit, true)
    }
    /** get the cells on the path between these points */
    hexesBetween(startHex, endHex) {
        return this.grid_cells.hexesBetween(startHex, endHex)
    }
    /** retrive the cell at the supplied human-readable coords ("A01") */
    hexNamed(name)
    {
        return this.grid_cells.find(cell => cell.name == name)
    }
    /** get the hex cell for a location
     */
    cellFor(latLng) {
        // convert to hex coordinates
        var hexCoords = this.toHex(latLng)

        // apply the offset, since the cell origin is at the top left
        cellCoords = L.point(hexCoords.x + this.centreOffset.x, hexCoords.y + this.centreOffset.y)

        // find the nearest hex cell reference to this location
        var cellCoords = this.grid.pointToHex(cellCoords.x, cellCoords.y)

        // and now retrieve the cell at these coords
        return this.cells.get(cellCoords)
    }
    /** generate the hexagons, and add them to thie supplied layer */
    addShapesTo(gridLayer) {
        // add the grid to the map
        this.grid_cells.forEach(hex => {
            // get the coordinates of the cell
            const point = hex.toPoint()

            // safely store the coords of the centre of the cell
            hex.centrePos = grid.toWorld(point)

            /** function to zero-pad the integer counter
             */
            function pad(num) {
                var s = "" + num;
                return s.padStart(2, '0')
            }
            hex.name = String.fromCharCode(65 + hex.y) + pad(hex.x)

            // add a marker
            var myIcon = L.divIcon({
                className: 'cell-label',
                html: hex.name
            });
            // you can set .my-div-icon styles in CSS
            const cellLabel = L.marker(hex.centrePos, {
                icon: myIcon, 
                keyboard: false,  // prevent it taking keyboard focus
                zIndexOffset:-100  // ensure it's rendered behind routes
            });
            markerLayer.addLayer(cellLabel);

            // add the shape
            // build up an array of correctly mapped corners
            var cornerArr = []

            // function to scale the corner to our map scale
            const centreH = this.centreH

            function scalePoint(value) {
                var centreP = hex.centrePos
                // the corners are relative to the origin (TL). So, offset them to the centre
                var point = {
                    x: value.x - centreH.x,
                    y: value.y - centreH.y
                }
                var newP = grid.toWorld2(centreP, point)
                cornerArr.push(newP)
            }

            // apply the scaling function to each corner
            this.corners.forEach(scalePoint)

            // now create the polygon
            var polygon = L.polygon(cornerArr, {
                color: '#fff',
                opacity: 0.2,
                weight: 3
            })

            // store the polyline in the cell
            hex.polygon = polygon

            // add this polygon to the relevant layer
            gridLayer.addLayer(polygon)
        })
    }
}

class MovementListener {
    constructor(map, grid) {
        this.grid = grid
        this.routeLine = L.polyline([], {
            color: '#fff',
            dashArray: [1, 4]
        })
        this.routeLine.addTo(map)
        this.map = map

        this.routeHexes = [] // hexes representing route
        this.routeLats = []  // lad-lngs for route
        this.achievableCells = [] // hexes representing achievable area

        this.defaultStyle = {
            fill: false,
            color: "#fff",
            opacity: 0.2
        }
        this.startHex = {} // hex for start drag operation
        this.lastHex = {} // most recent cell travelled through
        this.historyLine = L.polyline([], {
            color: '#0f0'            
        })
        this.historyLine.addTo(map)
    }
    /** listen to drag events on the supplied marker */
    listenTo(marker) {
        // we need to capture 'this' in this context, not in callback function
        const core = this
        marker.on('drag', function (e) {
            const cursorLoc = e.latlng

            const rangeStyle = {
                fill: true,
                color: "#ccc",
                opacity: 1.0
            }
            const routeStyle = {
                fill: true,
                color: "#249",
                opacity: 0.2
            }

            // does route have contents?
            if (core.achievableCells.length == 0) {
                // no, we must be starting a new line

                // is this a mobile element
                if(marker.mobile)
                {
                    core.routeLine.setLatLngs([cursorLoc, cursorLoc])
                }

                core.startHex = grid.cellFor(cursorLoc)

                // limit distance of travel
                if (marker.stepRemaining) {
                    core.achievableCells = grid.hexesInRange(core.startHex, marker.stepRemaining)
                } else {
                    // nope, allow travel to anywhere
                    core.achievableCells = grid.cells
                }

                // set the route-line color
                var hisColor
                if (marker.force == "Red") {
                    hisColor = "#f00"
                } else if (marker.force == "Blue") {
                    hisColor = "#00f"
                }
                core.routeLine.setStyle({
                    color: hisColor
                })
                core.historyLine.setStyle({
                    color: hisColor
                })

                //
                var restrictedTerrain
                if (marker.travelMode == "Land") {
                    restrictedTerrain = land_cells
                } else if (marker.travelMode == "Sea") {
                    restrictedTerrain = sea_cells
                } else if (marker.travelMode = "Air") {
                    // just allow all cells
                    restrictedTerrain = grid.cells
                }

                if (restrictedTerrain) {
                    core.achievableCells = core.achievableCells.filter(cell => restrictedTerrain.includes(cell.name))
                }

                // apply styling to the achievable cells
                core.achievableCells.forEach(cell => cell.polygon.setStyle(rangeStyle))

                // is this an achievable cell?
                const curCell = grid.cellFor(cursorLoc)
                if(core.achievableCells.includes(curCell))
                {
                    // ok, remember it
                    core.lastHex = curCell
                }

                // and the track history
                if(marker.history)
                {
                    // ok, draw the history line
                    const historyLocs = []
                    marker.history.forEach(function(cell_name){
                        const cell = core.grid.hexNamed(cell_name)
                        historyLocs.push(cell.centrePos)
                    })

                    core.historyLine.setLatLngs(historyLocs)
                }

            } else {
                // retrieve the start point of the line

                // are we plotting a line?
                if(core.routeLine.length > 0)
                {
                    core.start = core.routeLine.getLatLngs()[0]
                    core.routeLine.setLatLngs([core.startHex.centrePos, cursorLoc])
                }

                // are we in a safe cell
                const curCell = grid.cellFor(cursorLoc)
                
                // is this an achievable cell?
                if(core.achievableCells.includes(curCell))
                {
                    // ok, remember it
                    core.lastHex =curCell
                }

                // clear the old cells
                core.routeHexes.forEach(function (cell) {
                    if (core.achievableCells.includes(cell)) {
                        cell.polygon.setStyle(rangeStyle)
                    } else {
                        cell.polygon.setStyle(defaultStyle)
                    }
                })

                // get the route
                var newRoute = grid.hexesBetween(core.startHex, core.lastHex )

                // if we have a restricted possible region,
                // trim to it
                if (core.achievableCells) {
                    newRoute = newRoute.filter(cell => core.achievableCells.includes(cell))
                }

                // and clear the new cells
                core.routeLats = []
                core.routeHexes = newRoute
                if(marker.mobile)
                {
                    core.routeHexes.forEach(function (cell) {
                        cell.polygon.setStyle(routeStyle);
                        core.routeLats.push(cell.centrePos)
                    })
                }
                else
                {
                    // insert the current location twice,
                    // to give us a point marker
                    core.routeLats.push(core.lastHex.centrePos)
                    core.routeLats.push(core.lastHex.centrePos)
                }

                core.routeLine.setLatLngs(core.routeLats)
            }
        })
        marker.on('dragend', function (e) {
            // ooh, see if it had restricted travel
            if (marker.stepLimit && core.routeHexes.length > 0) {
                // consume some of it

                // calculate distance
                const start = core.routeHexes[0]
                const end = core.routeHexes[core.routeHexes.length - 1]
                const distance = start.distance(end)

                marker.stepRemaining -= distance

                // cheat. if we've consumed distance, give it 
                // another allowance
                if (marker.stepRemaining == 0) {
                    marker.stepRemaining = marker.stepLimit
                }

                // add these new cells as history
                if(!marker.history)
                {
                    marker.history = []
                }
                core.routeHexes.forEach(cell => marker.history.push(cell.name))
            }

            // put the marker at the centre of a cell
            marker.setLatLng(core.lastHex.centrePos)

            core.routeLine.setLatLngs([])
            // clear the old cells
            core.routeHexes.forEach(cell => cell.polygon.setStyle(core.defaultStyle))
            core.routeHexes = []
            core.achievableCells.forEach(cell => cell.polygon.setStyle(core.defaultStyle))
            core.achievableCells = []
            core.routeLats = []
            core.historyLine.setLatLngs([])
        })
    }
}

/** create a marker for the supplied set of details */
function markerFor(spec)
{
    var res = L.marker(
        spec.loc, {
            draggable: spec.draggable
        }
    )
    res.bindTooltip(spec.name)
    res.travelMode = spec.travelMode
    res.force = spec.force
    res.stepRemaining = spec.stepLimit
    res.stepLimit = spec.stepLimit
    res.mobile = spec.mobile
    res.history = spec.history
    return res
}

var gridLayer = L.layerGroup()
gridLayer.addTo(map)
var mapLayer = L.layerGroup()
mapLayer.addLayer(overlay)
mapLayer.addTo(map)
var markerLayer = L.layerGroup()
// note: we don't show the marker layer by default - only when zoomed in
var platformLayer = L.layerGroup();
platformLayer.addTo(map);


var baseLayers = {
    "Image": mapLayer,
    "OpenStreetMap": tiledBackdrop
}
var overlays = {
    "Grid": gridLayer,
    "Tooltips": markerLayer,
    "Platforms": platformLayer
}
L.control.layers(baseLayers, overlays, {
    collapsed: false
}).addTo(map);

// only show the markers when zoomed in
map.on('zoomend', function () {
    const loaded = map.hasLayer(markerLayer)
    if (map.getZoom() < 11) {
        if (loaded) {
            map.removeLayer(markerLayer);
        }
    } else if (!loaded) {
        map.addLayer(markerLayer);
    }
});

var delta = 0.0416666
var origin = L.latLng(14.1166 + 3 * delta, 42.4166 - 2 * delta)
var grid = new GridImpl(origin, delta, 28, 24)

// add hexagons to this map
grid.addShapesTo(gridLayer)


// experiment with back-history
const trial_history = ["C05", "C04", "C03", "C02", "C01"]

// give us a couple of platforms
const platforms = []
platforms.push({loc:grid.hexNamed("C01").centrePos, draggable:true, name:"Frigate", travelMode:"Sea", force:"Blue", stepLimit:5, mobile:true, history:trial_history})
platforms.push({loc:grid.hexNamed("Q02").centrePos, draggable:true, name:"Coastal Battery", travelMode:"Land", force:"Red", mobile:false})
platforms.push({loc:grid.hexNamed("P03").centrePos, draggable:true, name:"Fisherman", travelMode:"Sea", force:"Red", stepLimit:3, mobile:true})
platforms.push({loc:grid.hexNamed("C17").centrePos, draggable:true, name:"MPA", travelMode:"Air", force:"Blue", mobile:true})

// and listen to the markers
const listener = new MovementListener(map, grid)

platforms.forEach(function(spec)
{
    marker = markerFor(spec)
    listener.listenTo(marker)
    platformLayer.addLayer(marker)
})

