const mongoose = require('mongoose');

// This is to create a new user schema
const bcrypt = require('bcrypt');

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
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8,
        maxLength: 20,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    }
}, {timestamps: true});

// This is to hash the password before saving it to the database
userSchema.pre("save", async function(next) {
    // Extracting the user information
    const user = this;

    // Check if the password is changed
    if(!(user.isModified("password"))) {
        return next();
    }

    try {
        // It generates a salt for the password
        const salt = await bcrypt.genSalt(10);

        // Hash the password
        const hashedPassword = await bcrypt.hash(user.password, salt);

        // Assigned the hashed password to the user password
        user.password = hashedPassword;

        next();
    } 
    catch (error) {
        console.log(error);
    }
});

userSchema.methods.comparePassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } 
    catch (error) {
        console.log(error);
    }
}

// This is to save this schema as name "User" on the server
const User = mongoose.model("User", userSchema);

// This is to export the user model
module.exports = User;