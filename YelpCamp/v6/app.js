var express = require("express");
var app = express();
var bodyparser = require("body-parser"),
    mongoose = require("mongoose"),
    seedDB   = require("./seeds"),
    passport = require("passport"),
    localStrategy = require("passport-local");
var campground = require("./models/campground"),
    comment    = require("./models/comment"),
    user       = require("./models/user");
    
    
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:/yelp_camp_3", { useMongoClient: true });
app.use(express.static(__dirname+ "/public"));

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

app.get("/", function(req,res)
{
    res.render("campground/landing");
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
          res.render("campground/index", {campgrounds : allcampground});
        }
    });

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
    res.render("campground/new");
});

app.get("/campgrounds/:id", function(req, res)
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

app.get("/campgrounds/:id/comments/new",isLoggedIn ,function(req,res)
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

app.post("/campgrounds/:id/comments", isLoggedIn ,function(req,res)
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


app.get("/register", function(req, res)
{
    res.render("user/register");
});

app.post("/register", function(req, res)
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


app.get("/login", function(req, res)
{
    res.render("user/login");
});

app.post("/login",passport.authenticate("local", 
{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res)
{
    
});

app.get("/logout", function(req,res)
{
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next)

{
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect("/login")
}


app.listen(process.env.PORT, process.env.IP, function()
{
    console.log("Yelp camp server started");
});