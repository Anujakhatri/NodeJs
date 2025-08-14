const express= require("express");
const app = express();
const userModel = require('./usermodel');

app.get('/', (req,res) => {
    res.send("Welcome to MongoDb Practice");
});

app.get('/create', async (req,res) => {
    let createduster = await userModel.create({
        name: "harsh",
        username: "harsh",        
        email: "harsh@gmail.com"
    });
    res.send(createduster);
});    
    
app.get('/update', async (req,res) => {
    try{
        let updateduser = await userModel.findOneAndUpdate(
            {username:"harsh"},
            {name:"harsh vandana"},
            {new:true}
        );
        if (!updateduser) {
            return res.status(404).send("User not found");
        }
        res.send(updateduser);

    }catch(error){
        console.error(error);
        res.status(500).send("Something went wrong");
    }
 });


app.listen(3000);