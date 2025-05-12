const { generateToken, jwtAuth } = require("../middleware/auth.js");
const User = require("../model/user.model.js");

// This is to create a new user in the database
// Signup route function
const postRoute = async (req, res) => {
    try {
        // 1st step -> it creates a user
        const user = await User.create(req.body);
        //console.log(user);

        // 2nd step -> it generates a token A payload is defined
        // user -> username, email and role
        const payload = {
            username: user.username,
        }
        const token = await generateToken(payload);
        //console.log("This is the token", token);
        res.status(200).json({user: user, token: token});
    }
    catch (error) {
        res.status(500).json({message: error});
    }
};

// Login route
const loginRoute = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({username: username});
        if(!user) {
            return res.status(400).json({message: "User not found"});
        }

        // Check the password from bcrypt
        const isPasswordValid = await user.comparePassword(password);
        if(!isPasswordValid) {
            return res.status(400).json({message: "Username or Password is incorrect"});
        }

        const payload = {
            username: user.username,
        }
        const token = await jwtAuth.Verify(payload);
        // res.status(200).json({user: user, token: token});
        res.status(200).json("Successfully logged in");
    } 
    catch (error) {
        res.status(500).json({message: error});
    }
};

const getRoute = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } 
    catch (error) {
        res.status(500).json({message: error});
    }
};

const getID = async (req, res) => {
    try {
        // const {id} = req.params;
        // const user = await User.findById(id);
        // or we can ddo the below code
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } 
    catch (error) {
        res.status(500).json({message: error});
    }
};

const putID = async (req, res) => {
    try {
        // We made the changes here
        const user = await User.findByIdAndUpdate(req.params.id, req.body);

        if(!user) {
            res.status(404).json({message: "User not found"});
        }

        // Confirm the changes here
        const updatedUser = await User.findById(req.params.id);
        res.status(200).json(updatedUser);
    } 
    catch (error) {
        res.status(500).json({message: error});
    }
};

const deleteID = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if(!user || user.comparePassword(req.body.password)) {
            res.status(404).json({message: "Username or Password is incorrect"});
        }
        res.status(200).json({message: "User has been deleted successfully"});
    } 
    catch (error) {
        res.status(500).json({message: error});
    }
};

module.exports = { postRoute, loginRoute, getRoute, getID, putID, deleteID };