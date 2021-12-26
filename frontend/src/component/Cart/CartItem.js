import React from "react";
import { Link } from "react-router-dom";
import "./cartItem.css";

function CartItem({ item }) {
  return (
    <div className="CartItem">
      <img src={item.image} alt={item.name} />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price : ${item.price}`}</span>
        <p>Remove</p>
      </div>
    </div>
  );
}

export default CartItem;
