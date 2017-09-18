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
        const PREFIX = 'plataforma:'
        const layers = [
            'educ_escolas_busca_pol_4326',
            'se_setores_2010_busca_pol_4326',
            'bombeiro_busca_pol_4326',
            'guarda_municipal_busca_pol_4326',
            'policia_batalhao_sede_busca_pol_4326',
            'policia_dps_busca_pol_4326',
            'saude_estabelecimentos_cnes_busca_pol_4326',
            'trans_brt_estacoes_busca_pol_4326',
            'trans_metro_estacoes_busca_pol_4326',
            'trans_onibus_por_embarque_busca_pol_4326',
            'trans_trem_estacoes_busca_pol_4326',
            'trans_vlt_estacoes_busca_pol_4326',
        ]
        let layer2 ='plataforma:'
        coordinates = coordinates[0]
        coordinates = coordinates.map((c) => {
            return c.lng + ' ' + c.lat
        })
        coordinates.push(coordinates[0])

        coordinates = coordinates.join(',')
        //http://localhost:3000/geoserver/plataforma/wms?service=WFS&version=1.0.0&request=GetFeature&typeName=plataforma%3Aeduc_escolas&outputFormat=application%2Fjson&SRS=EPSG%3A4326&cql_filter=INTERSECTS(geom,%20POLYGON((-22.105998799750566%20-43.2696533203125,-22.344995208437894%20-42.94006347656251,-21.937950226141925%20-41.98974609375,-22.105998799750566%20-43.2696533203125)))

        const urls = layers.map( l =>
            ENDPOINT+`?service=WFS&version=1.0.0&request=GetFeature&typeName=${PREFIX+l}&outputFormat=application%2Fjson&cql_filter=INTERSECTS(geom,  POLYGON((${coordinates})))`
        )
        axios.all(urls.map(l => axios.get(l)))
        .then(axios.spread(function (...res) {
            // all requests are now complete
            console.log(res);
            let responses = res.map( r => {
                let copy = r.data.features.slice()
                // TODO: get category slicing id from first element
                let category = copy[0].id.split('_').slice(0,1).join('_')
                return r.data.features.map( f => {
                    return {
                        category,
                        "geometry": f.geometry,
                        "id": f.id,
                        "properties": f.properties,
                    }
                })
            })
            callback(responses)
        }))
        .catch((error) => {
            return console.log(error)
        })
    }
}

export default GeoAPI
