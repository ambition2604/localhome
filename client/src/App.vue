<template>
  <div class="container-fluids" id="app">
    <div class=" bg-container">
      <div><img src="./static/bgfood.jpg" alt="noimage"></div>
    </div>
    <div style="margin-bottom: 10px;">
    <nav class="navbar navbar-dark bg-warning" style="font-family: Comic Sans MS">
      <router-link class="navbar-brand" to="/home">Home</router-link> 
      <router-link class="navbar-brand" to="/">Course</router-link> 
      <router-link class="navbar-brand" to="/about">About</router-link> 
      <p v-on:click="logout()"><router-link class="navbar-brand" to="/login" >Logout</router-link></p>
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
  methods: {
      logout () {
      console.log('logout')
      localStorage.setItem('token','None')
      
  }
}
}
</script>