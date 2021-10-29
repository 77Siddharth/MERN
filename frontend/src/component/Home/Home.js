import React, { Fragment, useEffect } from "react";
import { getProduct } from "../../actions/productAction";
import MetaData from "../layout/MetaData";
import Product from "../Product/Product";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";

const product = {
  name: "Tshirt",
  type: "Clothing",
  price: "$200",
  images: [
    {
      url: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQBnWW1NqVZeK1BLUrDP4Kr8RRTSFvd_S7goK6iWP_grA1KpC6ETrJlw701oDZDAqLlvpdIIyMgvqMjKq_UNG_ePrIXX9dluk_9mIUJTTs&usqp=CAE",
    },
  ],
  _id: "somethingTshirt",
};

function Home() {
  const dispatch = useDispatch();

  const { loading, error, products, productCount } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <Fragment>
      <MetaData title="Round the clock Store" />
      <div className="banner">
        <p>Welcome to Round the Clock Store</p>
        <h1>Find Our Products below</h1>
        <a href="#container">
          <button> Scroll</button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Product</h2>
      <div className="container" id="container">
        {console.log(products, " this is product")}
        {products && products.map((product) => <Product product={product} />)}
      </div>
    </Fragment>
  );
}

export default Home;
