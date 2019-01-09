import axios from 'axios'

const WORKSPACE = __WORKSPACE__
const ENDPOINT  = __API__

const GeoAPI = {

    workspace: WORKSPACE,
    restricted: false,
    layers: [],
    menu: [],

    createUrl({layer, clickData, featureCount}) {
        if (layer.styles && layer.selectedLayerStyleId) {
            var styleName = layer.styles[layer.selectedLayerStyleId].name.replace('plataforma:', '')
        } else {
            var styleName = ""
        }
        let CQLFilter = '1%3D1%3B1%3D1'
        if (layer.filterKey && layer.filterValue) {
            CQLFilter = `strToLowerCase(${layer.filterKey}) LIKE '%25${layer.filterValue}%25'`
        }
        return `?LAYERS=${layer.name}&QUERY_LAYERS=${layer.name}&STYLES=${styleName},&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&BBOX=${clickData.BBOX}&FEATURE_COUNT=${featureCount}&HEIGHT=${clickData.HEIGHT}&WIDTH=${clickData.WIDTH}&FORMAT=image%2Fpng&INFO_FORMAT=application%2Fjson&SRS=EPSG%3A4326&X=${clickData.X}&Y=${clickData.Y}&CQL_FILTER=${CQLFilter}`
    },

    /**
    * Call GeoServer and get XML data for places
    * @param callback function to call when data is fully loaded
    */
    getContent(callback) {
        axios
            .get(ENDPOINT + '?request=GetCapabilities')
            .then(response => {
                callback({
                    xmlData: response
                })
            })
            .catch(error => {
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
    * Call GeoServer and get layer feature data
    * @param callback function to call when data is fully loaded
    */
    getLayersData(callback, urls) {
        axios.all(urls.map(l => axios.get(ENDPOINT+l)))
        .then(axios.spread(function (...res) {
            // all requests are now complete
            let responses = res.map( r => r.data)
            callback(responses)
        }))
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
            {
                'name': 'Escolas',
                'url': 'educ_escolas_busca_pol_4326',
            },
            {
                'name': 'População',
                'url': 'se_setores_2010_busca_pol_4326',
            },
            {
                'name': 'Bombeiros',
                'url': 'bombeiro_busca_pol_4326',
            },
            {
                'name': 'Guarda Municipal',
                'url': 'guarda_municipal_busca_pol_4326',
            },
            {
                'name': 'Batalhões Policiais',
                'url': 'policia_batalhao_sede_busca_pol_4326',
            },
            {
                'name': 'Delegacias Policiais',
                'url': 'policia_dps_busca_pol_4326',
            },
            {
                'name': 'Hospitais',
                'url': 'saude_estabelecimentos_cnes_busca_pol_4326',
            },
            {
                'name': 'Estações de BRT',
                'url': 'trans_brt_estacoes_busca_pol_4326',
            },
            {
                'name': 'Estações de Metrô',
                'url': 'trans_metro_estacoes_busca_pol_4326',
            },
            {
                'name': 'Estações de Ônibus',
                'url': 'trans_onibus_por_embarque_busca_pol_4326',
            },
            {
                'name': 'Estações de Trem',
                'url': 'trans_trem_estacoes_busca_pol_4326',
            },
            {
                'name': 'Estações de VLT',
                'url': 'trans_vlt_estacoes_busca_pol_4326',
            },
        ]
        coordinates = coordinates[0]
        coordinates = coordinates.map((c) => {
            return c.lng + ' ' + c.lat
        })
        coordinates.push(coordinates[0])

        coordinates = coordinates.join(',')

        const urls = layers.map( l =>
            ENDPOINT+`?service=WFS&version=1.0.0&request=GetFeature&typeName=${PREFIX+l.url}&outputFormat=application%2Fjson&cql_filter=INTERSECTS(geom,  POLYGON((${coordinates})))`
        )
        axios.all(urls.map(l => axios.get(l)))
        .then(axios.spread(function (...res) {
            // all requests are now complete
            let responses = res.map( r => {
                let copy = r.data.features.slice()
                let subs
                let category
                if (copy.length > 0){
                    subs = copy[0].id.split('.')[0]
                    let result = layers.filter(l => l.url === subs)
                    category = result[0].name
                }
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
    },

    /**
     *
     * @param {Object} layer The layer to get params from
     * @param {String} layer.layerName The layerName param on layer, to write URL. Typically it is 'plataforma:xxxx'
     * @param {Function} callback function to call when data is fully loaded
     */
    getLayerParams(layer, callback) {
        axios
            .get(ENDPOINT.replace('wms', 'wfs') + `?request=describeFeatureType&typename=${layer.layerName}`)
            .then(response => {
                callback(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    },

    getLayerFilteredData(layerName, parameterKey, parameterValue, callback) {
        axios
            .get(ENDPOINT.replace('wms', 'wfs') + `?service=wfs&version=2.0.0&request=GetFeature&typename=plataforma:${layerName}&outputformat=application/json&CQL_FILTER=strToLowerCase(${parameterKey})%20LIKE%20%27%25${parameterValue}%25%27&count=99999&sortBy=${parameterKey}`)
            .then(response => {
                callback(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    },
}

export default GeoAPI
