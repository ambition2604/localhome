<template>
  
    <div class="row">
        <div class="col-12 col-md-6 col-xl-4 menu"
        v-for="(menu,index) in menus"
        v-bind:item="menu"
        v-bind:index="index"
        v-bind:key="menu._id">
        <div class="active">
        <h5  class="text" v-on:click="menuSelected(menu.id)" >{{ menu.name }}</h5>
        </div>
        </div>
        <div class="col-12 col-md-6 col-xl-4 item"
        v-for="(item,index) in items"
        v-bind:item="item"
        v-bind:index="index"
        v-bind:key="item.quantity">
        <div >
          <img class="img" src="https://cdn.tgdd.vn/Files/2020/05/16/1255894/cach-lam-com-lam-thom-ngon-deo-ngot-don-gian-chuan-vi-tay-bac.jpg" width="60%" height="60%" alt="">
        <h5 style="font-family: Comic Sans MS;"><strong>{{ item.name }}</strong></h5>
        <h5 style="font-family: Comic Sans MS;">Price: {{ item.price }} VND</h5>
         <b-input-group class="button">
      <b-input-group-prepend>
    <b-btn variant="outline-info" @click="decrement(item)">-</b-btn>
  </b-input-group-prepend>

  <b-form-input type="number" v-model.lazy="item.quantity" min="0"  ></b-form-input>

  <b-input-group-append>
    <b-btn variant="outline-secondary"  @click="increment(item)">+</b-btn>
  </b-input-group-append>
</b-input-group>

        </div>
        </div>
      </div>
      
</template>
<script>
import MenuService from '../service/MenuService'
import ItemService from '../service/ItemService'
export default {
  
    data() {
        return {
           title: localStorage.getItem('title_course'),
           id:  localStorage.getItem('shop_id'),
           menus:[],
           items:[],
           count:localStorage.getItem('count'),
           total:localStorage.getItem('total'),
           c:JSON.parse(localStorage.getItem('items')),
          
        }
    },
    async created() {
        this.menus = await MenuService.getMenubyID(this.id);
        let k = JSON.parse(localStorage.getItem('items'));
        
        if(k[0].id == 0){
          if(localStorage.getItem('items') != 0 ) {
              var i = JSON.parse(localStorage.getItem('items'));
          }
          if(i != null){
              console.log(localStorage.getItem('course_id'));
              this.items = await ItemService.findItembyMenu(this.menus[0].id,i,localStorage.getItem('course_id'));
            }
          else{
              this.items = await ItemService.findItembyMenus(this.menus[0].id,localStorage.getItem('course_id'));
              console.log(localStorage.getItem('course_id'));
          } 
          
        }
        else{
          let i = JSON.parse(localStorage.getItem('items'));
          if(i !== null){
              this.items = await ItemService.findItembyMenu(localStorage.getItem('m_id'),i,localStorage.getItem('course_id'));
              console.log(localStorage.getItem('course_id'));
            }
          else{
              this.items = await ItemService.findItembyMenus(this.menus[0].id,localStorage.getItem('course_id'));
              console.log(localStorage.getItem('course_id'));
          } 
        
          
        }
        
    },
    methods: {
      async menuSelected(id){
          localStorage.setItem('m_id',id);
          let c = JSON.parse(localStorage.getItem('items'));
          this.items = await ItemService.findItembyMenu(id,c,localStorage.getItem('course_id'));  
      },
      async increment(item) {
        item.host_name = localStorage.getItem('host_name');
        if(item.course_id ==localStorage.getItem('course_id')){
          item.quantity ++;
        }
        this.count ++;
        this.total = this.count * item.price;
        localStorage.setItem('count',this.count);
        localStorage.setItem('total',this.total);
        var check = 0;
        this.c.forEach(element => {
          if(element.id == item.id && element.course_id == localStorage.getItem('course_id')) check = 1; 
        });
        if(check == 0){
        this.c.push(item);
        }
        else{
          this.c.forEach(element => {
            if(element.id == item.id && element.course_id == localStorage.getItem('course_id')) element.quantity = item.quantity;
          });
        }
        localStorage.setItem('items',JSON.stringify(this.c));
      },
      
      async decrement(item  ) {
        if(item.quantity== 0 || item.quantity==null ) item.quantity== 0
        else{
        if(item.course_id ==localStorage.getItem('course_id')){
          item.quantity --;
        }
        this.count --;
        this.total = this.count * item.price;
        localStorage.setItem('count',this.count);
        localStorage.setItem('total',this.total);
        var check = 0;
        this.c.forEach(element => {
        if(element.id == item.id && element.course_id == localStorage.getItem('course_id')) check = 1; 
        });
        if(check == 0 && item.quantity>0 ){
          this.c.push(item);
        }
        else{
          this.c.forEach(element => {
            if(element.id == item.id && element.course_id == localStorage.getItem('course_id')) {
                element.quantity = item.quantity;
                if(element.quantity==0){
                    var index = this.c.indexOf(element);
                    this.c.splice(index,1);
                }
            }
          });
        }
        }
        localStorage.setItem('items',JSON.stringify(this.c));
      }
    },
}
</script>
<style scoped>
  .menu{
    padding-right: 1px;
    padding-left: 1px;
    margin-bottom: 0px;
    text-align: center;
    box-sizing: border-box;
  }
  .text{
    
    background-color: skyblue;
    padding-top: 8px;
    padding-bottom: 8px;
    font-family: Comic Sans MS;
    text-align: center;
  }
  .img{
    padding-bottom: 2px;
  }
  .item{
    padding-left: 100px;
    padding-bottom: 30px;
    padding-top: 30px;
  }
  .button{
    padding-right: 200px;
  }
  .active{
  color: white;
}
</style>