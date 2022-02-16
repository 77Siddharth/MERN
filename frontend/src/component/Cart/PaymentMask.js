import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect } from "react";
import { useState } from "react";
import Loader from "../layout/Loader/Loader";
import Payment from "./Payment";

function PaymentMask() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeApiKey");
    setStripeApiKey(data.stripeApiKey);
    console.log(stripeApiKey, "thisis");
  }

  useEffect(() => {
    getStripeApiKey();
  }, [stripeApiKey]);

  return stripeApiKey ? (
    <Elements stripe={loadStripe(stripeApiKey)}>
      <Payment />
    </Elements>
  ) : (
    <Loader />
  );
}

export default PaymentMask;
