const ErrorHander = require("../utils/errorhander");
const catchAsuncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

// Register a user => /api/v1/register
exports.registerUser = catchAsuncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id: "this is a sample id",
            url: "profilepicUrl"
        }
    });
    sendToken(user, 201, res);
});

// Login User => /api/v1/login
exports.loginUser = catchAsuncErrors(async (req, res, next) => {
    const {email, password} = req.body;

    // checking if user has given email and pass both
    if(!email || !password) {
        return next(new ErrorHander("Please enter email and password", 400));
    }
    const user = await  User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHander("Invalid email or password", 401));
    }

    const isPasswordMatched = user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHander("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
})



// Logout user => /api/v1/logout
exports.logout = catchAsuncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged out",
    })
})













