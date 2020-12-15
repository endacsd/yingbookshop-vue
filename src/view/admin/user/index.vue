<template>
    <div class="admin-user-container">
        <el-table
                :data="userList"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="用户Id"
                    width="80px">
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="用户名"
                    width="100px">
            </el-table-column>
            <el-table-column

                    label="头像"
                    width="100px">
                <template slot-scope="scope">
                    <el-avatar :src="scope.row.avatar"  style="margin-right: 30px">
                        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                    </el-avatar>

                </template>


            </el-table-column>
            <el-table-column
                    prop="mail"
                    label="mail"
                    width="200px">
            </el-table-column>
            <el-table-column

                    label="余额"
                    width="200px">
                <template slot-scope="scope">
                    {{ getPrice(scope.row.surplus )}}￥
                </template>
            </el-table-column>
            <el-table-column
                    prop="authority"
                    label="权限"
                    width="200px">
            </el-table-column>

            <el-table-column

                    label="状态"
                    width="100">
                <template slot-scope="scope">
                    <el-switch
                            @change="hideChange(scope.row)"
                            v-model="scope.row.hide"
                            active-color="#ff4949"
                            inactive-color="#13ce66">
                    </el-switch>
                </template>

            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            class="btn-view"
                            type="primary"
                            @click="setUser(scope.row)">设置</el-button>
                </template>
            </el-table-column>

        </el-table>

        <el-pagination
                @current-change="curPageChange"
                class="page"
                :page-size="pageSize"
                :page-count="6"
                layout="prev, pager, next"
                :total="userNum">
        </el-pagination>

        <el-dialog title="用户修改表单" :visible.sync="dialogFormVisible"
                   :append-to-body="true">
            <el-form :model="user" ref="update-form" :rules="formRules">

                <el-form-item label="头像" :label-width="formLabelWidth" >
                    <el-avatar :src="user.avatar"  style="margin-right: 30px">
                        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                    </el-avatar>
                </el-form-item>
                <el-form-item label="用户名" :label-width="formLabelWidth" >
                    <el-input v-model="user.username"  :disabled=true></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth" >
                    <el-input v-model="user.mail"  :disabled=true></el-input>
                </el-form-item>
                <el-form-item label="权限" :label-width="formLabelWidth">
                    <el-select v-model="user.authority" placeholder="请选择权限">
                        <el-option label="普通用户" value="ROLE_USER"></el-option>
                        <el-option label="店主"    value="ROLE_BOSS"></el-option>
                        <el-option label="管理员"   value="ROLE_ADMIN"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="余额" :label-width="formLabelWidth" prop="surplus" >
                    <el-input v-model="user.surplus"  ></el-input>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth" >
                    <el-switch
                            :disabled=true
                            v-model="user.hide"
                            active-color="#ff4949"
                            inactive-color="#13ce66">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="commit(user)" >确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    // eslint-disable-next-line no-unused-vars

import {getPrice} from "@/utils/price";
import {getAllUserListByPage, setUserInfo} from "@/api/admin";
import {clone} from "@/utils/object";
export default {
    name: "AdminUserIndex",
    data() {
        return {
            pageSize : 5,
            index : 1,
            userList: [],
            userNum : 1,
            dialogFormVisible : false,
            user: {},
            formLabelWidth: '120px',
            formRules:{
                surplus :[
                    {require : true, message : '余额不能为空', trigger: 'blur' },
                    {pattern: /^[0-9]+$/, message: '必须大于0或等于0', trigger: 'blur'}
                ]
            }
        }
    },
    methods:{
        getPrice : getPrice,
        setUser(user){
            this.user=clone(user);
            this.dialogFormVisible = true
        },
        loadUserInfo(pageSize,index){
            console.log(pageSize,index)
            getAllUserListByPage(pageSize,index).then(res => {

                const {code,pageNumber,userNumber,index,userList,msg} = res.data
                if(code === 200){
                    this.pageNum=pageNumber;
                    this.userNum=userNumber;
                    this.index=index;
                    this.userList=userList
                }else{
                    this.$message({
                        type: 'error',
                        message: '获取失败'+msg
                    });
                }

            }).catch(err =>{
                console.log(err)
                this.$message({
                    type :'error',
                    message: err
                });
            })

        },
        hideChange(user){
            console.log(user.hide)
            //改变
            this.updateUserInfo(user);
        },
        curPageChange(currentPage){
            this.loadUserInfo(this.pageSize,currentPage)

        },
        commit(user){
            console.log(user);

            // 提交信息
            console.log(122);
            this.$refs['update-form'].validate((valid)=>{
                if(valid) {
                    this.dialogFormVisible =false
                    this.updateUserInfo(user);
                }

            })

        },
        updateUserInfo(user){
            setUserInfo(user).then(res=>{
                const {code,msg}=res.data
                this.$message({
                    type: code===200 ? 'success': 'error',
                    message: msg
                });
                this.loadUserInfo(this.pageSize,this.index)
            }).catch(err=>{
                console.log(err)
                this.loadUserInfo(this.pageSize,this.index)
                this.$message({
                    type: 'error',
                    message: err
                });
            })
        }

    },
    created(){
        this.loadUserInfo(this.pageSize,1)
    }
}
</script>

<style scoped>

</style>