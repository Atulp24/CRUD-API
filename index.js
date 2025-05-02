const express = require('express');
const app = express();
const PORT = 3000;

// This is to parse the incoming request body as JSON
app.use(express.json()); 

// Mongoose is the driver that helps us to interact with the database and make sure that the data is properly validated and structured
const mongoose = require('mongoose');
const User = require('./model/user.model.js');
const DBurl = "mongodb+srv://apk200209:Q6yQKe5SmoHpjFkd@cluster0.zfdcjgm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(DBurl)
    .then(() => console.log("Database has been connected!"))
    .catch((err) => console.log("Database is not able to connect!"));

// Home Route
app.get("/", (req, res) => {
    res.send("<h1>Welcome to the best CRUD API ever!</h1><br> <p>This CRUD API is built using Node.JS Express and MongoDB.</p>");
});

// Post users route
app.post("/api/users", async (req, res) => {
    try {
        const user = await User.create(req.body);
        console.log(user);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({message: error});
    }
});

// Get users route
app.get("/api/users", (req, res) => {
    res.send("This is the get users route");
});

// Port Listener
app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}.`);
});