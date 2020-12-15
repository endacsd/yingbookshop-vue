<template>
    <div class="home-container">

        <h2>欢迎{{username}}</h2>
        <h3>你的余额为{{getPrice(surplus)}}￥</h3>
        <el-carousel :interval="4000" type="card" height="400px" >
            <el-carousel-item v-for="item in bookList" :key="item" class="item-view">
                <el-image :src="item.cover" class="image">
                    <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline" style="width: auto;height: 227px"></i>
                    </div>
                </el-image>

                <div style="text-align: center "> 书名 </div>
            </el-carousel-item>
        </el-carousel>

    </div>

</template>

<script>
import {getUserInfo} from "@/api/user";
import {getBookShow} from "@/api/book";

export default {
    name: "HomeIndex",
    data(){
      return{
          username : '',
          avatar : '',
          surplus : 0,
          bookList : []

      }
    },
    created(){
        this.loadUserInfo()
        this.getBookShow()
    },
    methods:{
        loadUserInfo() {
            getUserInfo().then(res => {
                const {code,username, avatar,surplus} = res.data
                if(code==200){
                    this.username = username
                    this.avatar = avatar
                    this.surplus = surplus
                }else{
                    this.$message({
                        message: '登录过期,请尝试重新登录',
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
        getPrice(num){
            const str=num+'';
            const len=str.length;
            if(len===2) return '0.'+str;
            if(len===1) return '0.0' + str;
            return str.substring(0,len-2)+'.'+str.substring(len-2,len)
        },
        getBookShow(){
            getBookShow().then(res=>{

                console.log(res.data.bookList)
                this.bookList=res.data.bookList
            }).catch(
                err=>{
                    console.log(err)
                }

            )
        }
    }
}
</script>

<style scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}

.image {
    width: 40%;
    width: auto;
    height: auto;
}
.item-view{
    hight: auto;
    width: auto;
    display: block;
    justify-content: center;
    align-items: center;

}
</style>