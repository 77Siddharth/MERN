import { ADD_TO_CART } from "../constants/cartConstants";
import axios from "axios";

export const addItemsToCart =
  (productId, qunatity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${productId}`);

    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.stock,
        qunatity,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
