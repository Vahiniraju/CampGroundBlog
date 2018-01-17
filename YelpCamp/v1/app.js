var express = require("express");
var app = express();
var bodyparser = require("body-parser");
 var campgrounds =[
       {name: "Salmon Creek" , image: "https://farm8.staticflickr.com/7268/7121859753_e7f787dc42.jpg" },
       {name: "Grand Canon" , image: "https://farm4.staticflickr.com/3487/3753652204_a752eb417d.jpg" },
       {name: "Yellow Stone" , image: "https://farm9.staticflickr.com/8300/7930013108_cd3e432ba5.jpg" },
       {name: "Salmon Creek" , image: "https://farm8.staticflickr.com/7268/7121859753_e7f787dc42.jpg" },
       {name: "Grand Canon" , image: "https://farm4.staticflickr.com/3487/3753652204_a752eb417d.jpg" },
       {name: "Yellow Stone" , image: "https://farm9.staticflickr.com/8300/7930013108_cd3e432ba5.jpg" },
       {name: "Salmon Creek" , image: "https://farm8.staticflickr.com/7268/7121859753_e7f787dc42.jpg" },
       {name: "Grand Canon" , image: "https://farm4.staticflickr.com/3487/3753652204_a752eb417d.jpg" },
       {name: "Yellow Stone" , image: "https://farm9.staticflickr.com/8300/7930013108_cd3e432ba5.jpg" },
       {name: "Smoky Mountains" , image: "https://farm4.staticflickr.com/3455/3753652218_266bca0b93.jpg" }
       ] ;
       

app.use(bodyparser.urlencoded({extented:true}));
app.set("view engine","ejs");

app.get("/", function(req,res)
{
    res.render("landing");
});

app.get("/campgrounds",function(req, res)
{
  
       res.render("campground", {campgrounds : campgrounds});
});

app.get("/campgrounds/new", function(req, res)
{
    res.render("new.ejs");
});

app.post("/campgrounds",function(req, res){
    var name= req.body.name;
    var image = req.body.imageurl;
    var newCamp = {name: name, image: image };
    campgrounds.push(newCamp);
   res.redirect("/campgrounds") ;
});


app.listen(process.env.PORT, process.env.IP, function()
{
    console.log("Yelp camp server started");
});