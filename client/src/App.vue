<template>
  <div class="container-fluids" id="app">
    <div class=" bg-container">
      <div><img src="./static/food1.jpeg" alt="noimage" width="500px" height="300px"></div>
    </div>
    <div style="margin-bottom: 0.5px;" class="routing" v-if="this.$route.path !== '/login'">
    <nav class="navbar navbar-dark bg-warning navv" style="font-family: Comic Sans MS;padding-left:150px">
      <router-link class="navbar-brand" to="/">Home</router-link> 
      <router-link class="navbar-brand" to="/course">Course</router-link> 
      <router-link class="navbar-brand" to="/order">Order</router-link> 
      <div v-on:click= "logout()"><router-link class="navbar-brand" to="/login" ><b-icon icon="person-fill"></b-icon>Hi,Linh</router-link></div>
      <router-link class="navbar-brand" to="/bag"><b-button variant="info"><b-icon icon="cart2"></b-icon>{{count}}</b-button></router-link>
    </nav>
    </div>
    <router-view></router-view>
  </div>
  
</template>
<style> 
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body {
  font-size: .875rem;
  font-weight: 400;
  line-height: 1.5;
  /* background-color: #e4e5e6; */
  background-color: white;
}
.app-container {
  margin-top: 53px;
}
@media screen and (max-width: 991px){
  .nhome-container {
    margin: 5px;
    padding-top: 30px;
  }
}
@media screen and (min-width: 992px){
  .nhome-container {
    margin: 30px;
    padding-top: 30px;
  }
}
.bg-container img {
  width: 100%;
  height: 100%;
  position: fixed;
  opacity: 0.2;
  z-index: -1;
}
.btn-quantity-container {
  margin-top: 5px;
}
.btn-quantity {
  color: orange;
  border-radius: 100%;
  border: 1px solid orange;
  background-color: #ffffff;
  padding: 1px 6px !important;
  font-size: 1em;
}
@media screen and (max-width: 991px) {
  .bg-img-desktop {
    display: none
  }
}
@media screen and (min-width: 992px) {
  .bg-img-mobile {
    display: none
  }
}
</style>
<script>
export default {
  data() {
    
    return {
      count : localStorage.getItem('count')
    }
  },
  methods: {
      logout () {
      console.log('logout')
      localStorage.setItem('token','None');
      var i = {"id":0,"name":"0","image":"0","price":0,"menu_id":0,"quantity":0};
      var c =[];
      c.push(i);
      localStorage.setItem('items',JSON.stringify(c));
      localStorage.setItem('total',0);
      localStorage.setItem('count',0);
      this.$router.replace({ name: "Login" });
  }
}
}
</script>