var express = require("express");
var bodyParser = require('body-parser');
var pool = require('./../ConnectionPool');
let crypto = require('crypto');
var app = express();
const router = express.Router();
var jwt = require('jsonwebtoken');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.post('/', function (req, resp) {
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
                const signature = 'secret';
                const expiration = '6h';
                let data = {
                    email: req.body.email,
                    name: response[0].name,
                    type: response[0].user_type
                }
                resp.send(jwt.sign({ data, }, signature, { expiresIn: expiration }));
            } else {
                resp.status(401).send('Invalid credentials')
            }
        }
    })
});

let hashPassword = (password) => {
    var hash = crypto.pbkdf2Sync(password, 'salt', 100000, 512, 'sha512');
    return hash.toString('hex');
}

module.exports = router;