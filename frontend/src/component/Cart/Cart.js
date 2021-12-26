import React, { Fragment } from "react";
import CartItem from "./CartItem.js";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "../../actions/cartAction.js";

function Cart() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    if (stock <= quantity) return;
    const newQty = quantity + 1;
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) return;
    dispatch(addItemsToCart(id, newQty));
  };

  return (
    <Fragment>
      <div className="cartPage">
        <div className="cartHeader">
          <p>Product</p>
          <p>Quantity</p>
          <p>Subtotal</p>
        </div>
        {cartItems &&
          cartItems.map((item) => (
            <div className="cartContainer">
              <CartItem item={item} />
              <div className="cartInput">
                <button
                  onClick={() => decreaseQuantity(item.product, item.quantity)}
                >
                  -
                </button>
                <input type="number" readOnly value={item.quantity} />
                <button
                  onClick={() =>
                    increaseQuantity(item.product, item.quantity, item.stock)
                  }
                >
                  +
                </button>
              </div>
              <p className="cartSubtotal">{`R${item.price * item.quantity}`}</p>
            </div>
          ))}
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
