const express= require("express");
const app=express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));// use can use public file

app.set("view engine","ejs"); //you can do rendering with ejs

app.get("/", function(req,res){
    res.render("index"); //rendering index.ejs file
});

//creating a dynamic route with : symbol
app.get("/profile/:username", function(req,res){

    //accessing the dynamic parameter( now username acts as a variable in a raouting can can click any name on that in the server)
    res.send(`Welcome, ${req.params.username}`);
});

app.get("/author/:username/:age", function(req,res){
    res.send(`Welcome, ${req.params.username} of age ${req.params.age}`);
});


app.listen(3000, function(){
    console.log("server is running on port 3000");
})