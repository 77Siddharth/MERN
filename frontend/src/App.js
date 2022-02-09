import "./App.css";
import React, { useEffect, useState } from "react";
import store from "./store";
import WebFont from "webfontloader";
import { useSelector } from "react-redux";
import { loadUser } from "./actions/userAction.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Shipping from "./component/Cart/Shipping.js";
import OrderConfirm from "./component/Cart/OrderConfirm.js";
import Dashboard from "./component/Admin/Dashboard.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import Payment from "./component/Cart/Payment.js";
import ProductList from "./component/Admin/ProductList.js";
import axios from "axios";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import NotFound from "./component/layout/NotFound/NotFound";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeApiKey");
    setStripeApiKey(data.stripeApiKey);
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

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/login" component={LoginSignup} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/about" component={About} />
        <Route path="/products/:keyword" component={Products} />
        <ProtectedRoute exact path="/account" component={Profile} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/password/forgot" component={ForgotPassword} />
        <Route exact path="/password/reset/:token" component={ResetPassword} />
        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />

        <ProtectedRoute exact path="/order/confirm" component={OrderConfirm} />
        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

        <ProtectedRoute exact path="/orders" component={MyOrders} />
        <ProtectedRoute exact path="/shipping" component={Shipping} />
        <ProtectedRoute exact path="/success" component={OrderSuccess} />

        <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/product"
          component={NewProduct}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/products"
          component={ProductList}
        />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/product/:id"
          component={UpdateProduct}
        />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/orders"
          component={OrderList}
        />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/order/:id"
          component={ProcessOrder}
        />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/users"
          component={UsersList}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/user/:id"
          component={UpdateUser}
        />

        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute exact path="/process/payment" component={Payment} />
          </Elements>
        )}
        <Route
          component={
            window.location.pathname === "/process/payment" ? Payment : NotFound
          }
        />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
