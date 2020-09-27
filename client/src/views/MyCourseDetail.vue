<template>
  <div style="text-align:center">
    <h1 style="text-align:center">This is an course detail page</h1>
    <h2><button v-b-modal.modal-8>Let eat</button></h2>
    <b-modal id="modal-8" hide-footer="true" title="Let eat" size="xl">
    <div>
       <div v-for="(info,index) in infos"
        v-bind:item="info"
        v-bind:index="index"
        v-bind:key="info._id">
        
        <h3 style="text-align:center"> {{info.name}}  </h3>
        <h3 style="text-align:center"> {{info.phone}}</h3>
        <hr>
    </div>
    <div style="text-align:center" v-for="(leteat,index) in leteats"
        v-bind:item="leteat"
        v-bind:index="index"
        v-bind:key="leteat._id">
        
        <h4>{{leteat.name}}</h4>
        <h4>Quantity: {{leteat.quantity}}</h4>
        <h4>Total: {{leteat.total}}</h4>
        <hr>
    </div>
		</div>
  </b-modal>
    
    <hr>
    <div v-for="(user,index) in users"
        v-bind:item="user"
        v-bind:index="index"
        v-bind:key="user.user_id">
        
        <h3 >Order by:  {{user.username}}  <button v-b-modal.modal-4 v-on:click=" listOrder(user.user_id)" >Xem</button></h3>
        <hr>
    </div>
    <b-modal id="modal-4" hide-footer="true" title="List" size="xl">
    <div>
        <div v-for="(list,index) in lists"
        v-bind:item="list"
        v-bind:index="index"
        v-bind:key="list._id">
        
        <h3>CreateDate: {{list.createDate}}</h3>
        <select  @change="onChange(list.id,list.status)">
            <option>{{list.status}}</option>
            <option v-if="list.status == 'Unpaid'">Paid</option>
            <option v-if="list.status == 'Paid'">Unpaid</option>
          </select>
        <h3>Total: {{list.total}}</h3>
        <button v-b-modal.modal-5 v-on:click=" listDetail(list.id)" >Chi tiết</button>
        <hr>
    </div>
    <b-modal id="modal-5" hide-footer="true" title="Detail" size="xl">
    <div>
        <div v-for="(detail,index) in details"
        v-bind:item="detail"
        v-bind:index="index"
        v-bind:key="detail._id">
        
        <h3>{{detail.name}} : Price : {{detail.price}} Quantity: {{detail.quantity}}  Total : {{detail.total}} </h3>
        <hr>
    </div>		
		</div>
  </b-modal>
		</div>
  </b-modal>
  </div>
</template>
<script>
import CourseDetailService from '../service/CourseDetailService'
import CourseService from '../service/CourseService'

export default {
  data() {
    return {
      users:[],
      course_id: localStorage.getItem('c_id'),
      lists:[],
      details:[],
      infos:[],
      leteats:[]
    }
  },
   async created() {
    this.users = await CourseDetailService.getUser(this.course_id);
    this.infos = await CourseService.getInfo(this.course_id);
    this.leteats = await CourseDetailService.letEat(this.course_id);
  
  },
  methods: {
    async listOrder(id){
      this.lists = await CourseDetailService.getListOrder(this.course_id,id);
    },
    async onChange(order_id,status){
      this.$confirm("Are you sure?").then(() => {
      CourseDetailService.updateStatus(order_id,status);
      });
    },
    async listDetail(order_id){
        this.details = await CourseDetailService.getListDetail(order_id);
    }
  },
}
</script>