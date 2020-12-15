

import request from "@/utils/request";


const preUrl='/api/admin/v1'
export const getAllBookListByPage = (pageSize,index) => {
    return request({
        method: 'POST',
        url: preUrl+'/getAllBookInfoByPage',
        data:{
            pageSize,
            index
        }
    })
}


export const getAllUserListByPage = (pageSize,index) => {
    return request({
        method: 'POST',
        url: preUrl+'/getAllUserInfoByPage',
        data:{
            pageSize,
            index
        }
    })
}

export const setUserInfo = (user) =>{
    return request({
        method: 'POST',
        url: preUrl + '/setUserInfo',
        data : user
    })
}

export const setBookInfo = (book) =>{
    return request({
        method: 'POST',
        url: preUrl + '/setBookInfo',
        data : book
    })
}
export const addBook = (bookList) =>{
    return request({
        method: 'POST',
        url: preUrl + '/addBook',
        data : bookList
    })
}
export const addUser = (userList) =>{
    return request({
        method: 'POST',
        url: preUrl + '/addUser',
        data : userList
    })
}