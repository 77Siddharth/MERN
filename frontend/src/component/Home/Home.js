import React, { Fragment, useEffect } from "react";
import { getProduct } from "../../actions/productAction";
import MetaData from "../layout/MetaData";
import Product from "../Product/Product";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";

function Home() {
  const dispatch = useDispatch();
  //   const alert = useAlert();
  const { loading, error, products } = useSelector((state) => state.products);
  useEffect(() => {
    //   if (error) return alert.error("error");
    dispatch(getProduct());
  }, [dispatch, error]);

  return loading ? (
    <Loader />
  ) : (
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
        {products &&
          products.map((product, index) => (
            <Product product={product} key={index} />
          ))}
      </div>
    </Fragment>
  );
}

export default Home;
