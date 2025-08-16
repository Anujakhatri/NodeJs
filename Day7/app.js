const express = require('express');
const app=express();
const cookieParser = require("cookie-parser");
const userModel= require('./models/user');
const postModel= require('./models/post');


app.get("/", (req, res) => {
  res.send("Hello World");
});

 app.get("/create", async function(req, res) {
    let user = await userModel.create({
        username:"sita",
        email:"sita435@gmail.com",
        age: 25,
        posts: []
    });
    res.send(user);
});

app.get('/post/create', async function(req, res) {
    // Ensure that the user ID exists in the database before creating a post
    let post = await postModel.create({
        postdata: "This is a sample post",
        user: "689f75e9391e1f9fc8e0d75a" // Replace with a valid user ID
    });

    // Find the user and add the post ID to the user's posts array
    let user= await userModel.findOne({_id: '689f75e9391e1f9fc8e0d75a'}); 
    //link post to user's posts array
    user.posts.push(post._id);
    //save the updated user document
    await user.save(post,user);
       
    res.send({post,user});
});

 app.listen(3000, () => {
  console.log("Server is running on port 3000");
});