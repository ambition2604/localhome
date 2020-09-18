<template>
  <div class="container" style="font-family: Comic Sans MS">
      <h1 style="text-align:center">Opening Courses</h1>
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
        <h5 class="text"><strong>Host :</strong>  {{ course.username }}</h5>
        <hr>
        <h5><button class="btn btn-success btn-lg btn-block" v-on:click="viewMenu(course.title,course.shop_id,course.id,course.username)">Join</button></h5>
        
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
      error: '',
      text: '',
      shops: [],
      selected: '', 
      input: {
                    title: "",
                    des: "",
                    shop_name:""
                }
    } 
  },
  async created() {
    try {
      this.courses = await CourseService.getCourses();
      this.shops = await ShopService.getShop();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async add () {
        var user = JSON.stringify(await UserService.findUsers(localStorage.getItem('username')));
        user = user.toString();
        var host_id = user.substring(7,8);
        try { 
            await CourseService.addCourse(this.input.title,this.input.des,this.selected,host_id);
            location.reload();  
        } catch (err) {
            this.error = err.message;
        }
    },
  async viewMenu(item,item1,item2,item3) {
    localStorage.setItem('title_course',item);
    localStorage.setItem('shop_id',item1);
    localStorage.setItem('course_id',item2);
    localStorage.setItem('host_name',item3);
    this.$router.push({ name: 'Menu'});
  }
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