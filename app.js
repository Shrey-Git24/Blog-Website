//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "We are so happy to have you here ! You are now a part of a growing community of bloggers, who create, collaborate and connect with each other all over the world via SCIENCE OVERLOAD. In a world swamped with news and information it easy for scientific research to go unnoticed. This blog endeavours to highlight interesting research and potential new applications with a particular focus on the latest Research & Development in the field of Science & Technology.";
const aboutContent = "Science Overload is a science and technology blog for science professionals and general public. Our mission is dedicated to cover a wide range of published scientific findings and innovative developments in academia and research organisations. The blog explores the latest scientific discoveries in health and biomedical sciences, trends in plants biology, innovative techniques and technology, educational promotion and careers.Science Overload is one of the fast-growing, open access and popular platform that has apprehended our societies need. Since the beginning this has served several researchers from various institutions from India and around the globe to make ideas, new upcoming science available to general public not only for the handful of expert scientists. Our team at is on a unique scholarly pursuit and determined to make science available to every eager Indian mind and serve society in a cerebral way.";
const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Connected to Atlas
mongoose.connect("mongodb+srv://Test-123:Test123@blogwebsitecluster.atdb27n.mongodb.net/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}).then(posts => {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save();
  res.redirect("/");
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}).then(post => {
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {About: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {Contact: contactContent});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
