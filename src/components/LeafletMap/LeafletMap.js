import React from 'react'
import Leaflet from 'leaflet'
import { Map, WMSTileLayer, TileLayer, Marker, Popup, ZoomControl, ScaleControl, FeatureGroup, Circle } from 'react-leaflet'
import { EditControl } from "react-leaflet-draw"

// Arlindo's token
const MAPBOX_TOKEN = 'pk.eyJ1IjoiYXJsaW5kbyIsImEiOiJjaWljZDgwemYwMGFydWJrc2FlNW05ZjczIn0.rOROEuNNxKWUIcj6Uh4Xzg'

const BASEMAP_URL = {
    OPENSTREETMAP: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    MAPBOX_LIGHT: ` https://api.mapbox.com/styles/v1/arlindo/cj6mameic8ues2spffqvh7hx1/tiles/256/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`,
}

require('leaflet/dist/leaflet.css')

Leaflet.Icon.Default.imagePath = '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/'

const LeafletMap = ({ mapProperties, showMenu, showSidebarRight, layers, showDrawControls, orderByLayerOrder, handleMapClick, handleMapMove }) => {

    // basemap
    const currentBaseMap = BASEMAP_URL.MAPBOX_LIGHT

    // initial position and zoom
    const position = mapProperties ? [mapProperties.initialCoordinates.lat, mapProperties.initialCoordinates.lng] : [0,0]
    const zoom     = mapProperties ? mapProperties.initialCoordinates.zoom : 10

    // Geoserver config
    const ENDPOINT = __API__
    const IMAGE_FORMAT = 'image/png'

    // map class
    let leafletMapClassName = 'module-leafletMap'
    if (showMenu) {
        leafletMapClassName += ' sidebar-left-opened'
    }
    if (showSidebarRight) {
        leafletMapClassName += ' sidebar-right-opened'
    }
    const myHandleMapClick = (e) => {
        handleMapClick(e, layers)
    }
    const myHandleMapMove = (e) => {
        handleMapMove(e)
    }
    return (
        <div className={leafletMapClassName}>
            <Map center={position} zoom={zoom} zoomControl={false} onClick={myHandleMapClick} onMoveend={myHandleMapMove}>

                {/*base layer OSM*/}
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url={currentBaseMap}
                />

                {/*state highlight layer*/}
                <WMSTileLayer
                    url={ENDPOINT}
                    layers={"plataforma:retangulo"}
                    styles={"plataforma:retangulo"}
                    format={IMAGE_FORMAT}
                    transparent={true}
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

                {/*Other controls*/}
                <ScaleControl position="bottomleft"/>
                <ZoomControl position="bottomright"/>
                <FeatureGroup>
                    {!showDrawControls ?
                        <EditControl
                            position='topright'
                            draw={{
                                rectangle: false,
                                polygon: false,
                                polyline: false,
                                circle: false,
                                marker: false,
                            }}
                            edit={{
                                remove: false,
                                edit: false,
                            }}
                        />
                        :
                        <EditControl
                            position='topright'
                        />
                    }
                </FeatureGroup>
            </Map>
        </div>
    )
}

export default LeafletMap
