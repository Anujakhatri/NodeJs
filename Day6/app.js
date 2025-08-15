
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

app.get("/", function (req, res) {
    // for creating a password using bcrypt
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash("polioo", salt, function (err, hash) {
            console.log(salt);
            console.log(hash);
            res.send("Password has been hashed. Check console.");
        });
    });
});

// Load hash from your password DB.
bcrypt.compare("polioo", "$2b$10$JB/LpZ8U9VmNN1XAnY.1v.hhYjmr7ImhVQzSKwCjMMFT02LWwGqDi" , function(err, result) {
    // result == true
    console.log("Password match:", result);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
