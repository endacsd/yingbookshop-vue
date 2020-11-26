<template>
    <el-table
            :data="tableData"
            style="width: 100%"
            :row-class-name="tableRowClassName">
        <el-table-column

                label="封面"
                width="100px">
            <template slot-scope="scope">
                <img :src="scope.row.book.cover" width="40" height="40" class="head_pic"/>
            </template>
        </el-table-column>
        <el-table-column
                prop="book.name"
                label="书名"
                width="100px">
        </el-table-column>
        <el-table-column

                label="单价"
                width="200px">
            <template slot-scope="scope">
                {{ getPrice(scope.row.book.price )}}￥
            </template>
        </el-table-column>
        <el-table-column

                label="数量"

                width="200px">

            <template slot-scope="scope">
                <div style="display: flex">
                    <el-button type="warning" icon="el-icon-minus" circle style="margin-right: 10px"
                               size="mini"
                               @click="removeOneBook(scope.row.book.id,1)"></el-button>
                    <span style="display:block;width: auto; margin-left:30px; margin-right:30px;text-align: center">
                        {{scope.row.num}}</span>

                    <el-button type="success" icon="el-icon-plus" circle style="margin-left: 10px"
                               size="mini"
                               @click="addOneBook(scope.row.book.id,1)"></el-button>


                </div>

            </template>


        </el-table-column>

        <el-table-column

                label="总价"
                width="100">
            <template slot-scope="scope">
                {{ getPrice(scope.row.book.price * scope.row.num)}}￥
            </template>

        </el-table-column>

        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                        class="btn-view"
                        type="primary"
                        @click="set(scope.row.book.id)">设置</el-button>

                <el-button
                        class="btn-view"
                        type="danger"
                        @click="removeBook(scope.row.book,scope.row.num)">删除</el-button>
                <el-button
                        class="btn-view"
                        type="success"

                        @click="buyBook(scope.row.book,scope.row.num)">购买</el-button>
                <el-button
                        class="btn-view"
                        type="info"

                        @click="toBookPage(scope.row.book)">详情页</el-button>
            </template>
        </el-table-column>

    </el-table>
</template>

<script>
import {getCartInfo,addBook,removeBook,setBook,buyBook} from "@/api/cart";


export default {
    name: "CartIndex",
    created(){
        this.loadCartInfo()
    },
    methods: {

        tableRowClassName({rowIndex}) {
            if (rowIndex === 1) {
                return 'warning-row';
            } else if (rowIndex === 3) {
                return 'success-row';
            }
            return '';
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row.book);
        },
        loadCartInfo(){
            getCartInfo().then(res => {
                const {data} =res
                console.log(data)
                this.tableData = data.itemList

            }).catch(
                err=>{
                    console.log(err)
                }
            )
        },
        getPrice(num){
            const str=num+'';
            const len=str.length;
            if(len===2) return '0.'+str;
            if(len===1) return '0.0' + str;
            return str.substring(0,len-2)+'.'+str.substring(len-2,len)
        },
        addOneBook(bookId,num){

            const itemList = [{bookId,num}];
            addBook(itemList).then(
                res=>{
                    //是否成功
                    const {data} =res
                    const {code,msg} = data
                    console.log(code)
                    if(code==200){
                        //成功
                        this.$message({
                            message: msg,
                            type: 'success',
                            duration : 1000
                        });
                        this.loadCartInfo()
                    }else{
                        this.$message({
                            message: msg,
                            type: 'error'
                        });
                    }
                }
            ).catch( err=>{
                console.log(err)
            })

        },
        toBookPage(bookId){
            this.$router.push({name:'bookDetail',query: {bookId: bookId}})
        },
        removeOneBook(bookId,num){
            const itemList = [{bookId,num}];
            removeBook(itemList).then(
                res=>{
                    //是否成功
                    const {data} =res
                    const {code,msg} = data
                    console.log(code)
                    if(code==200){
                        //成功
                        this.$message({
                            message: msg,
                            type: 'success',
                            duration : 1000
                        });
                        this.loadCartInfo()
                    }else{
                        this.$message({
                            message: msg,
                            type: 'error'
                        });
                    }
                }
            ).catch( err=>{
                console.log(err)
            })
        },
        removeBook(book,num) {
            const {id:bookId,name} = book
            console.log(bookId,name,num)
            this.$confirm(`确定删除购物车中所有的${name}?`, {
                confirmButtonText: '是',
                cancelButtonText: '否',
                type: 'warning'
            }).then(() => {

                this.removeOneBook(bookId,num)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        buyBook(book,num) {
            const {id:bookId,name} = book
            console.log(bookId,name,num)
            this.$confirm(`确定购买${num}本${name}?一共${this.getPrice(num*book.price)}￥`, {
                confirmButtonText: '是',
                cancelButtonText: '否',
                type: 'warning'
            }).then(() => {

                buyBook([{bookId,num}]).then(
                    res=>{
                        const {code,msg} =res.data
                        this.loadCartInfo()

                        //console.log(code,msg)
                        this.$message({
                            type: code==200 ? 'success':'error',
                            message: msg
                        });
                    }
                ).catch(err=>{
                    this.loadCartInfo()
                    this.$message({
                        type: 'error',
                        message: err
                    });
                })


            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消购买'
                });
            });
        },
        set(bookId){
            console.log(bookId)
            this.$prompt('请输入你想要设置的数量', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /(^[1-9]\d*$)/,
                inputErrorMessage: '数量格式不对'
            }).then(({ value }) => {
                this.setBook(bookId,value)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            });
        },
        setBook(bookId,num){
            setBook(bookId,num).then(res=>{
                this.loadCartInfo()
                const {code,msg} =res.data
                this.$message({
                    type: code===200 ? 'success' : 'error',
                    message: msg
                });
            }).catch(err => {
                this.$message({
                    type:'error',
                    message: err
                });
            })
        }
    },
    data() {
        return {
            tableData: []
        }
    },

}
</script>

<style scoped lang="less">
.btn-view{

    margin-right: 50px;
}
</style>