import axios from 'axios';

const url ='http://localhost:3000/api/shop';
const url1 ='http://localhost:3000/api/shop/id';
class ShopService{
    //Get course
    static async getShop(){
        var res = await axios.get(url);
        if (res)  return res.data;
    }
    static async getShopbyID(shop_id){
        var res = await axios.post(url1,{
            "shop_id":shop_id
        });
        
        if (res)  return res.data;
    }

}
export default ShopService;