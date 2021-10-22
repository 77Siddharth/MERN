const express = require("express");
const {
  newOrder,
  getMyOrders,
  getSingleOrder,
  getAllOrders,
} = require("../Controllers/orderController");

const { isAuthenticatedUser, authorizeRoles } = require("../Middlewares/auth");

const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, getMyOrders);
router
  .route("/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

module.exports = router;
