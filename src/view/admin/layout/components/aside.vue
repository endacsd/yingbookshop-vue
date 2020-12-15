<template>

    <el-menu
            default-active="/admin/"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color=steelblue
            text-color="#fff"
            :collapse="isCollapse"
            router
            active-text-color=cyan>
        <el-menu-item  @click="change()">
            <i :class="collpaseIcons[pos]"></i>
        </el-menu-item>
        <el-menu-item index="/admin/" >
            <i class="el-icon-document"></i>
            <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/admin/book">
            <i class="el-icon-goods"></i>
            <span slot="title">书籍</span>
        </el-menu-item>
        <el-menu-item index="/admin/user">
            <i class="el-icon-shopping-cart-2"></i>
            <span slot="title">用户</span>
        </el-menu-item>
        <el-menu-item index="/admin/order">
            <i class="el-icon-star-off"></i>
            <span slot="title">订单</span>
        </el-menu-item>

    </el-menu>

</template>

<script>
    export default {
        name: "AppAside",
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            change(){
                this.isCollapse=!this.isCollapse;
                this.pos=1-this.pos;
            }
        },
        data() {
            return {
                isCollapse : false,
                pos : 1,
                collpaseIcons : ['el-icon-arrow-right','el-icon-arrow-left']
            }
        }
    }
</script>

<style scoped>

</style>