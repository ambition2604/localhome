import axios from 'axios';

const url ='http://localhost:3000/api/menu/id';
class MenuService{
    //Get course
    static async getMenubyID(shop_id){
        var res = await axios.post(url,{
            shop_id:shop_id
        });
        
        if (res)  return res.data;
    }
}
export default MenuService;