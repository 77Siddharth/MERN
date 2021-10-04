const Product = require("../Models/productModel");
const ErrorHandler = require("../Utils/errorHandler");
const catchAsyncError = require("../Middlewares/catchAsyncError");
// create Product -- ADMIN

exports.createProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler("Page not Found", 404));

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

exports.getAllProducts = catchAsyncError(async (req, res) => {
  const allProducts = await Product.find();

  res.status(200).json({
    success: true,
    allProducts,
  });
});

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler("Page not Found", 404));

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

exports.getProductDetail = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler("Page not Found", 404));

  res.status(200).json({
    success: true,
    product,
  });
});
