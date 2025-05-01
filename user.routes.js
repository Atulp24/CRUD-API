const express  = require("express");
const User = require("../model/user.model.js");

// Destructure the controllers from the controllers file
const { postRoute, getRoute, getID, putID, deleteID } = require("../controllers/user.controllers.js");

// Router helps in managing the routes for a particular category
const router = express.Router();


// Post users route
router.post("/", postRoute);

// Get users route
router.get("/", getRoute);

// Dynamic routing
// Quering and we do it by query parameters
router.get("/:id", getID);

// Updating route
router.put("/:id", putID);

// Deleting route
router.delete("/:id", deleteID);

module.exports = router;
