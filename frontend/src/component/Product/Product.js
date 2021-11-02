import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import "./Product.css";


function Product({ product }) {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.rating,
    isHalf: true,
  };
  return (
    <Link className="productCard" to={`product/${product._id}`}>
      <img src={product.images[0].url} />
      <div>
        <h6>{product.name}</h6>
        <h5>{product.category}</h5>
      </div>
      <div>
        <ReactStars {...options} />{" "}
        <span>
          {" "}
          <p>({product.numOfReviews}) Reviews</p>
        </span>
      </div>
      <div>
        <h3 className="productPrice">{product.price}</h3>
        {/* <h3>{product.description}</h3> */}
      </div>
      <p>{product.description}</p>
    </Link>
  );
}

export default Product;
