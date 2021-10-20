const Order = require("../Models/orderModel");
const Product = require("../Models/productModel");
const ErrorHandler = require("../Utils/errorHandler");
const catchAsyncError = require("../Middlewares/catchAsyncError");

exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    shippingPrice,
    paymentInfo,
    orderItems,
    totalPrice,
    itemsPrice,
    taxPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    shippingPrice,
    paymentInfo,
    orderItems,
    totalPrice,
    itemsPrice,
    taxPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});
