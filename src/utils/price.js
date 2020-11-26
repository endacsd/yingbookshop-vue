

export const getPrice = num =>{

    const str=num+'';
    const len=str.length;
    if(len===2) return '0.'+str;
    if(len===1) return '0.0' + str;
    return str.substring(0,len-2)+'.'+str.substring(len-2,len)
}

