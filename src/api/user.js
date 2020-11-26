

import request from "@/utils/request";

//登录
export const login = user    => {
    return request({
        method: 'POST',
        url: '/login',
        data: user
    })
}
export const register = user =>{
    return request({
        method : 'POST',
        url : '/register',
        data : user
    })
}
export const logout = () => {
    return request({
        method : 'GET',
        url : '/logout'
    })
}

export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: '/api/v1/user/userInfo',
    })
}

export const updateUserInfo = () =>{

}




