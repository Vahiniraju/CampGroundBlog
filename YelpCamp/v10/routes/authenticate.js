var express = require("express");
var router = express.Router();
var user = require("../models/user");
var passport = require("passport");

router.get("/register", function(req, res)
{
    res.render("user/register");
});

router.post("/register", function(req, res)
{
    user.register(new user({username: req.body.username}), req.body.password, function(error, user)
    {
        if(error)
        {
            console.log(error);
            return res.render("user/register");
        }
        passport.authenticate("local")(req, res, function()
        {
            res.redirect("/campgrounds");
        });
    });
});


router.get("/login", function(req, res)
{
    res.render("user/login");
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
    res.redirect("/campgrounds");
});



module.exports = router;