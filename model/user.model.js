const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        // Type of input that a user can enter
        type: String,

        // If it is mandatory or not
        required: true,

        // If it is unique or not
        unique: true,

        // To remove the extra space
        trim: true,

        // It should not be case sensitive
        caseSensitive: false,

        // Minimum length of the username
        minLength: 5,

        // Maximum length of the username
        maxLength: 15
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,

        // String Validation
        match: /.+\@.+\..+/,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    }
}, {timestamps: true});

// This is to save this schema as name "User" on the server
const User = mongoose.model("User", userSchema);

// This is to export the user model
module.exports = User;