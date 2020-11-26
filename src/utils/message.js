


export const success = (msg) =>{
    this.$message({
        message: msg,
        type: 'success'
    });
}

export const error = (msg) => {
    this.$message({
        message: msg,
        type: 'error'
    });
}
