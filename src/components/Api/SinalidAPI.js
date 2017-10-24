import axios from 'axios'

const SinalidAPI = {
    /**
     * Gets a list of Missing People from Sinalid API
     * @param {function} callback Callback function to execute
     * @param {number} dpId Delegacia de Polícia ID
     */
    listMissingPeople(callback, dpId) {
        axios
            .get(`/sinalid/api/listadesaparecidos/${dpId}`)
            .then(response => callback(response))
            .catch(error => callback(error.response))
    }
}

export default SinalidAPI
