const http= require('http');

http.createServer((req,res)=>{
    res.write("This is anuja");
res.end("Heloo Anuja! This is my first server");
}).listen(4800);
