import axios from 'axios'

const WORKSPACE = __WORKSPACE__
const ENDPOINT  = __API__

const GeoAPI = {

    /**
    * Parse XML from GeoServer
    */

    workspace: WORKSPACE,
    restricted: false,
    layers: [],
    menu: [],

    createUrl({layerName, clickData, featureCount}) {
        return `?LAYERS=${layerName}&QUERY_LAYERS=${layerName}&STYLES=,&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&BBOX=${clickData.BBOX}&FEATURE_COUNT=${featureCount}&HEIGHT=${clickData.HEIGHT}&WIDTH=${clickData.WIDTH}&FORMAT=image%2Fpng&INFO_FORMAT=application%2Fjson&SRS=EPSG%3A4326&X=${clickData.X}&Y=${clickData.Y}&CQL_FILTER=1%3D1%3B1%3D1`
    },

    /**
    * Call GeoServer and get XML data
    * @param callback function to call when data is fully loaded
    */
    getContent(callback) {
        axios
            .get(ENDPOINT + '?request=GetCapabilities')
            .then((response) => {
                callback({
                    xmlData: response
                })
            })
            .catch((error) => {
                return console.log(error)
            })
    },

    /**
    * Call GeoServer and get XML data for places
    * @param callback function to call when data is fully loaded
    */
    getContent(callback) {
        axios
            .get(ENDPOINT + '?request=GetCapabilities')
            .then((response) => {
                callback({
                    xmlData: response
                })
            })
            .catch((error) => {
                return console.log(error)
            })
    },

    /**
    * Call GeoServer and get layer feature data
    * @param callback function to call when data is fully loaded
    */
    getLayerData(callback, url) {
        axios
            .get(ENDPOINT + url)
            .then((response) => {
                callback(response.data)
            })
            .catch((error) => {
                return console.log(error)
            })
    },

     /**
    * Call GeoServer and get polygon data
    * @param callback function to call when data is fully loaded
    */
    getPolygonData(callback, coordinates, activeLayers) {
        var layer ='plataforma:se_setores_2010'
        console.log()
        var coordinates = coordinates.join(',')
        const URL = `?service=WFS&version=1.0.0&request=GetFeature&typeName=${layer}&outputFormat=application%2Fjson&cql_filter=INTERSECTS(geom,  POLYGON(( '+ pontos +')))`
        console.log(coordinates)
        console.log(activeLayers)
        axios
            .get(ENDPOINT + URL)
            .then((response) => {
                callback(response.data)
            })
            .catch((error) => {
                return console.log(error)
            })
    }
}

export default GeoAPI
