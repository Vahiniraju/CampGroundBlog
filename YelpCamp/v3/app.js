var express = require("express");
var app = express();
var bodyparser = require("body-parser"),
    mongoose = require("mongoose"),
    seedDB   = require("./seeds");
    
seedDB();
    
mongoose.connect("mongodb://localhost:/yelp_camp_3", { useMongoClient: true });

var campground = require("./models/campground"),
    comment    = require("./models/comment");




app.use(bodyparser.urlencoded({extented:true}));
app.set("view engine","ejs");

app.get("/", function(req,res)
{
    res.render("landing");
});

app.get("/campgrounds",function(req, res)
{
    campground.find({}, function(error, allcampground)
    {
        if(error)
        {
            console.log(error);
        }else
        {
          res.render("index", {campgrounds : allcampground});
        }
    })

});


app.post("/campgrounds",function(req, res){
    var name= req.body.name;
    var image = req.body.imageurl;
    var desc = req.body.desc;
    var newCamp = {name: name, image: image, description: desc };
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

app.get("/campgrounds/new", function(req, res)
{
    res.render("new");
});

app.get("/campgrounds/:id", function(req, res)
{
    campground.findById(req.params.id).populate("comments").exec(function(error, foundcampground)
    {
        if(error)
        {
            console.log("error in finding campground"+error)
        }else
        {
            console.log(foundcampground);
            res.render("show", { campground : foundcampground});
        }
    })
    
});

app.listen(process.env.PORT, process.env.IP, function()
{
    console.log("Yelp camp server started");
});