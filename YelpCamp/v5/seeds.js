var mongoose = require("mongoose"),
    campground = require("./models/campground"),
    comment    = require("./models/comment"),
    data       = [
        {
            name: "Cloud's Rest",
            image: "https://farm8.staticflickr.com/7268/7121859753_e7f787dc42.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },       {
            name: "Yellow Stone",
            image: "https://farm4.staticflickr.com/3487/3753652204_a752eb417d.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },       {
            name: "Los Angles",
            image: "https://farm9.staticflickr.com/8300/7930013108_cd3e432ba5.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }
        ];
    
    
function seedDB()
{
    campground.remove({},function(error)
    {
        if(error)
        {
            console.log(error);
        }
        else
        {
            console.log("Campgrounds removed");
            data.forEach(function(seed)
            {
                 campground.create(seed, function(error, campcreated)
                 {
                     if(error)
                     {
                         console.log(error)
                     }
                     else
                     {
                         console.log(campcreated);
                         // create a comment in call back
                         comment.create({
                                         text: " This place is great but i wish if their was an internet",
                                         author:"durga"
                                         }, function(error, comment)
                                         {
                                             if(error)
                                             {
                                                 console.log(error);
                                             }
                                             else
                                             {
                                                 campcreated.comments.push(comment);
                                                 campcreated.save();
                                                 console.log("created new comment");
                                             }
                                         });
                         
                     }
                 });
            });
        }
          
    });

}

module.exports = seedDB;