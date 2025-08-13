const express= require("express");
const app= express();
const path =require("path");
const fs = require('fs');

app.set("view engine", "ejs");
//use middleware 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname , "public")));

app.get('/', function(req,res){
    fs.readdir(`./files`, function(err,files){
        res.render("index", {files:files}); //1st file is a key name of property that i sending to the template, 2nd is the filenames inside my files folder.

    });
    
});
//creating a route for form submission
app.post('/create', function(req,res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err){
        res.redirect('/');
    });
    
    
});
//creating a route for reading a file
app.get('/file/:filename', function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8", function(err,filedata){
        res.render('show', {filename: req.params.filename, filedata : filedata});
        
    });

});
// creating a route for editing a file
app.get('/edit/:filename', function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8", function(err,filedata){
        if(err) {
            return res.redirect('/');
        }
        res.render('edit', {filename: req.params.filename, filedata : filedata});
    });
});
    
//creating a route for update a file
app.post('/edit/:filename', function(req, res) {
    const oldPath = `./files/${req.params.filename}`;
    const newPath = `./files/${req.body.newFilename}`;
    const updatedData = req.body.updates;

    fs.rename(oldPath, newPath, function(err) {
        if (err) {
            return res.redirect('/');
        }
        fs.writeFile(newPath, updatedData, function(err) {
            if (err) {
                return res.redirect('/');
            }
            res.redirect('/');
        });
    });
});


//creating a route for deleting a file
app.post('/delete/:filename', function(req, res) {
    const filePath = `./files/${req.params.filename}`;
    fs.unlink(filePath, function(err) {
        if (err) {
            console.error("Error deleting file:", err);
        }
        res.redirect('/');
    });
});


app.listen(3000);