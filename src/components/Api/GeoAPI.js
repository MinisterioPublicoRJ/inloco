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

    /**
    * Call GeoServer and get XML data
    * @param callback function to call when data is fully loaded
    */
    getContent(callback) {
        axios
            .get(ENDPOINT + '?request=GetCapabilities')
            .then((response) => {
                //GeoAPI.parseXMLResponse(response, callback);
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
    }
}

export default GeoAPI
