var express = require("express");
var app = express(),
mongoose = require("mongoose"),
bodyParser = require("body-parser"),
passport   = require("passport"),
localStrategy = require("passport-local"),
passportlocalMongoose = require("passport-local-mongoose"),
user = require("./models/user");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/auth_demo", { useMongoClient: true });
app.set("view engine","ejs"); 
app.use(require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req, res)
{
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req,res)
{
    res.render("secret");
});

app.get("/register", function(req, res)
{
    res.render("register");
});

app.post("/register", function(req, res)
{
    user.register(new user({username: req.body.username}), req.body.password, function(error, user)
    {
        if(error)
        {
            console.log(error);
        }
        else
        {
            passport.authenticate("local")(req, res, function()
            {
                
            res.redirect("secret");
             
            });
        }   
    });
});

app.get("/login", function(req, res)
{
  res.render("login");  
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res)
{
});

app.get("/logout", function(req, res)
{
   req.logout();
   res.redirect("/");
});

function isLoggedIn(req, res, next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function()
{
    console.log("server started");
})