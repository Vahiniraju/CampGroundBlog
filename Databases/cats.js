var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app",{ useMongoClient: true });
mongoose.Promise = global.Promise;

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// var george = new Cat({
//     name: "Norris",
//     age: 7,
//     temperament: "Evil"
    
// });

// george.save(function(error, cat)
// {
//     if(error)
//     {
//         console.log("something went wrong");
//     }
//     else
//     {
//         console.log("we just save a cat to db");
//         console.log(cat);
//     }
// })

// //adding a cat to database

Cat.find({}, function(error, cats){
    if(error)
    {
        console.log("oh no!! error");
        console.log(error);
    }
    else
    {
        console.log("all cats");
        console.log(cats);
    }
})