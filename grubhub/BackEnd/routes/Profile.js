var express = require("express");
var bodyParser = require('body-parser');
var multer = require('multer');
var pool = require('./../ConnectionPool');
var app = express();
const router = express.Router();
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

router.post('/viewprofile', isAuthenticated, function (req, resp) {
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

router.post('/viewprofileowner', isAuthenticated, function (req, resp) {
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

router.post('/updateprofile', upload.single('userimage'), isAuthenticated, function (req, resp) {
    let name = req.body.name;
    let phone = req.body.phone;
    let email = req.body.email;
    let streetaddress = req.body.streetaddress;
    let apt = req.body.apt;
    let city = req.body.city;
    let state = req.body.state;
    let zipcode = req.body.zipcode;
    let image = '';
    if (req.file) {
        image = req.file.path;
    } else {
        image = req.body.userimage;
    }
    let sql = 'update buyer_profile set name = ?, phone = ?, image = ?, streetaddress = ?, apt = ?, city = ?, state = ?, zipcode = ? where email = ?';
    pool.query(sql, [name, phone, image , streetaddress, apt, city, state, zipcode, email], (error, response) => {
        if (error) {
            console.log(error);
            resp.status(500).send('Unknown error occured');
        } else {
            resp.status(200).json({
                message: 'Profile Updated',
                imagePath: image
            });
        }
    });
});

router.post('/updateprofileowner', upload.single('userimage'), isAuthenticated, function (req, resp) {
    let name = req.body.name;
    // let phone = req.body.phone;
    let email = req.body.email;
    let rest_name = req.body.rest_name;
    let rest_zip = req.body.rest_zip;
    let cuisine = req.body.cuisine;
    let owner_image = '';
    if (req.file) {
        owner_image = req.file.path;
    } else {
        owner_image = req.body.userimage;
    }
    let sql = 'update restaurant set owner_name = ?, rest_name = ?, rest_zip = ?, cuisine = ?, owner_image = ? where owner_email = ?';
    pool.query(sql, [name, rest_name, rest_zip, cuisine, owner_image, email], (error, response) => {
        if (error) {
            resp.status(500).send('Unknown error occured');
        } else {
            resp.status(200).json({
                message: 'Profile Updated',
                imagePath: owner_image
            });
        }
    });
});

module.exports = router;