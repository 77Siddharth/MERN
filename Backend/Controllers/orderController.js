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


// Get Details about 1 order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate("user","name email");

    if(!order) return next(new ErrorHandler("No order with given ID" , 404))

    res.status(200).json({
        success:true,
        order
    });
});

//get myorders 

exports.getMyOrders = catchAsyncError(async (req, res, next) => {

    const orders  = await Order.find({user:req.user._id});

    if(!orders) return next(new ErrorHandler("No orders for you" , 404))

    res.status(200).json({
        success:true,
        orders
    });
});


// get All orders
exports.getAllOrders = catchAsyncError(async (req, res, next) => {

    const orders  = await Order.find();

    if(!orders) return next(new ErrorHandler("No orders" , 404))

    let totalAmount = 0;

    orders.forEach((order)=>{
        totalAmount+=order.totalPrice;
    });

    res.status(200).json({
        success:true,
        orders,
        totalAmount
    });
});
