// MODULES
const User =  require('../models/userModel')

// CONTROLLERS
// signup function
exports.signup = async (req, res) =>{

try {
    const newUser = await User.create(req.body);
    res.status(201).json({
        status: "success",
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