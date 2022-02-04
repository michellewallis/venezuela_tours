// MODULES
const User =  require('../models/userModel')
const jwt = require('jsonwebtoken')

// sign token function
const signToken = id =>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRES_IN,
});

}

// CONTROLLERS
// signup function
exports.signup = async (req, res) =>{

try {
    const newUser = await User.create(req.body);({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
});

//Create token
const token = signToken(newUser._id)


    res.status(201).json({
        status: "success",
        token,
        data:{user: newUser},
    })
} catch (error) {
    res.status(404).json({
        status:'fail',
        message: error,
    });
}
};

//login function
exports.login = async (req, res) =>{
    try {
        //destructuring email and password from req.body.object
    const {email, password} = req.body;

        // 1) check if email and password is passed
        if (!email || !password) {
            throw new Error('Debes introducir el email') 
        }

        // 2) check if user exist and password is correct
        const user = await User.findOne({ email }).select('+password');
       

        if (!user || !(await user.correctPassword(password, user.password))) {
            throw new Error('Email o contraseña incorrectos');
          }
        // 3) If everything is ok, send the token to client
        const token = signToken(user._id)
        res.status(200).json({
            status:"sucess",
            token,
        });
    } catch (error) {
        res.status(404).json({
            status:'fail',
            message: error,
        });
    }
}
