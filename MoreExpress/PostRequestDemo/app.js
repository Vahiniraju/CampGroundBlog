var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));
var friends = ["varun","sandeep","ramya","haritha","sowjanya","rajeev","aditya"];


app.get("/", function(req,res)
{
    res.render("home");
});

app.get("/friends", function(req,res)
{
    res.render("friends",{ friends: friends})
});


app.post("/addfriend", function(req,res)
{
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.render("friends",{friends: friends});
})

app.listen(process.env.PORT, process.env.IP, function()
{
    console.log("Server is listening");
})