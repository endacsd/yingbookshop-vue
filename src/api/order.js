


import request from "@/utils/request";


export const getOrderByPage = (pageSize,index)=>{
    return request({
        method: 'POST',
        url: '/api/v1/order/getOrderByPage',
        data:{
            pageSize,
            index
        }
    })
}