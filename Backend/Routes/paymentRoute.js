const express = require("express");
const router = express.Router();
const {
  processPayment,
  sendStripeApiKey,
} = require("../Controllers/paymentController");
const { isAuthenticatedUser } = require("../Middlewares/auth");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/stripeApiKey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports = router;
