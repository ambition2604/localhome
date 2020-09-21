<template>
<div style="text-align:center;font-family: Comic Sans MS;">
    <h1>Order</h1>
    <hr>
    <div v-for="(order,index) in orders"
        v-bind:item="order"
        v-bind:index="index"
        v-bind:key="order.course_id">
        
        <h3 >Course:  {{order.title}} Status : {{order.status}} : {{order.username}}  <button v-b-modal.modal-2 v-on:click=" listorder(order.course_id)">Xem</button></h3>
        <hr>
    </div>
    <b-modal id="modal-2" hide-footer="true" title="List" size="xl">
    <div>
        <div v-for="(list,index) in list_order"
        v-bind:item="list"
        v-bind:index="index"
        v-bind:key="list._id">
        <h3>CreateDate: {{list.createDate}} Total: {{list.total}}    <button v-b-modal.modal-3 v-on:click="details(list.id)">Chi tiết</button></h3>
        <hr>
    </div>	
	</div>
    <b-modal id="modal-3" hide-footer="true" title="List" size="xl">
    <div>
        <div v-for="(order_detail,index) in order_details"
        v-bind:item="order_detail"
        v-bind:index="index"
        v-bind:key="order_detail._id">
        
        <h3>{{order_detail.name}} : Price : {{order_detail.price}} Quantity: {{order_detail.quantity}}  Total : {{order_detail.total}} </h3>
        <hr>
    </div>	
		</div>
  </b-modal>
  </b-modal>
</div>    
</template>
<script>
import UserService from '../service/UserService'
import OrderService from '../service/OrderService'
    export default {
        data() {
            return {
                 orders: [],
                 list_order:[],
                 host_id:null,
                 total: 0,
                 order_details:[]
            }
        },
        async created() {
            var user = JSON.stringify(await UserService.findUsers(localStorage.getItem('username')));
            var x = user.toString(); 
            var start = x.indexOf(':')+1;
            var end =   x.indexOf(',"username');

            this.host_id = user.substring(start,end);
            this.orders = await OrderService.getOrder(this.host_id);
            this.order_details = await OrderService.getOrderDetails();
            console.log(this.order_details);    
        },
        methods: {
          async  listorder(course_id){
                this.list_order = await OrderService.getOrderList(this.host_id,course_id);
               
         },
         async details(id){
                console.log(id);
                this.order_details = await OrderService.getOrderDetails(1);
         }
        },
    }
</script>