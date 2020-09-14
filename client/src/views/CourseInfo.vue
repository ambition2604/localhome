<template>
    <div>{{ id }} {{ title }}</div>
</template>
<script>
export default {
    components:{

    },
    data() {
        return {
           id: null,
           title:''
        }
    },
    created() {
        this.id =  this.$route.params.id;
        this.title =  this.$route.params.title;
    },
}
</script>
<style scoped>
    
</style>