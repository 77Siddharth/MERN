const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const ErrorHandler = require("../Utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  console.log("URL", req.url);
  console.log("Token", token);


  if (!token)
    return next(new ErrorHandler("Please login to access this page", 401));

  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decodedData.id);

  return next();
});


exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role - ${req.user.role} is not allowed to access`,
          403
        )
      );
    }
    // if user role doesnt' match with roles defined in roles array
    return next();
  };
};