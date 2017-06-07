import React from 'react'
import Leaflet from 'leaflet'
import { Map, TileLayer, Marker, Popup, ZoomControl, ScaleControl } from 'react-leaflet'

require('leaflet/dist/leaflet.css')

Leaflet.Icon.Default.imagePath = '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/'

const LeafletMap = ({mapProperties, showMenu}) => {
    // initial position and zoom
    const position = mapProperties ? [mapProperties.initialCoordinates.lat, mapProperties.initialCoordinates.lng] : [0,0]
    const zoom     = mapProperties ? mapProperties.initialCoordinates.zoom : 10

    // map class
    let leafletMapClassName = 'module-leafletMap'
    if (showMenu) {
        leafletMapClassName += ' sidebar-left-opened'
    }

    return (
        <div className={leafletMapClassName}>
            <Map center={position} zoom={zoom} zoomControl={false}>
                <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
                <Marker position={position}>
                    <Popup>
                        <span>Hello world</span>
                    </Popup>
                </Marker>
                <ScaleControl position="bottomleft" />
                <ZoomControl position="bottomright" />
            </Map>
        </div>
    )
}

export default LeafletMap
