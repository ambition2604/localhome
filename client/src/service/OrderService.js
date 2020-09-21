import axios from 'axios';

const url1 ='http://localhost:3000/api/order/';
const url2 ='http://localhost:3000/api/order/detail';


class OrderService{

    static addOrder(user_id,course_id)   {
        return axios.post(url1,{
            "user_id":user_id,
            "course_id":course_id
        });
    }
    static addOrderDetail(order_id,item_id,quantity,total)   {
        return axios.post(url2,{
            "order_id":order_id,
            "item_id":item_id,
            "quantity":quantity,
            "total":total
        });
    }

}


export default OrderService;