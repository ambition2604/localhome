import axios from 'axios';

const url3 ='http://localhost:3000/api/order';
const url4 ='http://localhost:3000/api/order/list';
const url5 ='http://localhost:3000/api/order/getdetail';
const url6 ='http://localhost:3000/api/order/add';
const url7 ='http://localhost:3000/api/order/getmaxid';
const url8 ='http://localhost:3000/api/order/detail';
class OrderService{
    //Get course
    static async getOrder(user_id){
        var res = await axios.post(url3,{
            "user_id":user_id
        });
        
        if (res)  return res.data;
    }
    static async getOrderList(user_id,course_id){
        var res = await axios.post(url4,{
            "user_id":user_id,
            "course_id":course_id
        });
        
        if (res)  return res.data;
    }
    static async getOrderDetails(order_id){
        var res = await axios.post(url5,{
            "order_id":order_id
        });
        
        if (res)  return res.data;
    }
    static async addOrder(user_id,course_id){
        var res = await axios.post(url6,{
            "user_id":user_id,
            "course_id":course_id
        });
        
        if (res)  return res.data;
    }
    static async addDetail(order_id,item_id,quantity,total){
        var res = await axios.post(url8,{
            "order_id":order_id,
            "item_id":item_id,
            "quantity":quantity,
            "total":total
        });
        
        if (res)  return res.data;
    }
    static async getMaxID(user_id,course_id){
        var res = await axios.post(url7,{
            "user_id":user_id,
            "course_id":course_id
        });
        
        if (res)  return res.data;
    }

}

export default OrderService;