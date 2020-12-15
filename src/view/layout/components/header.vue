<template>

    <el-container class="container">
        <div>
            <i class="el-icon-notebook-2"
            />
            <span>网上书店</span>
        </div>

        <el-dropdown @command="handleCommand" v-if="isOnline">
            <div class="avatar-warp">
                <span style="margin-right: 30px;color: darkcyan">{{username}}</span>
                <div>
                    <el-avatar :src="avatar" @error="errorHandler" style="margin-right: 30px">
                        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                    </el-avatar>
                </div>


            </div>
            <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="home">主页</el-dropdown-item>
                <el-dropdown-item command="settings">设置</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
                <el-dropdown-item command="admin" v-if="authority==='ROLE_ADMIN'">管理</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="handleCommand" v-else>
            <div class="avatar-warp">
                <span style="margin-right: 30px;color: darkcyan"
                @click="toLoginPage">未登录</span>
            </div>
            <el-dropdown-menu slot="dropdown" >

            </el-dropdown-menu>
        </el-dropdown>


    </el-container>

</template>

<script>
import {getUserInfo,logout} from '@/api/user'
import {serviceUrl} from "@/utils/config";
export default {
    name: "AppHeader",
    data() {
        return {
            username: '',
            avatar : '',
            isOnline : false,
            authority: 'ROLE_NULL'
        }
    },
    created(){
        this.loadUserInfo()
    },
    methods: {
        errorHandler(){
            console.log('error')
        },
        toLoginPage(){
            this.$router.push({path:'/login'})
        },
        loadUserInfo() {

            getUserInfo().then(res => {

                const {code,username, avatar,authority} = res.data
                if(code==200){
                    this.username = username
                    this.avatar = serviceUrl+''+avatar
                    this.isOnline = true
                    this.authority=authority
                }else{
                    this.isOnline = false
                }

            }).catch(err => {
                //服务器错误
                console.log(err);
                this.$message({
                    message: err,
                    type: 'error'
                });
            })
        },
        logout(){
            logout().then(res =>{
                const {code,msg} =res.data
                console.log(code)
                window.localStorage.removeItem('userToken')
                //this.isOnline=false
                this.$message({
                    message: msg,
                    type: code == 200 ? 'success' : 'error'
                });
                this.loadUserInfo()
            }).catch(err=>{
                this.$message({
                    message: err,
                    type: 'error'
                });
            })
        },
        settings(){
            if( this.$route.path !=='/settings')
            this.$router.push({path:'/settings'})
        },
        admin(){
            if( this.$route.path !=='/admin')
            this.$router.push({path:'/admin'})
        },
        home(){
             if( this.$route.path !=='/')
             this.$router.push({path:'/'})
        },
        handleCommand(command) {

            if(command==="settings"){
                this.settings()
            }else if(command ==="logout"){
                this.logout()
            }else if(command === "admin"){
                this.admin()
            }else if(command === "home"){
                this.home()
            }
        }
    }
}
</script>

<style scoped lang="less">

.container {

    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;

}
.avatar-warp {
    display: flex;
    align-items: center;
    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
        margin-left: 10px;
    }


}
</style>