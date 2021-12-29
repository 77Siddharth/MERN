import "./App.css";
import React, { useEffect, useState } from "react";
import store from "./store";
import WebFont from "webfontloader";
import { useSelector } from "react-redux";
import { loadUser } from "./actions/userAction.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Cart from "./component/Cart/Cart.js";
import Home from "./component/Home/Home.js";
import Profile from "./component/User/Profile.js";
import Search from "./component/Product/Search.js";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import Products from "./component/Product/Products.js";
import LoginSignup from "./component/User/LoginSignup.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import UserOptions from "./component/layout/Header/UserOptions.js";
import ProductDetails from "./component/ProductDetails/ProductDetails.js";
import Shipping from "./component/Cart/Shipping.js";
import OrderConfirm from "./component/Cart/OrderConfirm.js";
import Payment from "./component/Cart/Payment.js";
import axios from "axios";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeApiKey");
    setStripeApiKey(data.stripeApiKey);
    console.log("this is data , ", data);
    console.log("this is Stripe API , ", stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto"],
      },
    });
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Route exact path="/" component={Home} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/login" component={LoginSignup} />
      <Route exact path="/products" component={Products} />
      <Route path="/products/:keyword" component={Products} />
      <ProtectedRoute exact path="/account" component={Profile} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/password/forgot" component={ForgotPassword} />
      <Route exact path="/password/reset/:token" component={ResetPassword} />
      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
      <ProtectedRoute exact path="/shipping" component={Shipping} />
      <ProtectedRoute exact path="/order/confirm" component={OrderConfirm} />

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}

      <ProtectedRoute
        exact
        path="/password/update"
        component={UpdatePassword}
      />

      <Footer />
    </Router>
  );
}

export default App;
