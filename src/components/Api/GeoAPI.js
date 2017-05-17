import axios from 'axios';

const WORKSPACE = 'plataforma';
const ENDPOINT  = `/geoserver/${WORKSPACE}/wms`;

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
                });
            })
            .catch((error) => {
                return console.log(error);
            })
        ;
    },
}

export default GeoAPI;
