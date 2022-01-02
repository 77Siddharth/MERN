import axios from "axios";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  console.log("Create Order called ", order);
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const data = await axios.post("/api/v1/order/new", order, config);

    console.log("This is Data:", data);
    // api/v1/order/new
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    console.log("er:", error);
    dispatch({
      type: CREATE_ORDER_FAIL,
      error: error,
    });
  }
};

export const clearErrors = async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
