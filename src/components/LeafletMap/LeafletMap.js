import React from 'react'
import Leaflet from 'leaflet'
import { Map, WMSTileLayer, TileLayer, Marker, Popup, ZoomControl, ScaleControl } from 'react-leaflet'

require('leaflet/dist/leaflet.css')

Leaflet.Icon.Default.imagePath = '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/'

const LeafletMap = ({ mapProperties, showMenu, showSidebarRight, layers, orderByLayerOrder }) => {

    // initial position and zoom
    const position = mapProperties ? [mapProperties.initialCoordinates.lat, mapProperties.initialCoordinates.lng] : [0,0]
    const zoom     = mapProperties ? mapProperties.initialCoordinates.zoom : 10

    // Geoserver config
    const ENDPOINT = __API__
    const IMAGE_FORMAT = 'image/png'

    // DEBUG
    showSidebarRight = true

    // map class
    let leafletMapClassName = 'module-leafletMap'
    if (showMenu) {
        leafletMapClassName += ' sidebar-left-opened'
    }
    if (showSidebarRight) {
        leafletMapClassName += ' sidebar-right-opened'
    }

    return (
        <div className={leafletMapClassName}>
            <Map center={position} zoom={zoom} zoomControl={false}>

                {/*base layer OSM*/}
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />

                {/*state highlight layer*/}
                <WMSTileLayer
                    url={ENDPOINT}
                    layers={"plataforma:retangulo"}
                    styles={"plataforma:retangulo"}
                    format={IMAGE_FORMAT}
                    transparent={true}
                    opacity={0.7}
                />

                {/*active layers*/}
                {orderByLayerOrder(layers).map((layer, index) => {
                    return (
                        <WMSTileLayer
                            url={ENDPOINT}
                            layers={layer.layerName}
                            styles={layer.styles[layer.selectedLayerStyleId].name}
                            format={IMAGE_FORMAT}
                            key={index}
                            transparent={true}
                        />
                    )
                })}

                {/*DEBUG*/}
                <Marker position={position}>
                    <Popup>
                        <span>Hello world</span>
                    </Popup>
                </Marker>

                {/*Other controls*/}
                <ScaleControl position="bottomleft"/>
                <ZoomControl position="bottomright"/>
            </Map>
        </div>
    )
}

export default LeafletMap
