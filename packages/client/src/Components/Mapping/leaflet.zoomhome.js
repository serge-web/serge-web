/*
 * Leaflet zoom control with a home button for resetting the view.
 *
 * Distributed under the CC-BY-SA-3.0 license. See the file "LICENSE"
 * for details.
 *
 * Based on code by toms (https://gis.stackexchange.com/a/127383/48264).
 */
import L from 'leaflet'

(function () {
  'use strict'

  L.Control.ZoomHome = L.Control.Zoom.extend({
    options: {
      position: 'topleft',
      zoomInText: '+',
      zoomInTitle: 'Zoom in',
      zoomOutText: '-',
      zoomOutTitle: 'Zoom out',
      zoomHomeIcon: 'home',
      zoomHomeTitle: 'Home',
      homeCoordinates: null,
      homeZoom: null,
      homeBounds: null
    },

    onAdd: function (map) {
      const controlName = 'leaflet-control-zoomhome'
      const container = L.DomUtil.create('div', controlName + ' leaflet-bar')
      const options = this.options

      if (options.homeCoordinates === null) {
        options.homeCoordinates = map.getCenter()
      }
      if (options.homeZoom === null) {
        options.homeZoom = map.getZoom()
      }

      this._zoomInButton = this._createButton(options.zoomInText, options.zoomInTitle,
        controlName + '-in', container, this._zoomIn.bind(this))
      var zoomHomeText = '<i class="fa fa-' + options.zoomHomeIcon + '" style="line-height:1.65;"></i>'
      this._zoomHomeButton = this._createButton(zoomHomeText, options.zoomHomeTitle,
        controlName + '-home', container, this._zoomHome.bind(this))
      this._zoomOutButton = this._createButton(options.zoomOutText, options.zoomOutTitle,
        controlName + '-out', container, this._zoomOut.bind(this))

      this._updateDisabled()
      map.on('zoomend zoomlevelschange', this._updateDisabled, this)

      return container
    },

    setHomeBounds: function (bounds) {
      if (bounds === undefined) {
        bounds = this._map.getBounds()
      } else {
        if (typeof bounds.getCenter !== 'function') {
          bounds = L.latLngBounds(bounds)
        }
      }

      // Note: the original version stored the zoom level in this method
      // But, after a browser resize the zoom level is wrong. So, we
      // store the bounds object, and
      // do the processing in the _zoomHome method instead.
      // this.options.homeZoom = this._map.getBoundsZoom(bounds);
      if (bounds) {
        this.options.homeBounds = bounds
      }
      this.options.homeCoordinates = bounds.getCenter()
    },

    setHomeCoordinates: function (coordinates) {
      if (coordinates === undefined) {
        coordinates = this._map.getCenter()
      }
      this.options.homeCoordinates = coordinates
    },

    setHomeZoom: function (zoom) {
      if (zoom === undefined) {
        zoom = this._map.getZoom()
      }
      this.options.homeZoom = zoom
    },

    getHomeZoom: function () {
      return this.options.homeZoom
    },

    getHomeCoordinates: function () {
      return this.options.homeCoordinates
    },

    _zoomHome: function (e) {
      // jshint unused:false
      if (this.options.homeBounds) {
        this.options.homeZoom = this._map.getBoundsZoom(this.options.homeBounds)
      }
      this._map.setView(this.options.homeCoordinates, this.options.homeZoom)
    }
  })

  L.Control.zoomHome = function (options) {
    return new L.Control.ZoomHome(options)
  }
}())
