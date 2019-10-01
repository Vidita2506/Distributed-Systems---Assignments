var express = require("express");
var bodyParser = require('body-parser');
var multer = require('multer');
var pool = require('./../ConnectionPool');
var app = express();
var isAuthenticated = require('./../middleware/isAuth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

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
        fileSize: 1024 * 1024 * 100
    },
    fileFilter: fileFilter
});

const router = express.Router();

router.post('/searchitem', isAuthenticated, function (req, resp) {
    let item = req.body.item;
    let sql = 'select rest_id, rest_name, rest_image, cuisine from restaurant' 
    if (item != null && item.length > 0) {
        sql = 'select rest_id, rest_name, cuisine from restaurant where rest_id IN ( select rest_id from food_item where name = ?)';
    }
    pool.query(sql, [item], (error, response) => {
        if (error) {
            resp.status(500).send('Invalid data');
        } else {
            resp.end(JSON.stringify(response));
        }
    });
});

router.post('/updatesection', isAuthenticated, function (req, resp) {
    let oldsectionname = req.body.oldsectionname;
    let newsectionname = req.body.newsectionname;
    let sql = 'update food_item set section = ? where section = ?'
    pool.query(sql, [newsectionname, oldsectionname], (error, response) => {
        if (error) {
            resp.status(500).send('Invalid data');
        } else {
            resp.end(JSON.stringify(response));
        }
    });
});

router.post('/deletesection', isAuthenticated, function (req, resp) {
    let section = req.body.section;
    let sql = 'delete from food_item where section = ?'
    pool.query(sql, [section], (error, response) => {
        if (error) {
            resp.status(500).send('Invalid data');
        } else {
            resp.end(JSON.stringify(response));
        }
    });
});


router.post('/getsections', isAuthenticated, async function (req, resp) {
    let owner_email = req.body.owner_email;
    let restid = await getRestIdByOwner(owner_email);
    let sections = await getSections(restid);
    resp.end(JSON.stringify(sections));
});

router.post('/restaurantmenubysection', isAuthenticated, async function (req, resp) {
    let restid = req.body.restid;
    let sections = await getSections(restid);
    let menu = await getMenu(sections, restid);
    resp.end(JSON.stringify([...menu]));
});

router.post('/restaurantmenubysectionforowner', isAuthenticated, async function (req, resp) {
    let owner_email = req.body.owner_email;
    let restid = await getRestIdByOwner(owner_email);
    let sections = await getSections(restid);
    let menu = await getMenu(sections, restid);
    resp.end(JSON.stringify([...menu]));
});

async function getRestIdByOwner(owner_email) {
    let promise = new Promise((resolve, reject) => {
        let sql = 'select rest_id from restaurant where owner_email = ?';
        pool.query(sql, [owner_email]).then((rows) => {
            resolve(rows[0].rest_id);
        }).catch(error => {
            console.log(error);
        })
    });
    return promise;
}

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

router.post('/fooditembyid', isAuthenticated, async function (req, resp) {
    let item_id = req.body.item_id;
    let sql = 'select * from food_item where item_id = ?'
    pool.query(sql, [item_id], (error, response) => {
        if (error) {
            resp.status(500).send('Invalid data');
        } else {
            resp.end(JSON.stringify(response));
        }
    });
});

router.post('/updatefooditem', isAuthenticated, upload.single('item_image'), function (req, resp) {
    let item_id = req.body.item_id;
    let name = req.body.name;
    let price = req.body.price;
    let section = req.body.section;
    let image = '';
    if (req.file) {
        image = req.file.path;
    }

    let sql = 'update food_item set name = ?, price = ?, section = ?, item_image = ? where item_id = ?';
    pool.query(sql, [name, price, section, image, item_id], (error, response) => {
        if (error) {
            resp.status(500).send('Unknown error occured');
        } else {
            resp.status(200).send('Item updated');
        }
    });
});

router.post('/deletefooditem', isAuthenticated, function (req, resp) {
    let item_id = req.body.item_id;
    let sql = 'delete from food_item where item_id = ?';
    pool.query(sql, [item_id], (error, response) => {
        if (error) {
            resp.status(500).send('Failed to delete item');
        } else {
            resp.status(200).send('Item Deleted successfully');
        }
    });
});

router.post('/addfooditem', upload.single('item_image'), isAuthenticated, async function (req, resp) {
    let owner_email = req.body.owner_email;
    let name = req.body.name;
    let price = req.body.price;
    let section = req.body.section;
    let item_image = '';
    if (req.file) {
        item_image = req.file.path;
    }
    let rest_id = await getRestIdByOwner(owner_email);
    let sql = 'INSERT into food_item (rest_id , name, section, price, item_image) values (?, ?, ?, ?, ?)';
    pool.query(sql, [rest_id, name, section, price, item_image], (error, response) => {
        if (error) {
            resp.status(500).send('Failed to add item');
        } else {
            resp.status(200).send('Item added successfully');
        }
    });
});

module.exports = router;