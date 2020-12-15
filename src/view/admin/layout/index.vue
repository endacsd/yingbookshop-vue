<template>
    <el-container class="layout-container" >
        <el-aside
                class="aside"
                width="auto"
        >
            <AppAside :is-collapse="isCollapse"/>
        </el-aside>
        <el-container>

            <el-header
                    height="50px"
                    class="header">
                <AppHeader />
            </el-header>
            <el-main
                    class="main">
                <router-view/>
            </el-main>

        </el-container>
    </el-container>

</template>

<script>

import AppHeader from "@/view/layout/components/header";
import AppAside  from '@/view/admin/layout/components/aside'
export default {
    name: "AdminLayoutIndex",
    components: {AppHeader, AppAside},
    data(){
    return {
        isCollapse: false
    }
    },
    methods:{

    }
}
</script>

<style scoped lang="less">
    .layout-container {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
    .aside {

        background-color: steelblue;


    }
    .header {
        background-color: aliceblue;

    }
    .main {
        background-color: azure;
    }
</style>