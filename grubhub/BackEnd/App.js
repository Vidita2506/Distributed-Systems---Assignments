let express = require("express");
let bodyParser = require('body-parser');
let cors = require('cors');
let app = express();
let profile = require('./routes/Profile');
let signup = require('./routes/SignUp'); 
let login = require('./routes/Login'); 
let order = require('./routes/Order'); 
let restaurant = require('./routes/Restaurant'); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3006', credentials: true }));
app.use('/uploads', express.static('uploads'));

//Routes
app.use("/profile", profile);
app.use("/signup", signup);
app.use("/login", login);
app.use("/order", order);
app.use("/restaurant", restaurant);

//Allow Access Control
app.use(function (req, res, next) {
   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3006');
   res.setHeader('Access-Control-Allow-Credentials', 'true');
   res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
   res.setHeader('Cache-Control', 'no-cache');
   next();
});

app.listen(3001);
console.log("Server Listening on port 3001");
