<template>
    <div class="settings-container">

        <div> 头像 </div>


        <div> 充值</div>

    </div>


</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                input1: '',
                input2: '',
                input3: '',
                input4: ''
            }
        },
        methods: {
            open() {
                this.$alert('这是一段内容', '标题名称', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message({
                            type: 'info',
                            message: `action: ${ action }`
                        });
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>