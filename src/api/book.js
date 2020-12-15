


import request from "@/utils/request";

export const getBookList = () => {
    return request({
        method: 'get',
        url: '/api/public/getBookList'
    })
}

export const getBookInfo = (bookId) =>{
    return request({
        method: 'get',
        url: '/api/public/getBookInfo/' +bookId
    })
}


export const getBookShow = () =>{
    return request({
        method: 'get',
        url: '/api/public/getBookShow/'
    })
}

export const buyBook = (bookList) => {
    return request({
        method: 'post',
        url : '/api/v1/book/buyBook',
        data : bookList
    })
}

export const addBook = bookList => {
    return request({
        method: 'POST',
        url: '/api/v1/book/addBook',
        data : bookList
    })
}

export const getBookListByPage = (pageSize,index) =>{
    return request({
        method: 'POST',
        url: '/api/public/getBookListByPage',
        data : {
            pageSize,
            index
        }
    })
}