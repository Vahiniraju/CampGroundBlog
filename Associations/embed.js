var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo", {useMongoClient: true});

//POST - title, content

var postSchema = new mongoose.Schema({
    title:String,
    content:String
  
});

var Post = mongoose.model("Post", postSchema);

// USER - email,name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var User = mongoose.model("User", userSchema);




// var newUser = new User({
//     email: "karthik@vemula.edu",
//     name: "Karthik Vemula"
// });


// newUser.posts.push({
//     title: "How to bre polyjuice potion",
//     content: "Just kidding. Go to potions class to learn it!"
// })
// newUser.save(function(error, user)
// {
//     if(error)
//     {
//         console.log(error)
//     }
//     else
//     {
//         console.log(user);
//     }
// })

// var newPost = new Post({
//     title: "Reflections on apples",
//     content:"they are delicious"
// })
// newPost.save(function(error, post)
// {
//     if(error)
//     {
//         console.log(error)
//     }
//     else
//     {
//         console.log(post);
//     }
// })

User.findOne({name: "Karthik Vemula"}, function(error, user)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        user.posts.push({
            title: "3 Things I really hate",
            content: "voldemart.   voldemart  Voldemart"
        });
        user.save(function(error, user)
        {
            if(error)
            {
                console.log(error)
                
            }
            else
            {
                console.log(user)
            }
        });
    }
});

