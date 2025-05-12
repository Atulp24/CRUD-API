const express  = require("express");
const User = require("../model/user.model.js");
const { generateToken, jwtAuth } = require("../middleware/auth.js")

// Destructure the controllers from the controllers file
const { postRoute, getRoute, getID, putID, deleteID, loginRoute } = require("../controllers/user.controllers.js");

// Router helps in managing the routes for a particular category
const router = express.Router();

// Signup page
// Post users route
router.post("/signup", postRoute);

// Login route
router.post("/login", loginRoute);

// Get users route
router.get("/", getRoute);

// Dynamic routing
// Quering and we do it by query parameters
router.get("/:id", jwtAuth, getID);

// Updating route
router.put("/:id", putID);

// Deleting route
router.delete("/:id", deleteID);

module.exports = router;