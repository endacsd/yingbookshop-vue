

import request from "@/utils/request";

//登录
export const login = user    => {
    return request({
        method: 'POST',
        url: '/api/login',
        data: user
    })
}
export const register = user =>{
    return request({
        method : 'POST',
        url : '/api/register',
        data : user
    })
}
export const logout = () => {
    return request({
        method : 'GET',
        url : '/api/logout'
    })
}

export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: '/api/v1/user/userInfo',
    })
}


export const setAvatar = (url)=>{
    return request({
        method: 'POST',
        url: '/api/v1/user/setAvatar',
        data : {
            url:url
        }
    })
}





