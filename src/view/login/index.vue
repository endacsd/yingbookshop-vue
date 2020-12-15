<template>
    <div class="login-container">



        <el-form ref="login-form"
                 :model="user"
                 :rules="formRules"
                 class="login-form"
        >
            <el-form-item>
                <div style="display: flex;justify-content: center; color: darkolivegreen;font-size: 20px" > 登录</div>
            </el-form-item>
            <el-form-item prop="username">
                <el-input
                        v-model="user.username"
                        placeholder="请输入用户名"
                ></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password"
                        v-model="user.password"
                        placeholder="请输入密码">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onLogin" :loading="isLogining"
                           style="float: left">登录</el-button>
                <el-button type="warning"  @click="reset" class="btn-view"
                           style="text-align: center">清空</el-button>
                <el-button type="primary"  @click="toRegisterPage"
                           style="float: right">注册</el-button>
            </el-form-item>


        </el-form>
    </div>
</template>

<script>

import {login,getUserInfo} from "@/api/user";

export default {
    name: "Login",
    created(){
      getUserInfo().then(res =>{
          const {code} = res.data
          if( code == 200) this.$router.push({path:'/'})
      })
    },
    data() {
        return {
            user: {
                username: '',
                password: ''
            },
            isLogining: false,
            formRules:{
                username :[
                    { required: true, message: '用户名不能为空', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }

                ],
                password : [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在1到20个字符', trigger: 'blur' }
                ]


            }
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        },
        login(){
            login(this.user).then(res => {
                //判断登录结果
                const {data} = res
                console.log(data)
                //登录成功
                if (data.code === 200) {
                    this.$message({
                        message: '登录成功',
                        type: 'success'
                    });

                    //存储token
                    window.localStorage.setItem('userToken',data.token)
                    this.$router.push({path:'/'})
                } else {
                    //登录失败

                    this.$message({
                        message: data.msg,
                        type: 'error'
                    });
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
        onLogin() {
            this.isLogining=true;
            const user = this.user
            console.log(user)
            //验证表单
            this.$refs['login-form'].validate((valid)=>{
                if(valid) this.login()
                this.isLogining=false
            })
            //发送请求


            //获得结果
        },
        reset(){
            this.username = ''
            this.password = ''
        },
        toRegisterPage(){
            this.$router.push({path:'/register'})
        }
    }
}
</script>

<style scoped lang="less">
    .login-container {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: steelblue;

        .login-form {
            background-color: azure;
            padding: 50px;
            min-width: 300px;
        }
    }


</style>