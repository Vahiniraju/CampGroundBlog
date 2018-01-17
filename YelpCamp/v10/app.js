var express = require("express");
var app = express();
var bodyparser = require("body-parser"),
    mongoose = require("mongoose"),
    seedDB   = require("./seeds"),
    passport = require("passport"),
    methodoverride = require("method-override"),
    localStrategy = require("passport-local");
var campground = require("./models/campground"),
    comment    = require("./models/comment"),
    user       = require("./models/user"),
    commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    authenticateRoute = require("./routes/authenticate");
    
    
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:/yelp_camp_v10",{  useMongoClient: true});
app.use(express.static(__dirname+ "/public"));
app.use(methodoverride("_method"));
app.use(bodyparser.urlencoded({extented: true}));
app.set("view engine","ejs");



//passport configuration

app.use(require("express-session")({
    secret: "once again rusty wins cutest dog contest",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser()); 

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next()
});

app.use(commentRoutes);
app.use(campgroundRoutes); 
app.use(authenticateRoute);


app.listen(process.env.PORT, process.env.IP, function()
{
    console.log("Yelp camp server started");
});
