import axios from 'axios'

const ScaAPI = {
    /**
    * Call sca api and log user on system
    * @param callback function to call when process is completed
    */
    logInUser(callback, username, password) {
        axios
            .post(`http://apps.mprj.mp.br/mpmapas/api/authentication?password=${password}&username=${username}`)
            .then((response) => {
                callback(response)
            })
            .catch((error) => {
                callback(error.response)
            })
    },
}

export default ScaAPI
