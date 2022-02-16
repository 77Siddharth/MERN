import React, { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Typography } from "@material-ui/core";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import CheckoutSteps from "./CheckoutSteps";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./Payment.css";
import { useAlert } from "react-alert";
import { clearErrors, createOrder } from "../../actions/orderAction";
import { useHistory } from "react-router-dom";

function Payment() {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const newOrder = useSelector((state) => state.newOrder);
  const [loading, setLoading] = useState(false);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeApiKey");
    setStripeApiKey(data.stripeApiKey);
    console.log(stripeApiKey, "thisis");
  }

  useEffect(() => {
    if (newOrder.error) {
      dispatch(clearErrors());
    }
    getStripeApiKey();
  }, [newOrder.error, stripeApiKey, dispatch, alert, loading]);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    shippingPrice: orderInfo.shippingCharges,
    orderItems: cartItems,
    totalPrice: orderInfo.totalPrice,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;
      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              country: shippingInfo.country,
              postal_code: shippingInfo.pinCode,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        setLoading(false);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          setLoading(false);
          alert.success("Payment Success");
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          console.log("orderDetails", order);
          localStorage.removeItem("cartItems");
          dispatch(createOrder(order));
          history.push("/success");
        } else {
          setLoading(false);
          alert.error("some issue occured while payment");
        }
      }
    } catch (error) {
      setLoading(false);
      alert.error("Error at payment");
      console.log("Payment error :", error);
      payBtn.current.disabled = false;
    }
  };
  return (
    <>
      <MetaData title={"Payment"} />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
          {loading ? <p>Payment Processing ...</p> : ""}
        </form>
      </div>
    </>
  );
}

export default Payment;
