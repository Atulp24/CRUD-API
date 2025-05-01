const User = require("../model/user.model.js");


const postRoute = async (req, res) => {
    try {
        const user = await User.create(req.body);
        console.log(user);
        res.status(200).json(user);
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
        if(!user) {
            res.status(404).json({message: "User not found"});
        }
        res.status(200).json({message: "User has been deleted successfully"});
    } 
    catch (error) {
        res.status(500).json({message: error});
    }
};

module.exports = { postRoute, getRoute, getID, putID, deleteID };