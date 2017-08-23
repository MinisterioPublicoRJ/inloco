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
    const position      = mapProperties ? [mapProperties.initialCoordinates.lat, mapProperties.initialCoordinates.lng] : [0,0]
    const zoom          = mapProperties ? mapProperties.initialCoordinates.zoom : 10
    var   placeToCenter = mapProperties ? mapProperties.placeToCenter ? mapProperties.placeToCenter : undefined : undefined
    var   bounds        = placeToCenter ? placeToCenter.geom.split(',') : undefined
    var   opacity       = mapProperties ? mapProperties.opacity !== undefined ? mapProperties.opacity : 1 : 1
    var   contour       = mapProperties ? mapProperties.contour !== undefined ? mapProperties.contour : "borda" : "borda"
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

    const returnMapInnerComponents = () => {
        return (
            <div>
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
                    opacity={opacity}
                />

                {/*region highlight layer*/}
                {
                    placeToCenter
                    ?
                    <WMSTileLayer
                        url={ENDPOINT}
                        layers={"plataforma:busca_regiao"}
                        styles={regionStyle}
                        format={IMAGE_FORMAT}
                        transparent={true}
                        exibeLegenda={false}
                        opacity={opacity}
                        CQL_FILTER = {CQL_FILTER ? CQL_FILTER : "1=1"}
                    />
                    :
                    null
                }


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
            </div>
        )
    }

    const returnMapWithCenter = () => {
        return (
            <Map center={position} zoom={zoom} zoomControl={false} onClick={myHandleMapClick}>
                {returnMapInnerComponents()}
            </Map>
        )
    }

    const returnMapWithBounds = () =>{
        return (
            <Map bounds={bounds} zoomControl={false} onClick={myHandleMapClick}>
                {returnMapInnerComponents()}
            </Map>
        )
    }
    return (
        <div className={leafletMapClassName}>
            {
                bounds
                ? returnMapWithBounds()
                : returnMapWithCenter()
            }
        </div>
    )
}

export default LeafletMap
