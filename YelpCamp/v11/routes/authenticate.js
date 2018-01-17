var express = require("express");
var router = express.Router();
var user = require("../models/user");
var passport = require("passport");

router.get("/register", function(req, res)
{
    
    if(req.user)
    {
        req.logout();
        req.flash("error","You cant access register page as you are already signed in");
        res.redirect("/");
    }
    else
    {
        res.render("user/register");
    }    
});

router.post("/register", function(req, res)
{
    user.register(new user({username: req.body.username}), req.body.password, function(error, user)
    {
        if(error)
        {
            req.flash("error", error.message);
            res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function()
        {
            req.flash("Welcome to Yelp Camp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});


router.get("/login", function(req, res)
{
    if(req.user)
    {
        req.logout();
        req.flash("error","You cant access login page as you are already logged in");
        res.redirect("/");   
    }
    else
    {
        res.render("user/login");
    }
});

router.post("/login",passport.authenticate("local", 
{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res)
{
    
});

router.get("/logout", function(req,res)
{
    req.logout();
    req.flash("success","Logged You Out!");
    res.redirect("/campgrounds");
});



module.exports = router;