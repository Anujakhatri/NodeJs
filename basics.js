// fundamentals of Javascript:
// arrays and objects
//fuction return
//async is coding
//foreach map filter find indexOf

// alert("Hello World");

//arrays
var arr=[1,2,3,4];
arr.forEach(function(val){
    console.log(val +" Hello");
})


//map function
var newarray = arr.map(function(val){
    return 13;
})

console.log(newarray);

const user = {
  name: 'Anuja',
  age: 25,
  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
};

user.greet(); 