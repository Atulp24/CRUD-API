const { request } = require('express');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "this is a secret key that you should not tell anyone about";

// This route would be called for the users that are already registered and been to be authenticated
const jwtAuth = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if(!token) {
        return res.status(401).json({message: "No token provided"});
    }
    try {
        // It verifies the token that comes with the request
        const verifiedToken = await jwt.verify(token, JWT_SECRET);

        // It validates the user
        req.user = verifiedToken;

        // It continues with the next function
        next();
    } 
    catch (error) {
        return res.status(401).json({message: "Invalid Token"});
    }
}

// Bearer token
// -request
//     -header
//         -authorization
//             -"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
//             eyJ1c2VybmFtZSI6IlZpcmF0X0tvaGxpIiwiZW1haWwiOiJjaGlrb29AY3JpY2tldC5jb20iLCJpYXQiOjE3NDY3MDcwODIsImV4cCI6MTc0Njc5MzQ4Mn0.
//             UED2V_rtO1n62BdHn7YVVO8_nN8ZUDxuW5uDd9GKLy8"
//     -body
//         -user data

// jsonwebtoken peovides us with 2 important functions
// jwt.sign() -> generates a token
// jwt.sign() -> has 3 arguements -> payload, secret-key, options
// payload -> user data
const generateToken = (user) => {
    return jwt.sign(user, JWT_SECRET, {expiresIn: '1d'});
}

module.exports = { generateToken, jwtAuth };