import React, { Fragment } from "react";
import CartItem from "./CartItem.js";
import "./Cart.css";

function Cart() {
  const item = {
    name: "Lenovo Ideapad",
    price: "20000",
    image: "Sample.jpg",
    product: "Laptop",
    quantity: 1,
    image:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQBnWW1NqVZeK1BLUrDP4Kr8RRTSFvd_S7goK6iWP_grA1KpC6ETrJlw701oDZDAqLlvpdIIyMgvqMjKq_UNG_ePrIXX9dluk_9mIUJTTs&usqp=CAE",
  };
  return (
    <Fragment>
      <div className="cartPage">
        <div className="cartHeader">
          <p>Product</p>
          <p>Quantity</p>
          <p>Subtotal</p>
        </div>
        <div className="cartContainer">
          <CartItem item={item} />
          <div className="cartInput">
            <button>-</button>
            <input type="number" readOnly value={item.quantity} />
            <button>+</button>
          </div>
          <p className="cartSubtotal">{`R${item.price * item.quantity}`}</p>
        </div>
        <div className="cartTotal">
          <div></div>
          <div className="cartTotalBox">
            <p>Cart Total</p>
            <p>{`R600`}</p>
          </div>
          <div></div>
          <div className="checkOutBtn">
            <button>Check Out</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Cart;
