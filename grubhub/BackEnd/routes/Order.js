var express = require("express");
var bodyParser = require('body-parser');
var pool = require('./../ConnectionPool');
var app = express();
const router = express.Router();
var isAuthenticated = require('./../middleware/isAuth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.post('/pastorders', isAuthenticated, function (req, resp) {
    let email = req.body.email;
    let sql = 'select a.*, rest_name from food_order a join restaurant b on a.rest_id = b.rest_id where buyer_email = ? and status = ? order by order_date DESC';
    pool.query(sql, [email, 'Delivered'], (error, response) => {
        if (error) {
            console.log(error);
            resp.status(500).send('Error occured');
        } else {
            resp.end(JSON.stringify(response));
        }
    });
});

router.post('/orderbyrestowner', isAuthenticated, function (req, resp) {
    let owner_email = req.body.owner_email;
    let sql = 'select * from food_order where rest_id IN (select rest_id from restaurant where owner_email = ? ) and status != ? order by order_date DESC';
    pool.query(sql, [owner_email, 'Delivered'], (error, response) => {
        if (error) {
            console.log(error);
            resp.status(500).send('Error occured');
        } else {
            resp.end(JSON.stringify(response));
        }
    });
});

router.post('/pastorderbyrestowner', isAuthenticated, function (req, resp) {
    let owner_email = req.body.owner_email;
    let sql = 'select * from food_order where rest_id IN (select rest_id from restaurant where owner_email = ? ) and status = ? order by order_date DESC';
    pool.query(sql, [owner_email, 'Delivered'], (error, response) => {
        if (error) {
            console.log(error);
            resp.status(500).send('Error occured');
        } else {
            resp.end(JSON.stringify(response));
        }
    });
});

router.post('/upcomingorders', isAuthenticated, function (req, resp) {
    let email = req.body.email;
    let sql = 'select a.*, rest_name from food_order a join restaurant b on a.rest_id = b.rest_id where buyer_email = ? and status != ? order by order_date DESC';
    pool.query(sql, [email, 'Delivered'], (error, response) => {
        if (error) {
            console.log(error);
            resp.status(500).send('Error occured');
        } else {
            resp.end(JSON.stringify(response));
        }
    })
});

router.post('/orderdetails', isAuthenticated, function (req, resp) {
    let orderId = req.body.orderId;
    //let sql = 'select * from order_item where order_id = ?';

    let sql = 'select name, quantity, price from order_item oi join food_item fi on oi.item_id = fi.item_id where oi.order_id = ?'

    pool.query(sql, [orderId], (error, response) => {
        if (error) {
            resp.status(500).send('Invalid data');
        } else {
            resp.end(JSON.stringify(response));
        }
    });
});

router.post('/updateorderstatus', isAuthenticated, function (req, resp) {
    let status = req.body.status;
    let order_id = req.body.order_id;
    let sql = 'update food_order set status = ? where order_id = ?';
    pool.query(sql, [status, order_id], (error, response) => {
        if (error) {
            resp.status(500).send('Unknown error occured');
        } else {
            resp.status(200).send('Order updated');
        }
    });
});

router.post('/checkout', isAuthenticated, function (req, resp) {
    let cart = Array.from(req.body.cart);
    let buyer_email = req.body.buyer_email;
    let restid = req.body.restid;
    let totalPrice = parseFloat(req.body.total).toFixed(2);

    let sql_get_id = 'select (max(order_id) + 1) AS new_order_id from food_order';
    pool.query(sql_get_id, (error, response) => {
        let neworderid = JSON.stringify(response[0].new_order_id)
        if (neworderid != null) {
            let sql1 = 'INSERT into food_order (buyer_email , rest_id, status, order_date, order_id, total_price) values (?, ?, ?, CURRENT_DATE, ?, ?)'
            let sql2 = 'INSERT into order_item (item_id, quantity, order_id) values (?, ?, ?)';

            pool.query(sql1, [buyer_email, restid, 'New', neworderid, totalPrice], (error, response) => {
                if (error) {
                    console.log(error);
                    resp.status(500).send('Error occured');
                } else {
                    cart.forEach(element => {
                        let itemId = parseInt(element.id);
                        let quantity = parseInt(element.quantity);
                        pool.query(sql2, [itemId, quantity, neworderid], (error, response) => {
                            if (error) {
                                console.log(error);
                                resp.status(500).end('Error occured');
                            }
                        }); // db query2 ends
                    }); //cart forEach ends
                }
            }); // db query1 ends
            resp.end('Order placed');
        }
    });
});

router.post('/userdetails', isAuthenticated, function (req, resp) {
    let email = req.body.buyeremail;
    let sql = 'select * from buyer_profile where email = ?';
    pool.query(sql, [email], (error, response) => {
        if (error) {
            console.log(error);
            resp.status(500).send('Error occured');
        } else {
            resp.end(JSON.stringify(response));
        }
    });
});

module.exports = router;