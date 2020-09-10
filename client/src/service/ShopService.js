import axios from 'axios';

const url ='http://localhost:3000/api/shop';

class ShopService{
    //Get course
    static async getShop(){
        var res = await axios.get(url);
        if (res)  return res.data;
    }

}
export default ShopService;