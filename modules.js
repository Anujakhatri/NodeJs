// core modules
const fs=require('fs');
fs.writeFileSync("dummy.txt", "This the the demo project which i wanna applied to the dummy modules") ;




const {log}=require('console');
const os=require('os');
console.log(os.platform());
console.log(os.hostname());
console.log(os.cpus());

//object in nodejs

console.log("abc");
console.log(process.cwd());
console.warn(process.pid);

const { log, warn } = require('console');
log("custom log");
warn("custom warn");