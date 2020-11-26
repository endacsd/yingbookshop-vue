<template>
    <div class="book-container">




        <el-card class="cart-view" >
            <div class="block">
                <el-image :src="book.cover" class="image">
                    <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline" style="width: auto;height: 227px"></i>
                    </div>
                </el-image>
            </div>
            <div style="padding: 14px;">
                <span style="float: left">{{book.name}}</span>
                <span style="float: right">{{getPrice(book.price)}}￥</span>
            </div>
            <br>
            <el-rate style="text-align: center"
                    v-model="value"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}">
            </el-rate>
        </el-card>

        <el-card class="cart-view" >
            <p style="text-align: center"> 购买</p>
            <div style="display: flex;width: auto">
                <el-button type="warning" icon="el-icon-minus" circle
                           style="margin-right: 5px;justify-content: left"
                            size="mini"
                           @click="num= num>0?  num-1:num"
                            ></el-button>
                <el-input v-model="num"
                          style="height: 30px" :disabled="true"></el-input>
                <el-button type="success" icon="el-icon-plus" circle
                           style="margin-left: 5px;justify-content:right"
                           size="mini"
                           @click="num++"
                           ></el-button>
            </div>
            <p style="text-align: center "> 总价 {{getPrice(num*book.price)}}</p>
            <div style=" flex-direction: column; display: flex;justify-content: center">

                <el-button type="primary" size="medium"
                           style="justify-content: center;margin: 10px"
                           @click="cartBook(book.id,num)">放入购物车</el-button>

                <el-button type="success" size="medium"
                           style="justify-content: center;margin: 10px"
                           @click="buyBooks(book,num)">购买</el-button>
                <el-button type="warning" size="medium"
                           style="justify-content: center;margin: 10px"
                           @click="num=0">重置</el-button>

            </div>


        </el-card>



    </div>


</template>

<script>
    import {addBook, buyBook, getBookInfo} from "@/api/book";

export default {
    name: "BookIndex",
    created(){
        if(!this.bookId){
            this.$message({
                message: '未选中书籍',
                type: 'error'
            });
            //返回
            this.$router.push({name:'shop'})
        }else{
            this.getBookInfo()
        }

    },
    methods:{
        getBookInfo(){
            getBookInfo(this.bookId).then(res => {
                console.log(res)
                this.book=res.data.bookInfo
            }).catch(err =>{
                console.log(err)
            })
        },
        getPrice(num){
            const str=num+'';
            const len=str.length;
            if(len===2) return '0.'+str;
            if(len===1) return '0.0' + str;
            return str.substring(0,len-2)+'.'+str.substring(len-2,len)
        },
        buyBooks(book,num){
            if(num < 0){
                this.$message({
                    type: 'error',
                    message: '数量错误'
                });
            }else if(num === 0){
                this.$message({
                    type: 'error',
                    message: '请选择超过一本'
                });
            }else{
                const {id:bookId,name,price} = book
                console.log(bookId)
                this.$confirm(`确定花费${this.getPrice(price*num)}￥购买${num}本${name}?`, {
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                    type: 'warning'
                }).then(() => {
                    const bookList = [{bookId,num}]
                    buyBook(bookList).then( res =>{
                        const {code,msg,reason} = res.data
                        console.log(code,msg,reason)
                        this.$message({
                            type: code==200 ? 'success' : 'error',
                            message: code==200 ? msg : msg + ':' + reason
                        });
                    }).catch(err => {
                        console.log(err)
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消购买'
                    });
                });
            }

        },
        cartBook(bookId,num){
            const itemList = [{bookId,num}];
            if(num===0){
                this.$message({
                    type: 'error',
                    message: '请选择超过一本'
                });
            }else{
                addBook(itemList).then(res => {

                    const {msg,code} = res.data
                    console.log(msg,code,res)

                    this.$message({
                        type: code==200 ? 'success' : 'error',
                        message: msg
                    });
                }).catch(
                    err=>{
                        this.$message({
                            type:  'error',
                            message: err
                        });
                    }
                )
            }

        },
        buyBook(bookId){
            const itemList = [{bookId, num:1 }];
            buyBook(itemList).then(res => {
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })
        }
    },
    data(){
        return{
            bookId: this.$route.query.bookId,
            book:{
                bookId : 1,
                name : 'Haskell趣学指南',
                cover: 'https://img9.doubanio.com/view/subject/s/public/s27195536.jpg',
                QTY : 100,
                price : 3000
            },
            num : 0,
            value: 3.7
        }
    }
}
</script>

<style scoped>
.book-container{
    display: flex;
    /*justify-content: space-between;  横向中间自动空间 */

}
.cart-view{
    hight: 350px;
    width: 270px;
    margin: 10px;

}

</style>