import axios from 'axios';

const url ='http://localhost:3000/api/course';
const url1 ='http://localhost:3000/api/course/add';
class CourseService{
    //Get course
    static async getCourses(host_id){
        var res = await axios.post(url,{
            "host_id":host_id
        });
        if (res)  return res.data;
    }

    //Create course
    static addCourse(title,des,shop_id,host_id)   {
        return axios.post(url1,{
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