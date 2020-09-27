<template>
<div>
<div class="container" v-if="items.length >1">
    <h1 style='text-align:center;font-family: Comic Sans MS;'>Bag</h1> 
    <br>
<div class="row">
    <div
        v-for="(item,index) in items"
        v-bind:item="item"
        v-bind:index="index"
        v-bind:key="item._id"  class="col-8">
        <div>
            <div style="font-family: Comic Sans MS;" class="row">
                    <div class="col-2" v-if="item.id != 0">
                        <img class="img" src="https://cdn.tgdd.vn/Files/2020/05/16/1255894/cach-lam-com-lam-thom-ngon-deo-ngot-don-gian-chuan-vi-tay-bac.jpg" width="80%" height="80%" alt="">
                    </div>
                    <div class="col-4">   
                    <div class="row" v-if="item.id != 0">Course :{{ item.course_id }}</div>
                    <div class="row" v-if="item.name != 0">Name :{{ item.name }}</div>
                    <div class="row" v-if="item.name != 0">Host :{{ item.host_name }}</div>
                    <button class="btn btn-danger" v-if="item.id != 0"  @click="delete_item(item)">Delete</button>
                    <button class="btn btn-success" v-if="item.id != 0"  @click="view_course()" style="margin-left:5px">Menu</button>
                    </div>
                     <div class="col-2">
                        <div class="row" v-if="item.id != 0">Price: {{ item.price }}</div>
                     </div>
                    <div v-if="item.id != 0">
                    <button v-if="item.id != 0"  @click="decrement(item)">-</button>{{item.quantity}}
                    <button v-if="item.id != 0"  @click="increment(item)">+</button>
                    </div>
                    
            </div>
            <hr>
        </div>

    </div>

    <div  class="col-4 position" style="font-family: Comic Sans MS;">
    <h3>Count : {{count}}</h3> 
    <h3>Total : {{total}} VND</h3>
    <button  class="btn btn-info" style="width:80%;height:50%;font-size:20px;" v-on:click="checkout()">Checkout</button>
    </div>
    
</div >
</div> 
<div v-if="items.length <= 1" style='text-align:center;font-family: Comic Sans MS;'>
    <br>
    <h2>Không xem chùa,nhanh chóng trở lại đặt món.</h2>
    <hr>
    <button v-on:click="goHome()" style="width:30%;height:100%;font-size:30px;" class="btn btn-primary"> Hải, quay xe =)))</button>   
</div>  
</div>  
</template>
<script>
import OrderService from '../service/OrderService'
import UserService from '../service/UserService'

    export default {
        data() {
            return {
                items: JSON.parse(localStorage.getItem('items')),
                count:localStorage.getItem('count'),
                total:localStorage.getItem('total'),
            }
        },
       methods: {
           goHome(){
                this.$router.replace({ name: "Home" });
           },
           async delete_item(item){
                let items = JSON.parse(localStorage.getItem('items'));
                items.forEach(element => {
                   if(element.id == item.id && element.course_id == item.course_id){
                       localStorage.setItem('count',localStorage.getItem('count')-item.quantity);
                       this.count = Number(this.count) - item.quantity;
                       localStorage.setItem('total',localStorage.getItem('total')-item.quantity*item.price);
                       this.total = Number(this.total) - item.quantity*item.price;
                       items.forEach(element => {
                           if(element.id == item.id && element.course_id == item.course_id) {
                                    var index = items.indexOf(element);
                                    items.splice(index,1)
                            }
                       });
                   }
               });
               this.items = items;
               localStorage.setItem('items',JSON.stringify(items));
           },
           async increment(item){
                let items = JSON.parse(localStorage.getItem('items'));
                items.forEach(element => {
                    if(element.id == item.id && element.course_id == item.course_id){
                        this.count = Number(this.count) + 1;
                        localStorage.setItem('count', this.count);
                        this.total = Number(this.total) + item.price;
                        localStorage.setItem('total',this.total);
                        item.quantity += 1;
                        item.total +=  item.price;
                        this.items.forEach(element => {
                            if(element.id == item.id && element.course_id == item.course_id) element.quantity = item.quantity;
                        });
                        localStorage.setItem('items',JSON.stringify( this.items));
                    }
                });
                localStorage.setItem('items',JSON.stringify( this.items));
           },
           async decrement(item){
                let items = JSON.parse(localStorage.getItem('items'));
                items.forEach(element => {
                    if(element.id == item.id && element.course_id == item.course_id){
                        this.count = Number(this.count) - 1;
                        localStorage.setItem('count',this.count);
                        this.total = Number(this.total) - item.price;
                        localStorage.setItem('total',this.total);
                        item.quantity -= 1;
                        item.total -=  item.price;
                        this.items.forEach(element => {
                            if(element.id == item.id && element.course_id == item.course_id){ element.quantity = item.quantity;
                            if(item.quantity == 0) {
                                var index = this.items.indexOf(element);
                                this.items.splice(index,1);
                            }
                            }
                        });
                        localStorage.setItem('items',JSON.stringify(this.items));
                    }
                    localStorage.setItem('items',JSON.stringify(this.items));
                });
           },
           async view_course(){
               this.$router.push({ name: 'Menu'});
           },
           async checkout(){
                var list = this.items;
                var list_courses =[]
                list.forEach(element => {
                    if(element.id!=0)list_courses.push(element.course_id);
                });
                function onlyUnique(value, index, self) {
                    return self.indexOf(value) === index;
                }
                list_courses = list_courses.filter(onlyUnique);
                var user = JSON.stringify(await UserService.findUsers(localStorage.getItem('username')));
                var x = user.toString(); 
                var start = x.indexOf(':')+1;
                var end =   x.indexOf(',"username');
                this.host_id = user.substring(start,end);

                
                for (let i = 0; i < list_courses.length; i++) {
                   await OrderService.addOrder(this.host_id,list_courses[i]);
                }
               
                for (let i = 0; i < list_courses.length; i++) {
                    for (let j = 0; j < list.length; j++) {  
                         var maxs = await OrderService.getMaxID(this.host_id,list_courses[i]);
                        if(list_courses[i]== list[j].course_id)
                        await OrderService.addDetail(maxs[0].id,list[j].id,list[j].quantity,(list[j].quantity*list[j].price));
                    }
                    
                }


               
               

                




                var i = {"id":0,"name":"0","image":"0","price":0,"menu_id":0,"quantity":0};
                var c =[];
                c.push(i);
                localStorage.setItem('items',JSON.stringify(c));
                localStorage.setItem('total',0);
                localStorage.setItem('count',0);
                this.items = c;

           }
       },
    
    }
</script>
 
<style>
.position{
      position: absolute;
      top: -100px;
    
      left: 50px;
   

 }
</style>