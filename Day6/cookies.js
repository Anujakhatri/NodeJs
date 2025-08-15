
const cookieParser = require("cookie-parser");
const express=require("express");
const app= express();
app.use(cookieParser());


app.get("/", function(req, res) {
    res.cookie("name", "anuja");
    res.send("Cookie has been set");
     });

app.get('/read', function(req, res) {
    console.log(req.cookies);
    res.send("Cookies have been read");
});

app.listen(3000, ()  =>{
    console.log("Server is running on port 3000");
});
