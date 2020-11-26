import axios from 'axios'



const request = axios.create({
    baseURL: 'http://localhost:8023/',
    headers:{

    }
})


request.interceptors.request.use(
    function (config) {
        const userToken=window.localStorage.getItem("userToken")
        if(userToken){
            config.headers.token=userToken
        }
        console.log(config.url)
        return config

    },

    //fail

    function (error) {
        return Promise.reject(error)

    }
)
export default request