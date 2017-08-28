import React from 'react'
import Leaflet from 'leaflet'
import { Map, WMSTileLayer, TileLayer, Marker, Popup, ZoomControl, ScaleControl, FeatureGroup, Circle, LayersControl } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'
import { GoogleLayer } from 'react-leaflet-google'

const { BaseLayer, Overlay } = LayersControl
const key = 'AIzaSyBoZlEM3ASki3UzBfSHpQWW6dM0hHD0no0'
const terrain = 'TERRAIN'
const road = 'ROADMAP'
const satellite = 'SATELLITE'

// Arlindo's token
const MAPBOX_TOKEN = 'pk.eyJ1IjoiYXJsaW5kbyIsImEiOiJjaWljZDgwemYwMGFydWJrc2FlNW05ZjczIn0.rOROEuNNxKWUIcj6Uh4Xzg'

const BASEMAP_URL = {
    OPENSTREETMAP: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    MAPBOX_LIGHT: ` https://api.mapbox.com/styles/v1/arlindo/cj6mameic8ues2spffqvh7hx1/tiles/256/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`,
}

require('leaflet/dist/leaflet.css')

Leaflet.Icon.Default.imagePath = '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/'

const LeafletMap = ({ mapProperties, showMenu, showSidebarRight, layers, showDrawControls, orderByLayerOrder, handleMapClick, handleMapMove, onUpdateBasemapLoadingStatus }) => {

    const availableBasemaps = ['gmaps-roads', 'gmaps-terrain', 'gmaps-satellite', 'OSM', 'Mapbox Light']

    // put all active layers z-index to an arbitrary big value
    // this has to be done async because DOM element for new layer is created on return function
    setTimeout(() => {
        let activeLayers = document.querySelectorAll('.leaflet-layer')
        let arr = []
        arr.map.call(activeLayers, obj => obj.style.zIndex = 100)
    }, 50)

    // if basemap has changed, i should update it *once*
    if (mapProperties && mapProperties.currentMap && !mapProperties.currentMap.loadDone) {
        // get (hidden) layers control box
        let basemapFormElements = document.querySelectorAll('.leaflet-control-layers-selector')
        let basemapIndex
        for (var i=0, l=availableBasemaps.length; i<l; i++) {
            // get the index of the basemap i want to change to
            if (mapProperties.currentMap.name === availableBasemaps[i] ) {
                basemapIndex = i
            }
        }

        // trigger desired basemap select form
        basemapFormElements[basemapIndex].click()

        // trigger background layer (last checkbox) twice to switch if off and on again to put it on the top
        basemapFormElements[basemapFormElements.length-1].click()
        basemapFormElements[basemapFormElements.length-1].click()

        // dispatch action to say it is done
        onUpdateBasemapLoadingStatus()
    }

    // basemap
    const currentBaseMap = mapProperties ? mapProperties.currentMap.url : BASEMAP_URL.MAPBOX_LIGHT

    // initial position and zoom
    const position = mapProperties ? [mapProperties.initialCoordinates.lat, mapProperties.initialCoordinates.lng] : [0,0]
    const zoom     = mapProperties ? mapProperties.initialCoordinates.zoom : 10

    // Geoserver config
    const ENDPOINT = __API__
    const IMAGE_FORMAT = 'image/png'

    // map class, to reposition arrow and map credit on the bottom
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

                {/*active layers*/}
                {orderByLayerOrder(layers).map((layer, index) => {
                    return (
                        <WMSTileLayer
                            url={ENDPOINT}
                            layers={layer.layerName}
                            styles={layer.styles[layer.selectedLayerStyleId].name}
                            format={IMAGE_FORMAT}
                            transparent={true}
                            key={index}
                        />
                    )
                })}

                <LayersControl position='bottomleft'>
                    <BaseLayer checked={false} name='Google Maps Roads'>
                        <GoogleLayer googlekey={key} maptype={road} attribution='Google Maps Roads' />
                    </BaseLayer>
                    <BaseLayer checked={false} name='Google Maps Terrain'>
                        <GoogleLayer googlekey={key} maptype={terrain} attribution='Google Maps Terrain' />
                    </BaseLayer>
                    <BaseLayer checked={false} name='Google Maps Satellite'>
                        <GoogleLayer googlekey={key} maptype={satellite} attribution='Google Maps Satellite' />
                    </BaseLayer>
                    <BaseLayer checked={false} name='OpenStreetMap'>
                        <TileLayer url={BASEMAP_URL.OPENSTREETMAP} attribution='OpenStreetMap' />
                    </BaseLayer>
                    <BaseLayer checked={true} name='OpenStreetMap Mapbox Light'>
                        <TileLayer url={BASEMAP_URL.MAPBOX_LIGHT} attribution='OpenStreetMap with Mapbox Light theme' />
                    </BaseLayer>
                    <Overlay checked={true} name='fundo'>
                        {/*state highlight layer*/}
                        <WMSTileLayer
                            url={ENDPOINT}
                            layers={"plataforma:retangulo"}
                            styles={"plataforma:retangulo"}
                            format={IMAGE_FORMAT}
                            transparent={true}
                        />
                    </Overlay>
                </LayersControl>

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
