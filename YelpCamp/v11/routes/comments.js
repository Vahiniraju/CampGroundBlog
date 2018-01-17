var express = require("express");
var router = express.Router({mergeParams: true});  
var campground = require("../models/campground");
var comment = require("../models/comment");
var middleware = require("../middleware");


router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn ,function(req,res)
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

router.post("/campgrounds/:id/comments", middleware.isLoggedIn ,function(req,res)
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
            comment.author.id = req.user._id;
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

router.get("/campgrounds/:id/comments/:commentid/edit",middleware.isCommentAuthorized, function(req, res)
{
    comment.findById(req.params.commentid, function(error, comment)
    {
        if(error || !comment)
        {
            req.flash("error","Comment not found")
            res.redirect("back");
        }
        else
        {
            res.render("comments/edit", {comment: comment, campgroundid : req.params.id});
        }
    });
    
});

router.put("/campgrounds/:id/comments/:commentid",middleware.isCommentAuthorized, function(req, res)
{
    comment.findByIdAndUpdate(req.params.commentid, req.body.comment, function(error, comment)
    {
        if(error)
        {
            res.redirect("back");
        }
        else
        {
            campground.findByIdAndUpdate(req.params.id,{
                $pull:{
                    comments: req.params.commentid
                }
            },function(error, foundcampground)
            { 
                if(error)
                {
                    
                }
                else
                {
                    res.redirect("/campgrounds/"+req.params.id);
                }
                
            });
            
        }
    });
    
});


router.delete("/campgrounds/:id/comments/:commentid", middleware.isCommentAuthorized, function(req, res)
{
    comment.findByIdAndRemove(req.params.commentid, function(error)
    {
        if(error)
        {
            res.redirect("back");
        }
        else
        {
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});


module.exports = router;