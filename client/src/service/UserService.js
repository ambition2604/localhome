import axios from 'axios';

const url ='http://localhost:3000/api/user';
class UserService{
    //Get course
    static async getUsers(){
        var res = await axios.get(url);
        if (res)  return res.data;
    }
    static async findUsers(username){
        var res = await axios.post(url,{
            "username" : username
        });
        if (res)  return res.data;
    }

}
export default UserService;