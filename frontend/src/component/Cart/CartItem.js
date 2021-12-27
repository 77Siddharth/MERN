import React from "react";
import { Link } from "react-router-dom";
import "./cartItem.css";

function CartItem({ item, deleteCartItem }) {
  return (
    <div className="CartItem">
      <img src={item.image} alt={item.name} />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price : ${item.price}`}</span>
        <p onClick={() => deleteCartItem(item.product)}>Remove</p>
      </div>
    </div>
  );
}

export default CartItem;
