const express = require("express");
const { newOrder } = require("../Controllers/orderController");

const { isAuthenticatedUser, authorizeRoles } = require("../Middlewares/auth");

const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);

module.exports = router;
