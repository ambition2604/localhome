import axios from 'axios';


const url ='http://localhost:3000/api/login';

 class AuthenticationService{
    static async check(name,pass){
        var res = await axios.post(url,{
            "username" : name,
            "password" : pass
        });
        if (res)  return res.data;
    }
 }
export default AuthenticationService;