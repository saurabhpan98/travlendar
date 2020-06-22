const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport =require('passport');
const LocalStrategy =require('passport-local');
const session = require('express-session');
const db = require('./config/keys').mongoURI;
const ejs = require('ejs');
const keys=require('./config/keys'); //for database key to be secure

require('./config/passport')(passport);

const app = express();

//setting up static files
app.set('view engine', 'ejs');
app.use(express.static('views'));


//using bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//connecting mongodb
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Mongodb connected...'))
    .catch(err => console.log(`Error: ${err}`));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


//setting up port
const port = process.env.PORT || 5000


//requiring routes
app.use('/', require('./routes/main-routes.js'));
app.use('/', require('./routes/login_route.js'));
app.use('/', require('./routes/signup-routes.js'));
app.use('/', require('./routes/google.js'));
app.use('/', require('./routes/github.js'));
app.use('/', require('./routes/profile-routes.js'));
app.use('/', require('./routes/todays-event.js'));

//listening to server
app.listen(port, () => console.log(`App running on port ${port}`))
