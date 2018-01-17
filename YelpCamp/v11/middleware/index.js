
var middlewareObj = {};
var campground = require("../models/campground");
var comment = require("../models/comment");

middlewareObj.isLoggedIn = function(req, res, next){
     if(req.isAuthenticated())
    {
        return next();
    }
    req.flash("error","You need to be Logged In");
    res.redirect("/login");
};

middlewareObj.isAuthorized = function(req, res, next)
{
    if(req.isAuthenticated())
    {
        campground.findById(req.params.id, function(error, campground)
        {
            if(error || !campground)
            {
                req.flash("error","Campground not Found");
                res.redirect("back");
            }
            else
            {
                if(campground.author.id.equals(req.user._id))
                {
                    next();
                }
                else
                {
                    req.flash("error","You are not authorized to do that");
                    res.redirect("/campgrounds/"+ campground._id);
                }
            }
        });
    }
    else
    {   
         req.flash("error","You need to be Logged In");
         res.redirect("/login");
    }
    
};


middlewareObj.isCommentAuthorized = function(req, res, next)
{
     if(req.isAuthenticated())
    {
        campground.findById(req.params.id, function(error, foundcampground)
        {
            
            if(error || !foundcampground)
            {
                console.log(req.params.id);
                req.flash("error","Campground not found");
                res.redirect("back")
            }
            else
            {
                comment.findById(req.params.commentid, function(error, comment)
                {
                    if(error || !comment)
                    {
                        req.flash("error","Comment not found")
                        res.redirect("/campgrounds/"+ req.params.id);
                    }
                    else
                    {
                        if(comment.author.id.equals(req.user._id))
                        {
                            next();
                        }
                        else
                        {
                            req.flash("error","You are not authorized to do that")
                            res.redirect("/campgrounds/"+ req.params.id);
                        }
                }
                });
            }
        });
        
    }
        else
        {
            req.flash("error","You need to be Logged In");
             res.redirect("/login");
        }
        
};



module.exports = middlewareObj;