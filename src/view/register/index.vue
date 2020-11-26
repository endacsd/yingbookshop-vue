<template>
    <div class="register-container">


        <el-form-item>
            <div style="display: flex;justify-content: center; color: darkolivegreen;font-size: 20px" > 注册</div>
        </el-form-item>
        <el-form ref="register-form"
                 :model="user"
                 :rules="formRules"
                 class="register-form"
        >
            <el-form-item prop="username">
                <el-input
                        v-model="user.username"
                        placeholder="请输入用户名"
                ></el-input>
            </el-form-item>
            <el-form-item prop="mail">
                <el-input
                        v-model="user.mail"
                        placeholder="请输入电子邮件"
                ></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password"
                          v-model="user.password"
                          placeholder="请输入密码">
                </el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onRegister" :loading="isRegistering">注册</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {getUserInfo, register} from "@/api/user";
export default {
    name: "RegisterIndex",
    created(){
        getUserInfo().then(res =>{
            const {code} = res.data
            if( code == 200) this.$router.push({path:'/'})
        })
    },
    data(){
        return{
            isRegistering : false,
            user : {
                username : '21180430',
                mail : 'zhengyh2118@jlu.edu.cn',
                password : '123456'
            },
            formRules:{
                username :[
                    { required: true, message: '用户名不能为空', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }

                ],
                mail : [
                    { required: true, message: '电子邮件不能为空', trigger: 'blur' },
                    { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                ],
                password : [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在1到20个字符', trigger: 'blur' }
                ]



            }
        }
    },
    methods:{
        onRegister(){
            this.isLogining=true;
            const user = this.user
            console.log(user)
            //验证表单
            this.$refs['register-form'].validate((valid)=>{
                if(valid) this.register()
                this.isLogining=false
            })
            //发送请求


            //获得结果
        },
        register(){
            console.log('test')
            register(this.user).then(
                res => {
                    const {code,msg} =res.data
                    this.$message({
                        message: code ==200 ? `${msg},正在跳转登录页面`:msg,
                        type: code == 200 ? 'success' : 'error'
                    });

                    this.$router.push({path:'/login'})
                }
            ).catch(err=>{
                this.$message({
                    message: err,
                    type: 'error'
                });
            })
        }
    }
}
</script>

<style scoped lang="less">
.register-container {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: steelblue;

    .register-form {
        background-color: azure;
        padding: 50px;
        min-width: 300px;
    }
}

</style>