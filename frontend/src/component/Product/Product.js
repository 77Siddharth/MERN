import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import "./Product.css";

const options = {
  edit: false,
  color: "rgba(20,20,20,0.1)",
  activeColor: "tomato",
  size: window.innerWidth < 600 ? 20 : 25,
  value: 2.5,
  isHalf: true,
};

function Product({ product }) {
  return (
    <Link className="productCard" to={product._id}>
      <img src={product.images[0].url} />
      <div>
        <h6>{product._id}</h6>
        <h5>{product.type}</h5>
      </div>
      <div>
        <ReactStars {...options} />
      </div>
      <div>
        <h3 className="productPrice">{product.price}</h3>
        <h3>{product.name}</h3>
      </div>
    </Link>
  );
}

export default Product;
