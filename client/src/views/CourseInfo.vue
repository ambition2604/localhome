<template>
    <div>{{ this.title }} </div>
</template>
<script>
export default {
    components:{

    },
    data() {
        return {
           title:''
        }
    },
    created() {
         this.title =  this.$route.params.title;
    },
}
</script>
<style scoped>
    
</style>