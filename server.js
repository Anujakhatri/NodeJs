const http= require('http');

http.createServer((req,res)=>{
    res.write("This is Anuja");
res.end("Heloo Server ! This is my first server");
}).listen(4800);
