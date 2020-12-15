


export const clone = obj=>{
    let data
    if(Object.prototype.toString.call(obj)==='[object Array]'){
        data=[]
        for (let index = 0; index < obj.length; index++) {
            data.push(clone(obj[index]))
        }
    }else if(Object.prototype.toString.call(obj)==='[object Object]'){
        data={}
        for(let key in obj){
            data[key]=clone(obj[key])
        }
    }else {
        return obj
    }
    return data
}