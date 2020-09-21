const express = require('express');
const mysql = require('mysql');
const router = express.Router();

router.post('/',async (req,res) =>{
    var user_id = req.body.user_id;
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
    let sql = `INSERT INTO order (user_id,course_id) VALUES ('${user_id}','${course_id}')`;
    await db.query(sql,(error) => {
        if(error) throw error;
        res.send('Success');
    });    
    db.end();
});


router.post('/detail',async (req,res) =>{
    var order_id = req.body.order_id;
    var item_id = req.body.item_id;
    var quantity = req.body.quantity;
    var total = req.body.total;
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
    let sql = `INSERT INTO order (order_id,item_id,quantity,total) VALUES ('${order_id}','${item_id}','${quantity}','${total}')`;
    await db.query(sql,(error) => {
        if(error) throw error;
        res.send('Success');
    });    
    db.end();
});

module.exports = router;