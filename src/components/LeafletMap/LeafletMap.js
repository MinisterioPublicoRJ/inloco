import React from 'react'
import Leaflet from 'leaflet'
import { Map, WMSTileLayer, TileLayer, Marker, Popup, ZoomControl, ScaleControl, FeatureGroup, Circle } from 'react-leaflet'
import { EditControl } from "react-leaflet-draw"
import Proj4 from "proj4"

// Arlindo's token
const MAPBOX_TOKEN = 'pk.eyJ1IjoiYXJsaW5kbyIsImEiOiJjaWljZDgwemYwMGFydWJrc2FlNW05ZjczIn0.rOROEuNNxKWUIcj6Uh4Xzg'

const BASEMAP_URL = {
    OPENSTREETMAP: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    MAPBOX_LIGHT: `https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`,
}

require('leaflet/dist/leaflet.css')

Leaflet.Icon.Default.imagePath = '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/'

const LeafletMap = ({ mapProperties, showMenu, showSidebarRight, layers, showDrawControls, orderByLayerOrder, places, handleMapClick }) => {

    // basemap
    const currentBaseMap = BASEMAP_URL.MAPBOX_LIGHT

    // projections
    const firstProjection = 'GOOGLE';
    const secondProjection = "WGS84";

    // initial position and zoom
    const position = mapProperties ? [mapProperties.initialCoordinates.lat, mapProperties.initialCoordinates.lng] : [0,0]
    const zoom     = mapProperties ? mapProperties.initialCoordinates.zoom : 10
    var west = -4806863.32932588
    var east = -4805368.45924042
    var south = -2621278.72506865
    var north = -2622972.77776544

    var prj1 = Proj4(firstProjection, secondProjection, [east, south])
    var prj2 = Proj4(firstProjection, secondProjection, [west, north])

    console.log(places)
    console.log(prj1)
    console.log(prj2)
    const bounds   = [[prj1[1], prj2[0]] , [prj2[1], prj1[0]]]
    console.log(bounds)
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
    return (
        <div className={leafletMapClassName}>
            <Map bounds={[[0, 0], [0, 0]]} center={position} zoom={zoom} zoomControl={false} onClick={myHandleMapClick}>

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
                            CQL_FILTER = '1=1'

                        />
                    )
                })}

                {/*DEBUG*/}
                {/*<Marker position={position}>
                    <Popup>
                        <span>Hello world</span>
                    </Popup>
                </Marker>*/}

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
