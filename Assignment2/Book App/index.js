//import express module 
var express = require('express');
//create  an express app
var app = express();
//require express middleware body-parser
var bodyParser = require('body-parser');
//require express session
var session = require('express-session');
var cookieParser = require('cookie-parser');
var alert = require('alert-node');
const { check, validationResult } = require('express-validator');


//set the view engine to ejs
app.set('view engine','ejs');
//set the directory of views
app.set('views','./views');
//specify the path of static directory
app.use(express.static(__dirname + '/public')); 

//use body parser to parse JSON and urlencoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
//use cookie parser to parse request headers
app.use(cookieParser());
//use session to store user data between HTTP requests
app.use(session({
    secret: 'cpe_273_secure_string',
    resave: false,
    saveUninitialized: true
}));

//Only user allowed is admin
var Users = [{
    "username" : "admin",
    "password" : "admin"
}];
//By Default we have 3 books
var books = [
    {"BookID" : "1", "Title" : "Book 1", "Author" : "Author 1"},
    {"BookID" : "2", "Title" : "Book 2", "Author" : "Author 2"},
    {"BookID" : "3", "Title" : "Book 3", "Author" : "Author 3"}
]
//route to root
app.get('/',function(req,res){
    //check if user session exits
    if(req.session.user){
        res.redirect('/home');
    }else
        res.render('login');
});

app.post('/login',function(req,res){
    if(req.session.user){
        res.redirect('/home');
    }else{
        console.log("Inside Login Post Request");
        console.log("Req Body : ", req.body);
        Users.filter(function(user){
            if(user.username === req.body.username && user.password === req.body.password){
                console.log(req.body.username);
                console.log(req.body.password);
                req.session.user = user;
                res.redirect('/home');
            } else {
                alert('Invalid credentials');
            }
        })
    }
    
});

app.get('/create', function (req, res) {
    if (!req.session.user) {
        res.redirect('/');
    } else {
        res.render('create', {errorMsg : null});
    }
});

app.post('/create', [
    check('bookId', 'Book ID should be a valid number').not().isEmpty().isNumeric(),
    check('title', 'Title should not be blank')
        .not().isEmpty(),
    check('author', 'Author should not be blank and should be a valid name').not().isEmpty().isAlpha()
    ], (req, res) => {
        if (!req.session.user) {
            res.redirect('/');
        } else {
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
                let errorMsg = errors.array()[0].msg;
                alert(errorMsg);
                res.render('create');
            } else {
                let book = { "BookID": req.body.bookId, "Title": req.body.title, "Author": req.body.author };
                books.push(book);
                res.render('home', {
                books: books
            })
        }
    }
});

app.get('/home',function(req,res){
    if(!req.session.user){
        res.redirect('/');
    }else{
        console.log("Session data : " , req.session);
        res.render('home',{
            books : books
        });
    }
    
});

app.get('/delete',function(req,res){
    console.log("Session Data : ", req.session.user);
    if(!req.session.user){
        res.redirect('/');
    }else
        res.render('delete');
});

app.post('/delete', [
    check('bookId', 'Book ID should be a valid number')
        .not().isEmpty()
        .isNumeric()],
    function (req, res) {
    if (!req.session.user) {
        res.redirect('/');
    } else {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            let errorMsg = errors.array()[0].msg;
            alert(errorMsg);
            res.render('delete');
        } else {
            let bookId = req.body.bookId;
            let book = books.find(item => item.BookID === bookId);
            if (book) {
                books = books.filter(e => e !== book);
                res.render('home', { books: books });
            } else {
                alert('Book with this number does not exist');
                res.render('delete');
            }
        }
    }
});

var server = app.listen(3000, function () {
    console.log("Server listening on port 3000");
});