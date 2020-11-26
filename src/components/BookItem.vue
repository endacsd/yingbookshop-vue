<template>
    <div>
        <span>
            {{name}}
        </span>

    </div>
</template>

<script>
export default {
    name: "BookItem",
    data (){
        return{
            bookId : 0,
            name : '',
            author : '',
            QTY : 0,
            price : 0,
            publisher : ''
        }
    }
}
</script>

<style scoped>

</style>