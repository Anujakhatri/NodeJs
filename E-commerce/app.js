const express=require ("express");
const app=express();

const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const path = require("path");
const ownersRouter= require("./routes/ownersRouter");
const productsRouter= require("./routes/productsRouter");
const usersRouter= require("./routes/usersRouter");

const db= require("./config/mongoose-connection");

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});

//  express routing with middleware
app.use("/owners", ownersRouter);
app.use("/users",usersRouter);
app.use("/products",productsRouter);

app.listen(3000);
// (),function(){
//     console.log("server is running on port 3000");
// });

