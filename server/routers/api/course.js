const express = require('express');
const mysql = require('mysql');
const router = express.Router();

//Get 
router.post('/', async(req,res) =>{
    var host_id = req.body.host_id;
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
    let sql = `SELECT * from course WHERE host_id = '${host_id}'`;        
    await db.query(sql,(error,result) => {
        if(error) throw error;
        
        if(result.length > 0){

            res.send(result);

        }else res.status(401).json({error: "Error"});
    });    
    db.end();
});

//Post
router.post('/add',async (req,res) =>{
    var title = req.body.title;
    var des = req.body.des;
    var shop_name = req.body.shop_name;
    var host_name = req.body.host_name;
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
    let sql = `INSERT INTO course (title,des,shop_id,host_id) VALUES ('${title}','${des}',1,1)`;
    await db.query(sql,(error) => {
        if(error) throw error;
        res.send('Success');
    });    
    db.end();
});
module.exports = router;