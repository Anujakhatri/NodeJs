//file system

const fs = require('fs');
//writeFile
fs.writeFile('backup.txt',"you can do it! ",function(err){
    if(err) console.error(err.message);
    else console.log("done");
})

//appendFile
fs.appendFile("backup.txt", " You are really good!", function(err){
    if(err) console.error(err.message);
    else console.log("appended");
})

//copyFile
fs.copyFile("backup.txt", "./copy/copy.txt", function(err){
    if(err) console.error(err.message);
    else console.log("copied");
})


//renameFile
fs.rename("backup.txt", "renamed.txt", function(err){
    if(err) console.error(err.message);
    else console.log("succesesfully renamed");
})

//DeleteFile
fs.unlink("./copy/copy.txt",function(err){
    if(err) console.error(err.message);
    else console.log("successfully deleted");
})

 //ReadFile
fs.readFile("renamed.txt",function(err){
    if(err) console.error(err.message);
    else console.log("read successfully");
})

//Makedirectory
fs.mkdir("work",function(err){
    if(err) console.error(err.message);
    else console.log("created");
})