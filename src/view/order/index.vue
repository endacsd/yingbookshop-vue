<template>
    <div class="admin-book-container">
        <el-table
                :data="orderList"

                style="width: auto">
            <el-table-column
                    prop="book.name"
                    label="书名"
                    width="100px">
            </el-table-column>
            <el-table-column
                    label="封面"
                    width="100px">
                <template slot-scope="scope">
                    <img :src="scope.row.book.cover" width="40" height="40" class="head_pic"/>
                </template>
            </el-table-column>
            <el-table-column
                    prop="book.author"
                    label="作者"
                    width="100px">
            </el-table-column>

            <el-table-column
                    prop="book.publisher"
                    label="出版社"
                    width="200px">
            </el-table-column>

            <el-table-column
                    prop="num"
                    label="数量"
                    width="100px">
            </el-table-column>

            <el-table-column
                    label="价格"
                    width="200px">
                <template slot-scope="scope">
                    {{ getPrice(scope.row.book.price )}}￥
                </template>
            </el-table-column>
            <el-table-column
                    label="总价"
                    width="200px">
                <template slot-scope="scope">
                    {{ getPrice(scope.row.book.price*scope.row.num )}}￥
                </template>
            </el-table-column>
            <el-table-column
                    label="时间"
                    prop="date"
                    width="200px">
            </el-table-column>
        </el-table>


        <el-pagination
                @current-change="curPageChange"
                class="page"
                :page-size="pageSize"
                :page-count="6"
                layout="prev, pager, next"
                :total="orderNum">
        </el-pagination>
    </div>
</template>

<script>

import {getPrice} from "@/utils/price";
import {getOrderByPage} from "@/api/order";
import {getBookInfo} from "@/api/book";

export default {
    name: "OrderBookIndex",
    created(){
        this.getOrderInfoByPage(this.pageSize,1)
    },
    data(){
        return{
            pageSize : 5,
            index : 1,
            orderList: [],
            orderNum : 0
        }
    },
    methods:{
        getPrice : getPrice,
        setBook(book){
            console.log(book)
        },
        getOrderInfoByPage(pageSize,index){
            getOrderByPage(pageSize,index).then(res=>{
                console.log(res.data)
                const {code,pageNumber,orderNumber,index,orderList,msg} = res.data
                console.log(orderNumber)
                if(code === 200){
                    this.pageNum=pageNumber;
                    this.orderNum=orderNumber;
                    this.index=index;
                    this.orderList=orderList
                    for(let i=0;i<this.orderList.length;i++){
                       this.getBookInfo(this.orderList[i].bookId,orderList[i],orderList[i])
                    }
                    console.log(this.orderList);
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
        curPageChange(currentPage) {
            this.getOrderInfoByPage(this.pageSize,currentPage)
        },
        getBookInfo(bookId,order){
            getBookInfo(bookId).then(res=>{
                order.book=res.data.bookInfo
            }).catch(err=>{
                this.$message({
                    type: 'error',
                    message: err
                });
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