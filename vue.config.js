const basedir='http://39.105.70.232:9000'
//const basedir='http://localhost:8023'
module.exports ={

    devServer: {
        proxy:{
            '/api' : {
                target: basedir,
                pathRewrite: {'^/api' : '/api'},
                changeOrigin : true,
                logLevel : 'debug',
                secure: false
            },
        },
        port: 80
    }


}