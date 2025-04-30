const express  = require("express");
const router = express.Router();


// Post users route
router.post("/", async (req, res) => {
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
router.get("/", async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } 
    catch (error) {
        res.status(500).json({message: error});
    }
});

// Dynamic routing
// Quering and we do it by query parameters
router.get("/:id", async (req, res) => {
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
});

// Updating route
router.put("/:id", async (req, res) => {
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
});

// Deleting route
router.delete("/:id", async (req, res) => {
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
});

module.exports = router;