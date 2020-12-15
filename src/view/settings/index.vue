<template>
    <div class="settings-container">
        <div class="avatar-warp">
            <el-upload
                    class="upload-demo"
                    action="http://39.105.70.232:8023/api/v1/user/uploadAvatar"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="success"
                    :headers="headers">
                <el-button size="small" type="primary">修改头像</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>

        </div>


    </div>


</template>

<script>
export default {
    name: "index",
    data() {
        return {
            fileList: [],
            headers:{
               token: window.localStorage.getItem("userToken")
            }
        }
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        success(response, file, fileList){
            console.log(response,file,fileList)
        },
        beforeRemove(file, fileList) {
            console.log(fileList)
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        errorHandler(){

        },
        changeAvatar(){
            console.log("change");
        }
    }
}
</script>

<style scoped>
.avatar-warp{
    display: flex;
    flex-direction:row;
}
</style>