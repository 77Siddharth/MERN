const Product = require("../Models/productModel");

// create Product -- ADMIN

exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};

exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product)
    return res.status(500).json({
      success: false,
      message: "Product Not Found",
    });

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
};

exports.getAllProducts = async (req, res) => {
  const allProducts = await Product.find();

  res.status(200).json({
    success: true,
    allProducts,
  });
};

exports.deleteProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product)
    return res.status(500).json({
      success: false,
      message: "Product Not Found",
    });

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
};

exports.getProductDetail = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product)
    return res.status(500).json({
      success: false,
      message: "Product Not Found",
    });

  res.status(200).json({
    success: true,
    product,
  });
};
