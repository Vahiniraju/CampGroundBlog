var express = require("express");
var router = express.Router();
var campground = require("../models/campground");

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
            console.log(error);
        }else
        {
          res.render("campground/index", {campgrounds : allcampground});
        }
    });

});


router.post("/campgrounds",isLoggedIn, function(req, res){
    var name= req.body.name;
    var image = req.body.imageurl;
    var desc = req.body.desc;
    var author = {
        id : req.user._id,
        username : req.user.username
    }
    console.log(author);
    var newCamp = {name: name, image: image, description: desc, author: author };
    campground.create(newCamp, function(error, campground)
    {
        if(error)
        {
            console.log(error);
        }
        else
        {
      
            res.redirect("/campgrounds");
        }
    });
});

router.get("/campgrounds/new", isLoggedIn, function(req, res)
{
    res.render("campground/new");
});

router.get("/campgrounds/:id", function(req, res)
{
    campground.findById(req.params.id).populate("comments").exec(function(error, foundcampground)
    {
        if(error)
        {
            console.log(error);
        }else
        {
            res.render("campground/show", { campground : foundcampground});
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