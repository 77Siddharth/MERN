import "./App.css";
import React from "react";
import store from "./store";
import WebFont from "webfontloader";
import { useSelector } from "react-redux";
import { loadUser } from "./actions/userAction.js";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./component/Home/Home.js";
import Profile from "./component/User/Profile.js";
import Search from "./component/Product/Search.js";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import Products from "./component/Product/Products.js";
import LoginSignup from "./component/User/LoginSignup.js";
import UserOptions from "./component/layout/Header/UserOptions.js";
import ProductDetails from "./component/ProductDetails/ProductDetails.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto"],
      },
    });
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route path="/products/:keyword" component={Products} />
      <Route exact path="/search" component={Search} />
      <ProtectedRoute exact path="/account" component={Profile} />
      <Route exact path="/login" component={LoginSignup} />
      <Footer />
    </Router>
  );
}

export default App;
