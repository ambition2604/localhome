import axios from 'axios';

const url ='http://localhost:3000/api/course/';
const url1 ='http://localhost:3000/api/course/id';
const url2 ='http://localhost:3000/api/course/add';
class CourseService{
    //Get course
    static async getCoursesbyId(host_id){
        var res = await axios.post(url1,{
            "host_id":host_id
        });
        if (res)  return res.data;
    }
    static async getCourses(){
        var res = await axios.post(url);
        if (res)  return res.data;
    }
    //Create course
    static addCourse(title,des,shop_id,host_id)   {
        return axios.post(url2,{
            "title":title,
            "des":des,
            "shop_id":shop_id,
            "host_id":host_id
        });
    }
    //Delete course
    static deleteCourse(id) {
        return axios.delete(`${url}${id}`);
    }
}
export default CourseService;