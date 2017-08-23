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
    MAPBOX_LIGHT: `https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`,
}

require('leaflet/dist/leaflet.css')

Leaflet.Icon.Default.imagePath = '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/'

const LeafletMap = ({ mapProperties, showMenu, showSidebarRight, layers, showDrawControls, orderByLayerOrder, handleMapClick }) => {

    const availableBasemaps = ['gmaps-roads', 'gmaps-terrain', 'gmaps-satellite', 'OSM', 'Mapbox Light']



    if (mapProperties && mapProperties.currentMap) {

        let basemapIndex
        let basemapFormElements = document.querySelectorAll('.leaflet-control-layers-selector')
        for (var i=0, l=availableBasemaps.length; i<l; i++) {
            if (mapProperties.currentMap.name === availableBasemaps[i] ) {
                basemapIndex = i
            }
        }
        // trigger desired basemap
        basemapFormElements[basemapIndex].click()

        // trigger background layer (last checkbox) twice to put it on the top
        basemapFormElements[basemapFormElements.length-1].click()
        basemapFormElements[basemapFormElements.length-1].click()
    }





    // basemap
    const currentBaseMap = mapProperties ? mapProperties.currentMap.url : BASEMAP_URL.OPENSTREETMAP

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

    let MEU_BASE_MAP_TEMPORARIO = 'gmaps'

    return (
        <div className={leafletMapClassName}>
            <Map center={position} zoom={zoom} zoomControl={false} onClick={myHandleMapClick}>

                {/*base map*/}
                {
                    MEU_BASE_MAP_TEMPORARIO === 'mapbox' ?
                        <TileLayer url={BASEMAP_URL.MAPBOX_LIGHT} />
                    : ''
                }
                {
                    MEU_BASE_MAP_TEMPORARIO === 'osm' ?
                        <TileLayer url={BASEMAP_URL.OPENSTREETMAP} />
                    : ''
                }
                {/*<LayersControl position='bottomleft'>
                    <BaseLayer checked={true} name='Google Maps Roads'>
                        <GoogleLayer googlekey={key}  maptype={road}/>
                    </BaseLayer>
                </LayersControl>*/}

                {/*state highlight layer
                <WMSTileLayer
                    url={ENDPOINT}
                    layers={"plataforma:retangulo"}
                    styles={"plataforma:retangulo"}
                    format={IMAGE_FORMAT}
                    transparent={true}
                />*/}

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
                        <GoogleLayer googlekey={key}  maptype={road}/>
                    </BaseLayer>
                    <BaseLayer checked={false} name='Google Maps Terrain'>
                        <GoogleLayer googlekey={key}  maptype={terrain} />
                    </BaseLayer>
                    <BaseLayer checked={false} name='Google Maps Satellite'>
                        <GoogleLayer googlekey={key}  maptype={satellite} />
                    </BaseLayer>
                    <BaseLayer checked={false} name='OpenStreetMap'>
                        <TileLayer url={BASEMAP_URL.OPENSTREETMAP} />
                    </BaseLayer>
                    <BaseLayer checked={true} name='OpenStreetMap Mapbox Light'>
                        <TileLayer url={BASEMAP_URL.MAPBOX_LIGHT} />
                    </BaseLayer>
                    <Overlay checked={true} name='fundo' className='bla'>
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
