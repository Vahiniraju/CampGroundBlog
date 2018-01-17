var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo_2", {useMongoClient: true});

//POST - title, content

var Post = require("./models/post");
var User = require("./models/user")

// USER - email,name


// User.create({
//     name: "Karthik Vemula",
//     email: "karthik@vemula.edu"
// });

Post.create({
    title:"How to cook the best burger 4",
    content:"blah blah blah"
}, function(error, post)
{
    if(!error)
    {
        User.findOne({ email : "karthik@vemula.edu"}, function(error, user)
        {
            if(error)
            {
                console.log(error)
            }
            else
            {
                user.posts.push(post);
                user.save(function(error, user)
                {
                    if(error)
                    {
                        console.log(error)
                        
                    }
                    else
                    {
                        console.log(user);
                    }
                })
            }
        })
    }
})

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

// User.findOne({name: "Karthik Vemula"}, function(error, user)
// {
//     if(error)
//     {
//         console.log(error);
//     }
//     else
//     {
//         user.posts.push({
//             title: "3 Things I really hate",
//             content: "voldemart.   voldemart  Voldemart"
//         });
//         user.save(function(error, user)
//         {
//             if(error)
//             {
//                 console.log(error)
                
//             }
//             else
//             {
//                 console.log(user)
//             }
//         });
//     }
// });

// find all posts of one user

// User.findOne({ email: "karthik@vemula.edu"}).populate("posts").exec(function(error,user)
// {
//     if(error)
//     {
//         console.log(error)
//     }
//     else
//     {
//         console.log(user);
//     }
// });