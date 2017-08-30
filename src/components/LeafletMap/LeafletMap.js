import React from 'react'
import Leaflet from 'leaflet'
import { EditControl } from "react-leaflet-draw"
import Proj4 from "proj4"
import { Map, WMSTileLayer, TileLayer, Marker, Popup, ZoomControl, ScaleControl, FeatureGroup, Circle, LayersControl } from 'react-leaflet'
import { GoogleLayer } from 'react-leaflet-google'
import StreetView from '../StreetView/StreetView.js'

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

const LeafletMap = ({
    mapProperties,
    showMenu,
    showSidebarRight,
    layers,
    showDrawControls,
    orderByLayerOrder,
    places,
    toolbarActive,
    streetViewCoordinates,
    handleMapClick,
    handleMapMove,
    onUpdateBasemapLoadingStatus,
}) => {

    const availableBasemaps = ['gmaps-roads', 'gmaps-terrain', 'gmaps-satellite', 'OSM', 'Mapbox Light']

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

    // projections
    const firstProjection = 'GOOGLE';
    const secondProjection = "WGS84";

    // initial position and zoom
    const position      = mapProperties ? [mapProperties.initialCoordinates.lat, mapProperties.initialCoordinates.lng] : [0,0]
    const zoom          = mapProperties ? mapProperties.initialCoordinates.zoom : 10
    var   placeToCenter = mapProperties && mapProperties.placeToCenter ? mapProperties.placeToCenter : undefined
    var   bounds        = placeToCenter ? placeToCenter.geom.split(',') : undefined
    var   opacity       = mapProperties && mapProperties.opacity !== undefined ? mapProperties.opacity : .5
    var   contour       = mapProperties && mapProperties.contour !== undefined ? mapProperties.contour : "borda"
    var   color         = "preto"
    const regionStyle   = "plataforma:busca_regiao_"+contour+"_"+color

    if (bounds) {
        var west = parseInt(bounds[0])
        var east = parseInt(bounds[2])
        var south = parseInt(bounds[3])
        var north = parseInt(bounds[1])

        var prj1 = Proj4(firstProjection, secondProjection, [east, south])
        var prj2 = Proj4(firstProjection, secondProjection, [west, north])
        bounds = [[prj1[1], prj2[0]] , [prj2[1], prj1[0]]]
    }

    var CQL_FILTER

    // This function gets the code to fill CQL filter
    const getCode = (place) => {
        var cd
        var operator = " = "
        if(contour === "opaco"){
            operator = " <> "
        }
        switch(place.tipo){
            case 'CRAAI':
                cd = "cod_craai" + operator + place.cd_craai;
                break;
            case 'MUNICIPIO':
                cd = "cod_mun"+ operator + place.cd_municipio;
                break;
            case 'BAIRRO':
                cd = "cod_bairro"+ operator + place.cd_bairro;
                break;
            case 'CI':
                cd = "cod_ci"+ operator + place.cd_ci;
                break;
            case 'PIP':
                cd = "cod_pip"+ operator + place.cd_pip;
                break;
            default:

            cd = undefined;
        }
        return cd
    }

    if(placeToCenter){
        CQL_FILTER = "tipo='"+placeToCenter.tipo+ "' and " + getCode(placeToCenter);
    }

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
        handleMapClick(e, layers, toolbarActive)
    }

    const myHandleMapMove = (e) => {
        handleMapMove(e)
    }

    const returnMapInnerComponents = () => {
        return (
            <div>
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
                            styles={"plataforma:retangulo_"+color}
                            format={IMAGE_FORMAT}
                            transparent={true}
                            opacity={opacity}
                            isBaseLayer={false}
                            visibility={true}
                            tiled={true}
                            buffer={0}
                        />
                    </Overlay>
                    {/*active layers*/}
                    {orderByLayerOrder(layers).map((layer, index) => {
                        return (
                            <Overlay checked={true} name={layer.layerName} key={index}>
                                <WMSTileLayer
                                    url={ENDPOINT}
                                    layers={layer.layerName}
                                    styles={layer.styles[layer.selectedLayerStyleId].name}
                                    format={IMAGE_FORMAT}
                                    transparent={true}
                                />
                            </Overlay>
                        )
                    })}
                    {/*region highlight layer*/}
                    {
                        placeToCenter
                        ?
                        <Overlay checked={true} name="region_highlight">
                            <WMSTileLayer
                                url={ENDPOINT}
                                layers={"plataforma:busca_regiao"}
                                styles={regionStyle}
                                format={IMAGE_FORMAT}
                                transparent={true}
                                exibeLegenda={false}
                                opacity={opacity}
                                isBaseLayer={false}
                                visibility={true}
                                tiled={true}
                                buffer={0}
                                CQL_FILTER = {CQL_FILTER ? CQL_FILTER : "1=1"}
                            />
                        </Overlay>
                        :
                        null
                    }
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
            </div>
        )
    }

    const returnMapWithCenter = () => {
        return (
            <Map center={position} zoom={zoom} zoomControl={false} onClick={myHandleMapClick} onMoveend={myHandleMapMove}>
                {returnMapInnerComponents()}
            </Map>
        )
    }

    const returnMapWithBounds = () =>{
        return (
            <Map bounds={bounds} zoomControl={false} onClick={myHandleMapClick} onMoveend={myHandleMapMove}>
                {returnMapInnerComponents()}
            </Map>
        )
    }
    return (
        <div className={leafletMapClassName}>
            {
                streetViewCoordinates ? <StreetView streetViewCoordinates={streetViewCoordinates}/> : ''
            }
            {
                bounds
                ? returnMapWithBounds()
                : returnMapWithCenter()
            }
        </div>
    )
}

export default LeafletMap
