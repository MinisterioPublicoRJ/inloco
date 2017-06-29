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
    * @param {function} callback function to call when data is fully loaded
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
}

export default GeoAPI
