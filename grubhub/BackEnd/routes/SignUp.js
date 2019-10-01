var express = require("express");
var bodyParser = require('body-parser');
var pool = require('./../ConnectionPool');
let crypto = require('crypto');
var app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.post('/signupbuyer', function (req, resp) {
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

router.post('/signupowner', function (req, resp) {
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

let hashPassword = (password) => {
    var hash = crypto.pbkdf2Sync(password, 'salt', 100000, 512, 'sha512');
    return hash.toString('hex');
}

module.exports = router;