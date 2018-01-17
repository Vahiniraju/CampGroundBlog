var express = require("express");
var app = express();
var bodyparser = require("body-parser"),
    mongoose = require("mongoose");
    
mongoose.connect("mongodb://localhost:/yelp_camp", { useMongoClient: true });

var campgroundschema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var campground = mongoose.model("campground", campgroundschema);

// campground.create({
//     name: "Grand Canon" ,
//     image: "https://farm4.staticflickr.com/3487/3753652204_a752eb417d.jpg" 
// }, function(error, campground)
// {
//   if(error)
//   {
//       console.log(error)
//   } else {
//       console.log("newly created campground");
//       console.log(campground);
//   }
// });

//  var campgrounds =[
//       {name: "Salmon Creek" , image: "https://farm8.staticflickr.com/7268/7121859753_e7f787dc42.jpg" },
//       {name: "Grand Canon" , image: "https://farm4.staticflickr.com/3487/3753652204_a752eb417d.jpg" },
//       {name: "Yellow Stone" , image: "https://farm9.staticflickr.com/8300/7930013108_cd3e432ba5.jpg" },
//       {name: "Salmon Creek" , image: "https://farm8.staticflickr.com/7268/7121859753_e7f787dc42.jpg" },
//       {name: "Grand Canon" , image: "https://farm4.staticflickr.com/3487/3753652204_a752eb417d.jpg" },
//       {name: "Yellow Stone" , image: "https://farm9.staticflickr.com/8300/7930013108_cd3e432ba5.jpg" },
//       {name: "Salmon Creek" , image: "https://farm8.staticflickr.com/7268/7121859753_e7f787dc42.jpg" },
//       {name: "Grand Canon" , image: "https://farm4.staticflickr.com/3487/3753652204_a752eb417d.jpg" },
//       {name: "Yellow Stone" , image: "https://farm9.staticflickr.com/8300/7930013108_cd3e432ba5.jpg" },
//       {name: "Smoky Mountains" , image: "https://farm4.staticflickr.com/3455/3753652218_266bca0b93.jpg" }
//       ] ;
       

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
    campground.findById(req.params.id, function(error, foundcampground)
    {
        if(error)
        {
            console.log("error in finding campground"+error)
        }else
        {
            res.render("show", { campground : foundcampground});
        }
    })
    
});

app.listen(process.env.PORT, process.env.IP, function()
{
    console.log("Yelp camp server started");
});