const express = require('express');
const app = express();
const PORT = 3000;
const userRoutes = require("./routes/user.routes.js");
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

// These routes are for the USER MANAGEMENT from the database.
app.use("/api/users", userRoutes);

// Port Listener
app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}.`);
});
