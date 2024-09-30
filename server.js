


// loads in variables from .env file
if (process.env.NODE_ENV !== 'production'){require('dotenv').config();}

/*
npm i express ejs --save-dev nodemon dotenv mongoose body-parser bcrypt passport passport-local express-session express-flash method-override


git add .
git commit -m "fixing stuff"
git push origin main


a new note

*/

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const loginSystemRouter = require("./routes/loginSystem");
const RetroArcadeRouter = require("./routes/RetroArcade");
const UpdatingSystem = require("./routes/UpdatingSystem");
const OutsideArcadeRouter = require("./routes/OutsideArcade");

const initializePassport = require("./passport-config");
initializePassport(
  passport,
  email => User.findOne({ email }), // Query MongoDB for user by email
  id => User.findById(id) // Query MongoDB for user by ID
);

const app = express();

app.set('view-engine', 'ejs');


app.use(methodOverride('_method'));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use("/",loginSystemRouter); // sends system routing to loginSystem.js
app.use("/",RetroArcadeRouter); // sends system routing to loginSystem.js
app.use("/",UpdatingSystem); // sends system routing to loginSystem.js
app.use("/",OutsideArcadeRouter); // sends system routing to loginSystem.js


app.use((req, res, next) => {
  if (req.method === 'GET' && req.path !== '/login' && !req.isAuthenticated()) {
      req.session.returnTo = req.originalUrl; // Store the current URL
  }
  next();
});



/* Mongo DB loaded using mongoose */  
const uri = 'mongodb+srv://dima:0349g-jrio0oeirjgDDD@cluster0.ua94olb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri)
  .then(() => {
    console.log('Successfully connected to MongoDB');    
    app.use(express.static('public'));
    app.listen(3000, () => {console.log("Server is Running");});
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
/* Mongo DB loaded using mongoose */  


/* each user

gamesPlayed --> only when you loose --> on reload doesn't count
SumOfScores --> (score of a player combined)

AllUsersScores --> all scores of players SumOfScores, 
AllGamesPlayed --> all games of players gamesPlayed

Average --> AllUsersScores / AllGamesPlayed


*/

