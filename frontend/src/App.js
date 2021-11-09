import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/ProductDetails/ProductDetails.js";
import Products from "./component/Product/Products.js";
import "./App.css";

function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto"],
      },
    });
  }, []);

  return (
    <Router>
      <Header />
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Footer />
    </Router>
  );
}

export default App;
