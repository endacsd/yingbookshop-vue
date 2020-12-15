<template>

    <div class="shop-container   ">
        <el-row style="padding: 10px;   " >
            <el-col :span="6" v-for="book in bookList" :key="book.id">
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
                    <div style="padding: 14px;">
                        <el-button  style="float: left;margin-left: 0px;margin-right: 0px"
                                    icon="el-icon-reading"
                                    @click="detailBook(book.id)"
                                    circle>

                        </el-button>
                        <el-button  style="margin-right: 38px;margin-left: 38px;float: contour"
                                    icon="el-icon-shopping-cart-2"
                                    @click="cartBook(book.id)"
                                    circle>

                        </el-button>
                        <el-button  style="float: right;margin-left: 0px;margin-right: 0px"
                                    icon="el-icon-sold-out"
                                    @click="buyOneBook(book)"
                                    circle>

                        </el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-pagination

                @current-change="curPageChange"
                class="page"
                :page-size="pageSize"
                :page-count="6"
                layout="prev, pager, next"
                :total="bookNum">
        </el-pagination>
    </div>
</template>

<script>
import { getBookList,buyBook,addBook,getBookListByPage} from '@/api/book'
export default {
    name: "ShopIndex",
    data() {
        return{
            bookList : [],
            currentDate: new Date(),
            pageSize : 8,
            index : 1,
            pageNum : 1,
            bookNum : 20,
        }
    },
    created() {
        this.getBookListByPage(1)
    },
    methods:{

        curPageChange(currentPage){
            //console.log("curPageChange"+currentPage)
            this.getBookListByPage(currentPage)


        },

        getBookListByPage(index){
          getBookListByPage(this.pageSize,index).then(res=>{
              const {code,pageNumber,bookNumber,index,bookList,msg} = res.data
              if(code == 200){
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
              this.$message({
                  type: 'error',
                  message: err
              });
          })
        },
        getAllBooks(){
            getBookList().then( res =>{

                //验证是否成功
                const {data} = res

                if(data.code==200){
                    this.bookList = data.bookList
                    console.log(this.bookList)
                }else{
                    //获取信息失败
                    this.$message({
                        message: data.msg,
                        type: 'error'
                    });
                }
            }).catch(err =>{
                //获取失败
                this.$message({
                    message: err,
                    type: 'error'
                });
            })
        },
        getPrice(num){
            const str=num+'';
            const len=str.length;
            if(len===2) return '0.'+str;
            if(len===1) return '0.0' + str;
            return str.substring(0,len-2)+'.'+str.substring(len-2,len)
        },
        buyBook(bookId){
           const itemList = [{bookId, num:1 }];
           buyBook(itemList).then(res => {
               console.log(res);
           }).catch(err=>{
               console.log(err);
           })
        },
        cartBook(bookId){
            const itemList = [{bookId,num:1}];

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
        },
        detailBook(bookId){
            console.log(bookId);
            this.$router.push({name:'bookDetail',query: {bookId: bookId}})
        },
        buyOneBook(book){

            const {id:bookId,name,price} = book
            console.log(bookId)
            this.$confirm(`确定花费${this.getPrice(price)}￥购买1本${name}?`, {
                confirmButtonText: '是',
                cancelButtonText: '否',
                type: 'warning'
            }).then(() => {
                const num = 1
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
    }
}
</script>

<style>
    .image {
        width: 100%;
        display: block;
    }
    .cart-view{
        hight: 350px;
        width: 270px;
        margin: 10px;
    }
    .button-view{
        float: bottom;
        margin: 2px;
        height: 20px;
    }
    .shop-container{
        flex: auto;
        justify-content: space-between;
    }
    .el-row-view{
        flex-direction: column;
    }
    .page{
        display: flex;
        justify-content: center;
    }




</style>