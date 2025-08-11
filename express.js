//Import from express.js to check how to use express in Nodejs
import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000)

//routing
const express= require('express');
//const app =express();

app.get("/", function(req,res){
    res.send("you are my champian");
});
app.get("/profile", function(req,res){
    res.send("I am the best");
});
 app.listen(3000);


//request and response handling
app.use(function(req,res,next){
    console.log('middleware called');
    next();
});
app.use(function(req,res,next){
    console.log('middleware again called');
    next();
});

app.get("/", function(req,res){
    res.send("you are my champian");
});

app.get("/about", function(req,res){
    res.send("This is about page");
});

app.get("/profile", function(req,res){
    res.send("This is profile page");
});

app.listen(3000);

//Error Handling
app.use(function(req,res,next){
    console.log('middleware called');
    next();
});
app.use(function(req,res,next){
    console.log('middleware again called');
    next();
});

app.get("/", function(req,res){
    res.send("you are my champian");
});

app.get("/about", function(req,res){
    res.send("This is about page");
});

app.get("/profile", function(req,res,next){
    return next(new Error("Profile not found"))
});

app.listen(3000);

