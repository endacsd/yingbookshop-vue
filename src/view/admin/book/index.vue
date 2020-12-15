<template>
    <div class="admin-book-container">


        <div style="margin: 30px">

            <el-button type="primary" @click="addBook">添加</el-button>
        </div>

        <el-table
                :data="bookList"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="书籍Id"
                    width="80px">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="书名"
                    width="100px">
            </el-table-column>
            <el-table-column

                    label="封面"
                    width="100px">
                <template slot-scope="scope">
                    <img :src="scope.row.cover" width="40" height="40" class="head_pic"/>
                </template>


            </el-table-column>
            <el-table-column
                    prop="author"
                    label="作者"
                    width="200px">
            </el-table-column>

            <el-table-column
                    prop="publisher"
                    label="出版社"
                    width="200px">
            </el-table-column>

            <el-table-column
                    prop="QTY"
                    label="库存"
                    width="200px">
            </el-table-column>

            <el-table-column

                    label="价格"
                    width="200px">
                <template slot-scope="scope">
                    {{ getPrice(scope.row.price )}}￥
                </template>
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
                            @click="setBook(scope.row)">设置</el-button>
                </template>
            </el-table-column>

        </el-table>


        <el-pagination
                @current-change="curPageChange"
                class="page"
                :page-size="pageSize"
                :page-count="6"
                layout="prev, pager, next"
                :total="bookNum">
        </el-pagination>

        <el-dialog :title="kind" :visible.sync="dialog"
        :append-to-body="true">
        <el-form :model="book" ref="book-form" :rules="formRules">
            <el-form-item label="书名" :label-width="formLabelWidth" prop="name">
                <el-input v-model="book.name"  ></el-input>
            </el-form-item>
            <el-form-item label="封面" :label-width="formLabelWidth" >
                <el-col :span="2">
                    <img :src="book.cover" width="40" height="40" class="head_pic"/>
                </el-col>
                <el-col :span="1">
                    url:
                </el-col>
                <el-col :span="11">
                    <el-input v-model="book.cover" ></el-input>
                </el-col>
                <el-upload
                        class="upload-demo"
                        action="http://30.105.70.232:9000/api/admin/v1/uploadCover"
                        :on-success="success"
                        :show-file-list="false"
                        :headers="headers">
                    <el-button size="small" type="primary">上传封面</el-button>

                </el-upload>
            </el-form-item>
            <el-form-item label="作者" :label-width="formLabelWidth" prop="author">
                <el-input v-model="book.author"  ></el-input>
            </el-form-item>
            <el-form-item label="出版社" :label-width="formLabelWidth" prop="publisher">
                <el-input v-model="book.publisher"  ></el-input>
            </el-form-item>

            <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
                <el-input v-model="book.price"  ></el-input>
            </el-form-item>
            <el-form-item label="库存" :label-width="formLabelWidth" prop="QTY">
                <el-input v-model="book.QTY"  ></el-input>
            </el-form-item>
            <el-form-item label="状态" :label-width="formLabelWidth" >
                <el-switch
                        v-model="book.hide"
                        active-color="#ff4949"
                        inactive-color="#13ce66">
                </el-switch>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialog = false">取 消</el-button>

            <el-button type="primary"
                       @click="commitSetBook()" v-if="kind==='书籍修改表单'">确 定</el-button>
            <el-button type="primary"
                       @click="commitAddBook()" v-else>确 定</el-button>
        </div>
        </el-dialog>
    </div>
</template>

<script>

import {getPrice} from "@/utils/price";
import {getAllBookListByPage, setBookInfo,addBook} from "@/api/admin";
import {clone} from "@/utils/object";
import {serviceUrl} from "@/utils/config";

export default {
    name: "AdminBookIndex",
    created(){
       this.getBookInfoByPage(this.pageSize,1)
    },
    data(){
        return{
            headers:{
                token: window.localStorage.getItem("userToken")
            },
            pageSize : 5,
            index : 1,
            bookList: [],
            bookNum : 1,
            dialog: false,
            formRules:{
                QTY :[
                    {type: 'number', message: '必须为数字', trigger: 'blur'},
             
                    {pattern: /^[0-9]+$/, message: '必须大于或等于0', trigger: 'blur'}
                ],
                price :[
                    {required : true, message : '不能为空', trigger: 'blur' },

                    {pattern: /^[0-9]+$/, message: '必须大于或等于0', trigger: 'blur'}
                ],
                author: [
                    {required : true, message : '不能为空', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在1到20个字符', trigger: 'blur' }
                ],
                publisher: [
                    {required : true, message : '不能为空', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在1到20个字符', trigger: 'blur' }
                ],
                name :[
                    {required : true, message : '不能为空', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在1到20个字符', trigger: 'blur' }
                ]
            },
            book : {},
            formLabelWidth : "120px",
            kind : ''
        }
    },
    methods:{
        getPrice : getPrice,
        setBook(book){
            console.log(book)
            this.dialog = true;
            this.kind='书籍修改表单'
            this.book=clone(book)
        },
        success(response) {

            this.book.cover=serviceUrl+response.msg
        },
        addBook(){
           this.dialog =true;
           this.kind='书籍提交表单'
           this.book={}
        },
        getBookInfoByPage(pageSize,index){
            getAllBookListByPage(pageSize,index).then(res=>{
                console.log(res.data)
                const {code,pageNumber,bookNumber,index,bookList,msg} = res.data
                if(code === 200){
                    this.pageNum=pageNumber;
                    this.bookNum=bookNumber;
                    this.index=index;
                    this.bookList=bookList
                }else{
                    this.$message({
                        type: 'error',
                        message: '获取失败'+msg
                    });
                }

            }).catch(err =>{
                console.log(err)

            })

        },
        hideChange(book){
            console.log(book.hide);
            this.setBookInfo(book)
        },
        setBookInfo(book){
            setBookInfo(book).then(res=>{
                const {code,msg}=res.data
                this.$message({
                    type: code===200 ? 'success': 'error',
                    message: msg
                });
                this.getBookInfoByPage(this.pageSize,this.index);
            }).catch(err=>{
                this.getBookInfoByPage(this.pageSize,this.index);
                this.$message({
                    type: 'error',
                    message: err
                });
            })
        },
        curPageChange(currentPage) {
            this.getBookInfoByPage(this.pageSize,currentPage)
        },
        commitSetBook(){

            this.$refs['book-form'].validate((valid)=>{
                if(valid) {
                    this.dialog = false
                    this.setBookInfo(this.book)
                }

            })


        },
        commitAddBook(){
            this.$refs['book-form'].validate((valid)=>{
                if(valid) {
                    this.dialog = false
                    addBook([this.book]).then(
                        res=>{
                            const {code,msg}=res.data
                            this.$message({
                                type: code===200 ? 'success': 'error',
                                message: msg
                            });
                        }
                    ).catch(err=>{
                        this.$message({
                            type: 'error',
                            message: err
                        });
                    })
                }

            })
        }

    }
}
</script>

<style scoped>
.page{
    display: flex;
    justify-content: center;
}
</style>