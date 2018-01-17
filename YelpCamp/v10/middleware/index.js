
var middlewareObj = {};
var campground = require("../models/campground");
var comment = require("../models/comment")

middlewareObj.isLoggedIn = function(req, res, next){
     if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect("/login");
};

middlewareObj.isAuthorized = function(req, res, next)
{
    if(req.isAuthenticated())
    {
        campground.findById(req.params.id, function(error, campground)
        {
            if(error)
            {
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
                    res.redirect("back");
                }
            }
        });
    }
    else
    {
         res.redirect("back");
    }
    
};


middlewareObj.isCommentAuthorized = function(req, res, next)
{
     if(req.isAuthenticated())
    {
        comment.findById(req.params.commentid, function(error, comment)
        {
            if(error)
            {
                res.redirect("back");
            }
            else
            {
                if(comment.author.id.equals(req.user._id))
                {
                    next();
                }
                else
                {
                    res.redirect("back");
                }
            }
        });
    }
    else
    {
         res.redirect("back");
    }
    
};



module.exports = middlewareObj;