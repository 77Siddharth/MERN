const User = require("../Models/userModel");
const ErrorHandler = require("../Utils/errorHandler");
const catchAsyncError = require("../Middlewares/catchAsyncError");
const sendToken = require("../Utils/jwtToken");
const sendEmail = require("../Utils/sendEmail.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.Avatar, {
    folder: "Avatars",
    width: 150,
    crop: "scale",
    public_id: `${Date.now()}`,
    resource_type: "auto",
  });

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  sendToken(user, res, 201);
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if both are eneterd;

  if (!email || !password)
    return next(new ErrorHandler("Please enter email or password"));

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid Email, PAsswords", 401));

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched)
    return next(new ErrorHandler("Invalid Email, PAsswords - 2", 401));

  sendToken(user, res, 200);
});

exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return next(new ErrorHandler("User not found ", 404));

  // Get reset password token

  const resetToken = user.getPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your Password reset Token is \n \n  ${resetPasswordUrl} \n \n Ignore, if this request was not raised by you.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Website Password Reset`,
      message,
    });
    res.status(200).json({
      success: true,
      message: "Email Sent ",
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // creating hash token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user)
    return next(
      new ErrorHandler(
        "Reset Password token is invalid is invalid or expired",
        404
      )
    );

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("password doesn't match confirmPassword", 404)
    );
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, res, 200);
});

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// UPDATE USER PASSSWORD
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");


  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
// old password matching with entered password
  if (!isPasswordMatched)
    return next(new ErrorHandler("Old PAssword is incorrect", 400));

  if(req.body.newPassword !== req.body.confirmPassword){
    return next(new ErrorHandler("PAssword does not match", 400));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user,res,200);
});

// update user profile

exports.updateProfile = catchAsyncError(async (req, res, next) => {


  const newUserData = {
    name : req.body.name,
    email : req.body.email
  }

  const user = await User.findByIdAndUpdate(req.user.id,newUserData,{new:true,runValidators:true});

  res.status(200).json({
    success:true
  })
});

// Get All Users ( admin )
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get Single user (admin)

exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if(!user)
    return next(new ErrorHandler(`Wrong User ID - ${req.params.id}`, 400));

  res.status(200).json({
    success: true,
    user,
  });
});

// update user Role (admin)
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name : req.body.name,
    email : req.body.email,
    role : req.body.role
  }

  const user = await User.findByIdAndUpdate(req.params.id,newUserData,{new:true,runValidators:true});
  if (!user)
    return next(
      new ErrorHandler(
        `Could not find user with given ID - ${req.params.id}`,
        404
      )
    );
  res.status(200).json({
    success:true
  })
});

// delete user (admin)
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user =await  User.findById(req.params.id);

  if(!user)
    return next(new ErrorHandler(`Wrong User ID for delete- ${req.params.id}`, 400));

  await user.remove();

  res.status(200).json({
    success:true,
    message:"User Removed"
  })
});
