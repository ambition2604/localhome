const express = require('express');
const mysql = require('mysql');
const router = express.Router();

//Get 
router.get('/', async(req,res) =>{
    var db =  mysql.createConnection({
        host        : 'localhost',
        user        : 'root',
        password    : '1234',
        database    : 'foodorder'
    });
    await db.connect((error) => {
        if(error){
            throw error;
        }
    });
    let sql = `SELECT * from item `;        
    await db.query(sql,(error,result) => {
        if(error) throw error;
        
        if(result.length > 0){

            res.send(result);

        }else res.status(401).json({error: "Error"});
    });    
    db.end();
});
router.post('/menu_id', async(req,res) =>{
    var menu_id = req.body.menu_id;
    var items = req.body.items;
    var course_id = req.body.course_id;
    var db =  mysql.createConnection({
        host        : 'localhost',
        user        : 'root',
        password    : '1234',
        database    : 'foodorder'
    });
    await db.connect((error) => {
        if(error){
            throw error;
        }
    });
    let sql = `SELECT * from item WHERE menu_id = '${menu_id}'`;        
    await db.query(sql,(error,result) => {
        if(error) throw error;
        
        if(result.length > 0){
            for (let i = 0; i < result.length; i++) {
                result[i].quantity = null;
                result[i].course_id = course_id;
                if(items.length > 0){
                    for (let j = 0; j < items.length; j++) {
                        if(items[j].id == result[i].id && items[j].course_id == result[i].course_id ){
                                result[i].quantity = null;
                                result[i].quantity = items[j].quantity;         
                        }   
                    }
                }      
            }
            res.send(result);

        }else res.status(401).json({error: "Error"});
    });    
    db.end();
});
router.post('/menus_id', async(req,res) =>{
    var menu_id = req.body.menu_id;
    var course_id = req.body.course_id;
    var db =  mysql.createConnection({
        host        : 'localhost',
        user        : 'root',
        password    : '1234',
        database    : 'foodorder'
    });
    await db.connect((error) => {
        if(error){
            throw error;
        }
    });
    let sql = `SELECT * from item WHERE menu_id = '${menu_id}'`;        
    await db.query(sql,(error,result) => {
        if(error) throw error;
    
        if(result.length > 0){
            result.forEach(element => {
                element.course_id = course_id;
            });
            res.send(result);

        }else res.status(401).json({error: "Error"});
    });    
    db.end();
});
module.exports = router;