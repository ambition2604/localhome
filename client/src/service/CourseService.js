import axios from 'axios';

const url ='http://localhost:3000/api/course';

class CourseService{
    //Get course
    static async getCourses(){
        var res = await axios.get(url);
        if (res)  return res.data;
    }

    //Create course
    static addCourse(title,des,shop_id,host_id)   {
        return axios.post(url,{
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