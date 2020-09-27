<template>
  <div class="container" style="font-family: Comic Sans MS">
  <div>
  <b-button v-b-modal.modal-1><b-icon icon="plus-square" ></b-icon></b-button>
  <b-modal id="modal-1" :hide-footer="true" title="Add Course" >
    <div>
			<form class="form-group" style="font-family: Comic Sans MS">
        <label>Title</label><hr>
				<input type="text" name="name_course" v-model="input.title" class="form-control" required>
        <label>Description</label><hr>
				<input type="text" name="des_course" v-model="input.des" class="form-control" required><hr>
        <label>Shop</label><hr>
        <select id="cars" class="form-control" v-model="selected" >
        <option v-for="(shop,index) in shops"
          v-bind:item="shop"
          v-bind:index="index"
          v-bind:value="shop.id"
          v-bind:key="shop._id" >{{shop.name}}</option>
        </select>
        <hr>
				<button type="button" class="btn btn-primary" v-on:click="add()">Create</button>
			</form>
		</div>
  </b-modal>
  </div>
      <h1 style="text-align:center">My Courses</h1>
      <hr>
      <div class="row">
        <div class="col-12 col-md-6 col-xl-4 nhome-course"
        v-for="(course,index) in courses"
        v-bind:item="course"
        v-bind:index="index"
        v-bind:key="course._id">
        
        <div class="rounded border border-light shadow nhome-each-course" >
        <h4 class="text-center" style="font-weight:bold">{{ course.title }}</h4>
        <hr>
        <h5 v class="text"><strong>Shop :</strong>  {{ course.name }}</h5>
        <h5 class="text"><strong>Phone :</strong>  {{ course.phone }}</h5>
        <h5 class="text"><strong>Created Date:</strong> 17 Sep 2020, 17:18</h5>
        <hr>
        <h5 class="text">
         <select  @change="onChange(course.id,course.status)">
            <option>{{course.status}}</option>
            <option v-if="course.status == 'Opening'">Closing</option>
            <option v-if="course.status == 'Closing'">Opening</option>
          </select>

          <button style="margin-left:80px" class="btn btn-info" v-on:click="viewCourseDetail(course)">Details</button>
          </h5>
        
        </div>
        </div>
      </div>
  </div>
</template>

<script>
import CourseService from '../service/CourseService'
import ShopService from '../service/ShopService'
import UserService from '../service/UserService'
export default {
  name: 'MyCourse',
  data() {
    return {
      courses: [],
      c:[],
      error: '',
      text: '',
      shops: [],
      selected: '',
      selected_status:'', 
      input: {
                    title: "",
                    des: "",
                    shop_name:""
                }
    } 
  },
  async created() {
    try {
      var user = JSON.stringify(await UserService.findUsers(localStorage.getItem('username')));
      var x = user.toString(); 
      var start = x.indexOf(':')+1;
      var end =   x.indexOf(',"username');
  
      var host_id = user.substring(start,end);
      this.courses = await CourseService.getCoursesbyId(host_id);
      this.shops = await ShopService.getShop(); 
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async add () {
        var user = JSON.stringify(await UserService.findUsers(localStorage.getItem('username')));
        var x = user.toString(); 
        var start = x.indexOf(':')+1;
        var end =   x.indexOf(',"username');
        var host_id = user.substring(start,end);
        try { 
            await CourseService.addCourse(this.input.title,this.input.des,this.selected,host_id);
            location.reload();  
        } catch (err) {
            this.error = err.message;
        }
    },
  async viewCourseDetail(item) {
        localStorage.setItem('c_id',item.id);
       this.$router.push({ name: "CourseDetail",params: { u: item }});
  },
  async update_status(status){
    alert(status);
  },
  async onChange(course_id,course_status){
    

    this.$confirm("Are you sure?").then(() => {
      CourseService.updateStatus(course_id,course_status);
});

  },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#course{
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    font-family: Avenir,Helvetica,Arial,sans-serif;
    font-size: .875rem;
    font-weight: 400;
    line-height: 1.5;
}
.bg-login {
    position: relative;
    width: 100%;
	margin-left: 40%;
    min-height: auto;
    background-position: right 0px top 0px;
    -webkit-background-size: cover;
    -moz-background-size: cover;
     background-size: cover;
    -o-background-size: cover;
  }
  .login-form {
    border: 1px solid #DDD;
    max-width: 400px;
    padding: 20px;
    margin: 100 auto 0 auto;
  }
  .nhome-course {
  padding: 10px;
}
.nhome-each-course {
  width: 100%;
  /* height: 50px; */
  padding: 10px;
}
.nhome-btn {
  min-width: 50px;
  min-height: 50px;
  max-width: 100px;
  max-height: 100px;
}
.nhome-btn button {
  width: 100%;
  height: 100%;
}
.nhome-course-container {
  margin-top: 20px;
}
.nhome-course-body {
  margin-top: 20px;
}
.course-btn {
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
  border: 1px solid transparent;
  padding: 5px 10px;
  width: 80%;
}
.course-select {
  display: block;
  width: 100%;
  padding: 0.375rem 0.5rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}
.form-group p {
  color: red;
}
.img {
  width: 100%;
  height: 100%;
  position: fixed;
  opacity: 0.2;
  z-index: -1;
}
</style>