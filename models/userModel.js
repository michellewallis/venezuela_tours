// MODULES
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

// Mongoose Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Introduce tu nombre"],
    },
    email: {
        type: String,
        required: [true, "Introduce un email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "el email introducido no es correcto"],
    },
    photo: String,
    password: {
        type: String,
        required: [true, "introduce una contraseña"],
        minlength: 8,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, "confirma la contraseña"],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: "Las contraseñas no coinciden",
        },
    },
});

// mongoose moddlewares
userSchema.pre("save", async function (next) {
    // if password field is not modified
    if (!this.isModified("password")) return next();
    //if password is create or modified, ecncrip the password
    this.password = await bcrypt.hash(this.password, 12); // metho bcrypt
    // delete passwordConfirm from document
    this.passwordConfirm = undefined;
    next();
});

//MONGOOSE INSTANCE METHOD
userSchema.methods.correctPassword = async function (
    bodyPassword,
    userPassword
) {
    return await bcrypt.compare(bodyPassword, userPassword);
};

//MONGOOSE MODEL
const User = mongoose.model("User", userSchema);

// Export model
module.exports = User;
