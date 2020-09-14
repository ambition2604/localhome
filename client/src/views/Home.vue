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
        <h5 class="text"><strong>Created Date:</strong> {{course.createDate}}</h5>
        <hr>
        <h5><button class="btn btn-success btn-lg btn-block">Join</button></h5>
        
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
      var user = JSON.stringify(await UserService.findUsers(localStorage.getItem('username')));
      var u = await UserService.findUsers(localStorage.getItem('username'));
      var x = user.toString(); 
      var start = x.indexOf(':')+1;
      var end =   x.indexOf(',"username');
      u.forEach(function (element) {
          element.Active = start;
          console.log(element.id.valueOf());
      });
      var host_id = user.substring(start,end);
      var c = await CourseService.getCourses(host_id);
      this.shops = await ShopService.getShop();
      c.forEach(async (element) => {
      var n = await ShopService.getShopbyID(element.shop_id.valueOf());
        element.shop = await n[0].name.valueOf();
        element.phone = await n[0].phone.valueOf();
      });
      this.courses =await c;
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
  async viewCourseDetail(item) {
    var t = item.toString();
    console.log(t);
    var g = await ShopService.getShopbyID(item);
    g = JSON.stringify(g);
    g = g.toString();
    var l = g.split('{"name":"',);
    console.log(l);
     var n = JSON.stringify(await UserService.findUsers(localStorage.getItem('username')));
     console.log(n);
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