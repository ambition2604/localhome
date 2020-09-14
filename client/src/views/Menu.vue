<template>

    <div class="row">
        <div class="col-12 col-md-6 col-xl-4 nhome-course"
        v-for="(menu,index) in menus"
        v-bind:item="menu"
        v-bind:index="index"
        v-bind:key="menu._id">
        <div >
        <h5 v class="text" style="text-align:center">{{ menu.name }}</h5>
        </div>
        </div>
      </div>
      
</template>
<script>
import MenuService from '../service/MenuService'

export default {
    components:{

    },
    data() {
        return {
           title:'',
           id: null,
           menus:[],
           n:[],
        }
    },
    async created() {
        this.title =  localStorage.getItem('title_course');
        this.id =  localStorage.getItem('shop_id');
        this.menus = await MenuService.getMenubyID(this.id);
        this.menus.forEach(async (element) => {
             this.n[element.name] = JSON.stringify(element);
        });
        console.log(this.n);
    },
    methods: {
        
    },
}
</script>
<style scoped>
    
</style>