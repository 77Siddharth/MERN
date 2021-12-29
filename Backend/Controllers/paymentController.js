const catchAsyncError = require("../Middlewares/catchAsyncError");

const stripe = require("stripe")(
  "sk_test_51I9bzpKEE1ab6pQBPGXqKkR5dhOKh3V456l7cmDFkhKMCXMe1B7zOpt1nM0oznMdEA3rbCeVk6rpg45gyO8U3mmN00hANU7FwY"
);

exports.processPayment = catchAsyncError(async (req, res, next) => {
  try {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "RTC_store",
      },
    });
    res
      .status(200)
      .json({ success: true, client_secret: myPayment.client_secret });
  } catch (error) {
    console.log("error, mypayment", error);
  }
});

exports.sendStripeApiKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_PUBLISH_KEY });
});
