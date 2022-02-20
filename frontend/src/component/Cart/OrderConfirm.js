import { Typography } from "@material-ui/core";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOAD_USER_REQUEST } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import "./OrderConfirm.css";

function OrderConfirm({ history }) {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax + shippingCharges;
  const address = `${shippingInfo.address} , ${shippingInfo.city} , ${shippingInfo.state} , ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      totalPrice,
      subtotal,
      tax,
      shippingCharges,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    history.push("/process/payment");
  };
  useEffect(() => {
    if (!user) {
      dispatch({ type: LOAD_USER_REQUEST });
    }
  }, [dispatch, user]);
  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmShippingArea">
            <Typography>Shipping Info</Typography>
            <div>
              <p>Name:</p>
              <span>{user.name}</span>
            </div>
            <div>
              <p>Phone:</p>
              <span>{shippingInfo.contactInfo}</span>
            </div>
            <div>
              <p>Address:</p>
              <span>{address}</span>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X {item.price}={" "}
                      <b>{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>{tax}</span>
              </div>
              <div className="orderSummaryTotal">
                <p>
                  <b>Total Price:</b>
                </p>
                <span>{totalPrice}</span>
              </div>
              <button className="paymentBtn" onClick={() => proceedToPayment()}>
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default OrderConfirm;
