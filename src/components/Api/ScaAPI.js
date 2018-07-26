import axios from 'axios'

const ScaAPI = {
    /**
    * Call sca api and log user on system
    * @param callback function to call when process is completed
    */
    logInUser(callback, username, password) {
        axios
            .post(`/mpmapas/api/authentication?password=${password}&username=${username}`)
            .then((response) => {
                callback(response)
            })
            .catch((error) => {
                callback(error.response)
            })
    },
    logOutUser(callback) {
        axios
            .get(`/mpmapas/api/logout`)
            .then((response) => {
                console.log('Logout response',response);
            })
            .catch((error) => {
                console.log('Logout error',error);
            })
    },
    authenticate(callback) {
        axios
            .get(`/mpmapas/api/authenticate`)
            .then((response) => {
                callback(response)
            })
            .catch( (error) => {
                callback(error.response)
            })
    }
}

export default ScaAPI
