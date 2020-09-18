import axios from 'axios';

const url ='http://localhost:3000/api/item';
const url1 ='http://localhost:3000/api/item/menu_id';
const url2 ='http://localhost:3000/api/item/menus_id';

class ItemService{
    //Get course
    static async getItem(){
        var res = await axios.get(url);
        
        if (res)  return res.data;
    }
    static async findItembyMenu(menu_id,items,course_id){
        var res = await axios.post(url1,{
            menu_id:menu_id,
            items : items,
            course_id:course_id,
        });
        if (res)  return res.data;
    }
    static async findItembyMenus(menu_id,course_id){
        var res = await axios.post(url2,{
            menu_id:menu_id,
            course_id:course_id
        });
        if (res)  return res.data;
    }

}
export default ItemService;