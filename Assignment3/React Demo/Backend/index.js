//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');
const { check, validationResult } = require('express-validator');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

app.use(bodyParser.urlencoded({
     extended: true
}));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

  var Users = [{
      username : "admin",
      password : "admin"
  }]

  var books = [
    {"BookID" : "1", "Title" : "Book 1", "Author" : "Author 1"},
    {"BookID" : "2", "Title" : "Book 2", "Author" : "Author 2"},
    {"BookID" : "3", "Title" : "Book 3", "Author" : "Author 3"}
]

//Route to handle Post Request Call
app.post('/login', [
    check('username', 'Enter username & password').not().isEmpty(),
    check('password', 'Enter username & password').not().isEmpty()
], function (req, res) {
    let errors = validationResult(req);
        if (!errors.isEmpty()) {
            let errorMsg = errors.array()[0].msg;
            res.status(401).send(errorMsg);
        } else {
            console.log("Inside Login Post Request");
            //console.log("Req Body : ", username + "password : ",password);
            console.log("Req Body : ", req.body);
            Users.filter(function (user) {
                if (user.username === req.body.username && user.password === req.body.password) {
                    res.cookie('cookie', "admin", { maxAge: 900000, httpOnly: false, path: '/' });
                    req.session.user = user;
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Successful Login");
                } else {
                    res.status(401).send('Invalid login credentials');
                }
            })
        }
});

//Route to get All Books when user visits the Home Page
app.get('/home', function(req,res){
    console.log("Inside Home Login");    
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("Books : ",JSON.stringify(books));
    res.end(JSON.stringify(books));
    
})

app.post("/create", [
    check('BookID', 'Book ID should be a valid number').not().isEmpty().isNumeric(),
    check('Title', 'Title should not be blank')
        .not().isEmpty(),
    check('Author', 'Author should not be blank and should be a valid name')
        .not().isEmpty()
        .matches(/^[a-zA-Z ]+$/)
], (req, resp) => {
    let bookid = req.body.BookID;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let errorMsg = errors.array()[0].msg;
        resp.status(400).send(errorMsg);
    } else {
        let existingBook = books.find(item => item.BookID === bookid);
        if (existingBook) {
            resp.status(400).send('Book ID should be unique');
        } else {
            let title = req.body.Title;
            let author = req.body.Author;
            let book = {
                "BookID": bookid,
                "Title": title,
                "Author": author
            };
            books.push(book);
            resp.end('Book added!');
        }
    }
});

app.post("/delete", [check('BookID', 'Book ID should be a valid number')
    .not().isEmpty()
    .isNumeric()],(req, resp) => { 
    let errors = validationResult(req);
        if (!errors.isEmpty()) {
            let errorMsg = errors.array()[0].msg;
            resp.status(400).send(errorMsg);
        } else {
            let bookId = req.body.BookID;
            let book = books.find(item => item.BookID === bookId);
            if (book) {
                books = books.filter(e => e !== book);
                resp.end('Book deleted!');
            } else {
                resp.status(400).send('Book does not exist');
            }
        }
})


//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");