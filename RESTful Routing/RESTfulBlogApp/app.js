var bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    expresssanitizer = require("express-sanitizer"),
    methodoverride = require("method-override"),
    express    = require("express"),
    app        = express();

app.use(methodoverride("_method"));    
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(expresssanitizer());

mongoose.connect("mongodb://localhost/restful_blog_app", { useMongoClient: true });

var blogschema = mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created: {type: Date, default: Date.now}
});

var blogpost = mongoose.model("blogpost", blogschema);

// blogpost.create({
//     title: "Test Blog",
//     image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=2850&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
//     body: "Beautiful Scenary",
// });

app.get("/", function(req,res)
{
    res.redirect("/blogs");
});

app.get("/blogs", function(req,res)
{
    blogpost.find({}, function(error, allblogposts)
    {
        if(error)
        {
            console.log(error);
        } else
        {
            res.render("index", {blogpost: allblogposts});
        }
    });
});

app.get("/blogs/new", function(req,res)
{
    res.render("new");
});

app.post("/blogs", function(req,res)
{
    req.body.blog.body = req.sanitize(req.body.blog.body);
    blogpost.create(req.body.blog, function(error, newblog)
    {
        if(error)
        {
            res.render("new");
        }
        else
        {
            res.redirect("/blogs");
        }
    });
});

app.get("/blogs/:id", function(req,res)
{
   blogpost.findById(req.params.id, function(error, foundblog)
   {
       if(error)
       {
           console.log(error);
       }
       else
       {
           res.render("show",{blog: foundblog});
       }
   }) ;
});

app.get("/blogs/:id/edit", function(req,res)
{
    blogpost.findById(req.params.id,function(error, foundblog)
    {
        if(error)
        {
            console.log(error);
        }
        else
        {
            res.render("edit",{blog: foundblog});
        }
    });
    
});

app.put("/blogs/:id",function(req,res)
{
    req.body.blog.body = req.sanitize(req.body.blog.body);
    blogpost.findByIdAndUpdate(req.params.id, req.body.blog, function(error, updatedblog)
    {
        if(error)
        {
            console.log(error);
        }
        else
        {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

app.delete("/blogs/:id",function(req,res)
{
    blogpost.findByIdAndRemove(req.params.id, req.body.blog, function(error, updatedblog)
    {
        if(error)
        {
            console.log(error);
        }
        else
        {
            res.redirect("/blogs");
        }
    });
});

app.listen(process.env.PORT,process.env.IP, function()
{
    console.log("Blogpost app started");
});
