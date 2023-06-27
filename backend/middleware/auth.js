const ErrorHander = require("../utils/errorhander");
const catchAsuncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");


exports.isAuthenticatedUser = catchAsuncErrors(async (req, res, next) => {
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHander("Login first to access this resource.",401));
    }

    const decodedDate = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decodedDate.id);
    next();
});


exports.authorizeRoles = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next( 
                new ErrorHander(
                    `Role: ${req.user.role} is not allowed to access this resource.`,
                    403
                )
            );
        }
        
        next();
    }
}


