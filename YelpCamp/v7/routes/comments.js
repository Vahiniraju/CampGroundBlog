var express = require("express");
var router = express.Router({mergeParams: true});  
var campground = require("../models/campground");
var comment = require("../models/comment");

router.get("/campgrounds/:id/comments/new",isLoggedIn ,function(req,res)
{
    campground.findById(req.params.id, function(error, campground)
    {
        if(error)
        {
            console.log(error);
        }
        else
        {
             res.render("comments/new", { campground: campground });
        }
    });
   
});

router.post("/campgrounds/:id/comments", isLoggedIn ,function(req,res)
{
    campground.findById(req.params.id, function(error, foundcampground)
    {
        if(error)
        {
            console.log(error);
        }
        else
        {
            comment.create(req.body.comment, function(error, comment){
            comment.author._id = req.user._id;
            comment.author.username = req.user.username;
            comment.save();
            foundcampground.comments.push(comment);
            foundcampground.save(function(error, foundcampground)
            {
                if(error)
                {
                    console.log(error);
                }
                else
                {
                    res.redirect("/campgrounds/"+ req.params.id);
                }
            });
           
            });
        }
    });
    
});

function isLoggedIn(req, res, next)

{
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;