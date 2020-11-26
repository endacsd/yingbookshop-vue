


import request from "@/utils/request";


const preUrl='/api/v1/cart'
//添加购物车
export const addBook = bookList => {
    return request({
        method: 'POST',
        url: preUrl+'/addBook',
        data: bookList

    })
}
//移除
export const removeBook = bookList => {
    return request({
        method: 'POST',
        url: preUrl+'/removeBook',
        data : bookList
    })
}
export const buyBook = bookList =>{
    return request({
        method: 'POST',
        url: preUrl+'/buyBook',
        data : bookList

    })
}
export const clearCart = () => {
    return request({
        method : 'GET',
        url: preUrl+'/clearCart',
    })
}

export const setBook = (bookId,num) =>{
    return request({
        method : 'POST',
        url: preUrl+'/setBook',
        data : {
            bookId,
            num
        }
    })
}

export const getCartInfo = () => {
    return request({
        method : 'GET',
        url: preUrl+'/getCartInfo'
    })
}


