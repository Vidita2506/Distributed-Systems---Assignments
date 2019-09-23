var express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors');
var crypto = require('crypto');
var app = express();
var pool = require('./ConnectionPool');
var multer = require('multer');

var storage = multer.diskStorage({
   destination: function (req, file, callback) {
      callback(null, './uploads');
   },
   filename: function (req, file, callback) {
      callback(null, file.originalname);
   }

})

var fileFilter = function (req, file, callback) {
   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      callback(null, true);
   } else {
      callback(null, false);
   }
}

var upload = multer({
   storage: storage,
   limits: {
      fileSize: 1024 * 1024 * 6
   },
   fileFilter: fileFilter
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use('/uploads', express.static('uploads'));

//Allow Access Control
app.use(function (req, res, next) {
   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
   res.setHeader('Access-Control-Allow-Credentials', 'true');
   res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
   res.setHeader('Cache-Control', 'no-cache');
   next();
});

app.post('/signupbuyer', function (req, resp) {
   let name = req.body.name;
   let email = req.body.email;
   let password = req.body.password;
   let hashPwd = hashPassword(password);
   let sql = 'select * from user_login where email = ?';
   let insertSql = 'INSERT into user_login (email, password, user_type) values (?, ?, ?)';
   let insertsql_profile = 'INSERT into buyer_profile (email, name) values (?, ?)';

   pool.query(sql, [email], (error, response) => {
      if (error) {
         resp.status(500).send('Sign up failed')
      } else {
         if (response.length > 0) {
            resp.status(401).send('User with this email already exists')
         } else {
            pool.query(insertSql, [email, hashPwd, 'buyer'], (error, response) => {
               if (error) {
                  throw error;
               }
               pool.query(insertsql_profile, [email, name], (error, response) => {
                  if (error) {
                     throw error;
                  }
               })
               resp.send('User added');
            })
         }
      }
   });
});

app.post('/signupowner', function (req, resp) {
   let email = req.body.email;
   let password = req.body.password;
   let hashPwd = hashPassword(password);
   let name = req.body.name;
   let restname = req.body.restname;
   let restzip = req.body.restzip;
   let validateSql = 'select * from user_login where email = ?';
   pool.query(validateSql, [email], (error, response) => {
      if (error) {
         resp.status(500).send('Sign up failed')
      } else {
         if (response.length > 0) {
            resp.status(401).send('User with this email already exists')
         } else {
            let sql = 'INSERT into user_login (email, password, user_type) values (?, ?, ?)';
            pool.query(sql, [email, hashPwd, 'owner'], (error, response) => {
               if (error) {
                  throw error;
               }
               let sql_profile = 'INSERT into restaurant (owner_email, owner_name, rest_name, rest_zip) values (?, ?, ?, ?)';
               pool.query(sql_profile, [email, name, restname, restzip], (error, response) => {
                  if (error) {
                     throw error;
                  }
               })
               resp.send('User added');
            })
         }
      }
   })
});

app.post('/login', function (req, resp) {
   let email = req.body.email;
   let password = req.body.password;
   let hashPwd = hashPassword(password);
   let sql = 'select * from user_login where email = ? AND password = ?';
   pool.query(sql, [email, hashPwd], (error, response) => {
      if (error) {
         resp.status(401).send('Login failed')
      } else {
         if (response.length > 0) {
            resp.cookie('cookie', response[0].user_type, { maxAge: 900000, httpOnly: false, path: '/' });
            resp.status(200).send('Logged in');
         } else {
            resp.status(401).send('Invalid credentials')
         }
      }
   })
});

app.post('/searchitem', function (req, resp) {
   let item = req.body.item;
   let sql = 'select rest_id, rest_name, cuisine from restaurant where rest_id IN ( select rest_id from food_item where name = ?)';
   pool.query(sql, [item], (error, response) => {
      if (error) {
         resp.status(500).send('Invalid data');
      } else {
         resp.end(JSON.stringify(response));
      }
   });
});

app.post('/restaurantmenubysection', async function (req, resp) {
   let restid = req.body.restid;
   let sections = await getSections(restid);
   let menu = await getMenu(sections, restid);
   resp.end(JSON.stringify([...menu]));
});

async function getSections(restid) {
   let promise = new Promise((resolve, reject) => {
      let sql = 'select distinct section from food_item where rest_id = ?';
      pool.query(sql, [restid]).then((rows) => {
         resolve(rows);
      }).catch(error => {
         console.log(error);
      })
   });
   return promise;
}

async function getMenu(sections, restid, ) {
   let sql = 'select * from food_item where rest_id = ? and section = ?';
   let map = new Map();
   let promise = new Promise((resolve, reject) => {
      let count = 0;
      sections.forEach(async function (item) {
         let sectionname = item.section;
         let menu = await pool.query(sql, [restid, sectionname]);
         map.set(sectionname, menu);
         count++;
         if (count == sections.length) {
            resolve(map);
         }
      });
   });  
   return promise;
}

app.post('/viewprofile', function (req, resp) {
   let email = req.body.useremail;
   let sql = 'select * from buyer_profile where email = ?';
   pool.query(sql, [email], (error, response) => {
      if (error) {
         resp.status(500).send('Invalid data');
      } else {
         if (response.length > 0) {
            resp.end(JSON.stringify(response[0]));
         } else {
            resp.status(401).send('Invalid user')
         }
      }
   });
});

app.post('/viewprofileowner', function (req, resp) {
   let email = req.body.useremail;
   let sql = 'select * from restaurant where owner_email = ?';
   pool.query(sql, [email], (error, response) => {
      if (error) {
         resp.status(500).send('Invalid data');
      } else {
         if (response.length > 0) {
            resp.end(JSON.stringify(response[0]));
         } else {
            resp.status(401).send('Invalid user')
         }
      }
   });
});

app.post('/updateprofile', upload.single('userimage'), function (req, resp) {
   let name = req.body.name;
   let phone = req.body.phone;
   let email = req.body.email;
   let image = '';
   if (req.file) {
      image = req.file.path;
   } else {
      image = req.body.userimage;
   }
   let sql = 'update buyer_profile set name = ?, phone = ?, image = ? where email = ?';
   pool.query(sql, [name, phone, image, email], (error, response) => {
      if (error) {
         resp.status(500).send('Unknown error occured');
      } else {
         resp.status(200).send('Profile updated');
      }
   });
});

app.post('/updateprofileowner', function (req, resp) {
   let name = req.body.name;
  // let phone = req.body.phone;
   let email = req.body.email;
   let rest_name = req.body.rest_name;
   let rest_zip = req.body.rest_zip;
   let cuisine = req.body.cuisine;
   let sql = 'update restaurant set owner_name = ?, rest_name = ?, rest_zip = ?, cuisine = ? where owner_email = ?';
   pool.query(sql, [name, rest_name, rest_zip, cuisine, email], (error, response) => {
      if (error) {
         resp.status(500).send('Unknown error occured');
      } else {
         resp.status(200).send('Profile updated');
      }
   });
});

app.post('/orderdetails', function (req, resp) {
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

/*
app.post('/updateorder', function (req, resp) {
   let status = req.body.status;
   let sql = 'update food_order set status = ? where email = ?';
   pool.query(sql, [name, phone, email], (error, response) => {
      if (error) {
         resp.status(500).send('Unknown error occured');
      } else {
         resp.status(200).send('Profile updated');
      }
   });
});*/


app.post('/updateorderstatus', function (req, resp) {
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

app.post('/checkout', function (req, resp) {
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

app.post('/pastorders', function (req, resp) {
   let email = req.body.email;
   let sql = 'select * from food_order where buyer_email = ? and status = ?';
   pool.query(sql, [email, 'Delivered'], (error, response) => {
      if (error) {
         console.log(error);
         resp.status(500).send('Error occured');
      } else {
         resp.end(JSON.stringify(response));
      }
   });
});

app.post('/orderbyrestowner', function (req, resp) {
   let owner_email = req.body.owner_email;
   let sql = 'select * from food_order where rest_id IN (select rest_id from restaurant where owner_email = ? ) and status != ?';
   pool.query(sql, [owner_email, 'Delivered'], (error, response) => {
      if (error) {
         console.log(error);
         resp.status(500).send('Error occured');
      } else {
         resp.end(JSON.stringify(response));
      }
   });
});

app.post('/pastorderbyrestowner', function (req, resp) {
   let owner_email = req.body.owner_email;
   let sql = 'select * from food_order where rest_id IN (select rest_id from restaurant where owner_email = ? ) and status = ?';
   pool.query(sql, [owner_email, 'Delivered'], (error, response) => {
      if (error) {
         console.log(error);
         resp.status(500).send('Error occured');
      } else {
         resp.end(JSON.stringify(response));
      }
   });
});

app.post('/upcomingorders', function (req, resp) {
   let email = req.body.email;
   let sql = 'select * from food_order where buyer_email = ? and status != ?';
   pool.query(sql, [email, 'Delivered'], (error, response) => {
      if (error) {
         console.log(error);
         resp.status(500).send('Error occured');
      } else {
         resp.end(JSON.stringify(response));
      }
   })
});

let hashPassword = (password) => {
   var hash = crypto.pbkdf2Sync(password, 'salt', 100000, 512, 'sha512');
   return hash.toString('hex');
}

app.listen(3001);
console.log("Server Listening on port 3001");
