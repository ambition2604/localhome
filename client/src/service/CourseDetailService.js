import axios from 'axios';

const url ='http://localhost:3000/api/course_detail/get_user';
const url1 ='http://localhost:3000/api/course_detail/get_list_order';
const url2 ='http://localhost:3000/api/course_detail/updatestatus'; 
const url3 ='http://localhost:3000/api/course_detail/list_details'; 
const url4 ='http://localhost:3000/api/course_detail/leteat'; 


class CourseDetailService{

    static async getUser(course_id){
        var res = await axios.post(url,{
            "course_id":course_id
        });
         
        if (res)  return res.data;
    }
    static async getListOrder(course_id,user_id){
        var res = await axios.post(url1,{
            "course_id":course_id,
            "user_id": user_id
        });
         
        if (res)  return res.data;
    }
    static async updateStatus(order_id){
        var res = await axios.post(url2,{
            "order_id":order_id
        });
         
        if (res)  return res.data;
    }
    static async getListDetail(order_id){
        var res = await axios.post(url3,{
            "order_id":order_id
        });
         
        if (res)  return res.data;
    }
    static async letEat(course_id){
        var res = await axios.post(url4,{
            "course_id":course_id
        });
         
        if (res)  return res.data;
    }

}

export default CourseDetailService;