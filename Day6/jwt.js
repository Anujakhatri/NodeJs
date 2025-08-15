// bcrpt is a library package used for securely hashing and comparing passwords
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");

app.use(cookieParser());


app.get("/", function (req, res) {
    let token= jwt.sign({email:"anuja@example"},"secret");
    res.cookie("token", token);
    res.send("Done");
    console.log(token);
});

app.get("/read",function(req,res){
    let data= jwt.verify(req.cookies.token, "secret");
    console.log(data);
    res.send("Data has been read from cookie");
})

app.listen(3000);
