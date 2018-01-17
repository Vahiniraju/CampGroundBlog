var express = require("express");
var router = express.Router();
var campground = require("../models/campground");
var comment = require("../models/comment");
var mongoose = require("mongoose");
var middleware = require("../middleware");
router.get("/", function(req,res)
{
    res.render("campground/landing");
});

router.get("/campgrounds",function(req, res)
{
    campground.find({}, function(error, allcampground)
    {
        if(error)
        {
            res.redirect("back");
        }else
        {
          res.render("campground/index", {campgrounds : allcampground});
        }
    });

});


router.post("/campgrounds",middleware.isLoggedIn, function(req, res){
    var name= req.body.name;
    var price= req.body.price;
    var image = req.body.imageurl;
    var desc = req.body.desc;
    var author = {
        id : req.user._id,
        username : req.user.username
    };
   
    var newCamp = {name: name, price: price,image: image, description: desc, author: author };
    campground.create(newCamp, function(error, campground)
    {
        if(error)
        {
            res.redirect("back");
        }
        else
        {
            req.flash("success","Successfully Created Campground " + campground.name );
            res.redirect("/campgrounds");
        }
    });
});

router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res)
{
    res.render("campground/new");
});

router.get("/campgrounds/:id", function(req, res)
{
    campground.findById(req.params.id).populate("comments").exec(function(error, foundcampground)
    {
        if(error || !foundcampground)
        {
            req.flash("error","Campground not found");
            res.redirect("back");
        }else
        {
            res.render("campground/show", { campground : foundcampground});
        }
    });
    
});

router.get("/campgrounds/:id/edit",middleware.isAuthorized, function(req, res)
{
        campground.findById(req.params.id, function(error, campground)
        {
            if(error)
            {
                res.redirect("back");
            }
            else
            {
                res.render("campground/edit", { campground: campground});
            }
        });
    
});

router.put("/campgrounds/:id",middleware.isAuthorized, function(req, res)
{
    campground.findByIdAndUpdate(req.params.id, req.body.campground, function(error, campground)
    {
        if(error)
        {
            res.redirect("back");
        }
        else
        {
            req.flash("success","Successfully Updated Campground " + campground.name);
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

router.delete("/campgrounds/:id",middleware.isAuthorized, function(req, res)
{
    campground.findById(req.params.id, function(error, foundcampground)
    {
        if(error)
        {
            res.redirect("back");
        }
        else
        {
            comment.remove({_id: {$in: foundcampground.comments}}, function(error, result)
            {
                 if(error)
                 {
                     req.flash("error","Something went wrong");
                     res.redirect("back");
                 }
            });
            foundcampground.remove(function(error, deletedcampground)
            { 
                if(error)
                {
                    req.flash("error","Something went wrong");
                    res.redirect("back");
                }
                else
                {
                    res.redirect("/campgrounds");
                }
                
            });
            
        }
    });
});


module.exports = router;