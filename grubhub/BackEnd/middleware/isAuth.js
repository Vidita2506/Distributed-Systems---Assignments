var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var jwt = require('jsonwebtoken');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let isAuthenticated = (req, resp, next) => {
    var token = req.headers['authorization'];
    if (!token || token == null) {
        return resp.status(401).send('Token not found');
    }
    token = token.replace('bearer ', '');
    jwt.verify(token, 'secret', function (err, user) {
        if (err) {
            console.log(err);
            return resp.status(401).send('Invalid User')
        } else {
            req.user = user;
            next();
        }
    });
}

module.exports = isAuthenticated;