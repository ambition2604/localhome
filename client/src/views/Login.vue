<template>
<body class="bg-login">
  <div class="login-form">
    <h3>Đăng nhập</h3>
    <br>
    <form >
      <div class="form-group">
        <label>Tên tài khoản</label>
        <input name="username" v-model="input.username" type="text" class="form-control"  required/>
      </div>
      <div class="form-group">
        <label>Mật khẩu</label>
        <input name="password" type="password" v-model="input.password" class="form-control"  required/>
      </div>
      <br>
      <div class="form-group">
        <button type="button" v-on:click="login()" class="btn btn-primary btn-block">Đăng nhập</button>
      </div>
    </form>
  </div>
</body>
</template>
<style>
	.bg-login {
    position: relative;
    width: 100%;
	margin-left: 35%;
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
</style>
<script>
import AuthenticationService from '../service/AuthenticationService'
export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            async login () {
               try {
                 var response = await AuthenticationService.check(this.input.username,this.input.password  )
                  if(response){
					localStorage.setItem('username',this.input.username)
                    localStorage.setItem('token',response)
                    this.$router.replace({ name: "Course" });
                  }     
               } catch (err) {
                    this.error = err.message;
               }
               
            }
        }
    }
</script>