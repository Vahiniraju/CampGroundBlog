var express = require("express");
var app = express();
var sounds={
    cow : "Moo",
    pig : "Oink",
    dog : "Woof Woof",
    cat : "Meow Meow",
    parrot: "peck peck"
}
app.get("/",function(req,res)
{
   res.send("Hi!!") 
});

app.get("/speak/:animal",function(req,res)
{
    var animal1 = req.params.animal;
    res.send("The " + animal1 + " says '" + sounds[animal1] + "'")
});

app.get("/repeat/:word/:number",function(req,res)
{
    var string = req.params.word;
    var num = Number(req.params.number);
     var final = "";
    for(var i = 0; i < num ; i++)
    {
         final += string + " ";
    }
    res.send(final);
});

app.get("*",function(req,res)
{
    res.send("Page not found.... What are you doing with your life!!");
});


app.listen(process.env.PORT,process.env.IP,function()
{
    console.log("server has started!!");  
});