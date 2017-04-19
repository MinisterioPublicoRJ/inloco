import axios from 'axios';

export default class GeoAPI {
    static getContent() {
        axios.get('/geoserver/plataforma/wms?request=GetCapabilities')
        .then((response) => {
            console.log(response.data);
            console.log(response.status);
        })
        .catch((error) => {
            console.log(error);
        });
    }
}
