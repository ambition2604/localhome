<template>
  <div class="container" >
      <h1>Course</h1>
      <div class="addcourse-form">
			<form>
				<input type="text" name="name_course" v-model="input.title" placeholder="NameCourse" required>
				<input type="text" name="des_course" v-model="input.des" placeholder="Description" required>
        <select id="cars" v-model="selected">
        <option v-for="(shop,index) in shops"
        v-bind:item="shop"
        v-bind:index="index"
        v-bind:value="shop.id"
        v-bind:key="shop._id" >{{shop.name}}</option>
        
        </select>
        <hr>
				<button type="button" v-on:click="add()">Add Course</button>
			</form>
      <span>Selected: {{ selected }}</span>
		</div>
      <hr>
      <p class="error" v-if="error">{{ error }}</p>
      <div class="posts-container">
        <div class="post"
        v-for="(post,index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id">

        <p class="text">{{ post.title }}</p>
        <p class="text">Description : {{ post.des }}</p>
        <p class="text">Created date: {{post.createDate}}</p>
        <p class="text">Status: {{post.status}}</p>
        
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
      posts: [],
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
      this.posts = await CourseService.getCourses();
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
            var response = await CourseService.addCourse(this.input.title,this.input.des,this.selected,host_id);
            console.log(response);
        } catch (err) {
            this.error = err.message;
        }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}
p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding:  10px;
  margin-bottom: 15px;
}
div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color:  #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}
div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}
p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
.addcourse-form {
			width: 300px;
			margin: 0 auto;
			font-family: Tahoma, Geneva, sans-serif;
		}
		.addcourse-form h1 {
			text-align: center;
			color: #4d4d4d;
			font-size: 24px;
			padding: 20px 0 20px 0;
		}
		.addcourse-form input[type="text"] {
			width: 100%;
			padding: 15px;
			border: 1px solid #dddddd;
			margin-bottom: 15px;
			box-sizing:border-box;
		}
		.addcourse-form input[type="submit"] {
			width: 100%;
			padding: 15px;
			background-color: #535b63;
			border: 0;
			box-sizing: border-box;
			cursor: pointer;
			font-weight: bold;
			color: #ffffff;
		}
</style>