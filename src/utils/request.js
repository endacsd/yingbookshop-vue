import axios from 'axios'



const request = axios.create({
    baseURL: 'http://39.105.70.232:9000',
    //baseURL: 'http://localhost:8023',
    //baseURL: '',
    headers:{

    }
})


request.interceptors.request.use(
    function (config) {
        const userToken=window.localStorage.getItem("userToken")
        if(userToken){
            config.headers.token=userToken
        }

        console.log(config.baseURL+config.url)
        return config

    },

    //fail

    function (error) {
        return Promise.reject(error)

    }
)
export default request