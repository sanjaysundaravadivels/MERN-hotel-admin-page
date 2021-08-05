import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_ORDERS,
  DELETE_ORDER,
  POST_ERROR,
  GET_ORDERSTATUS,
  ADD_ORDERSTATUS,
  ORDERSTATUS_ERROR,
  DELETE_ORDERSTATUS,
} from "./types";

//GET orders
export const getOrders = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/orders");
    dispatch({
      type: GET_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    console.log(id);
    const res = await axios.delete(`/api/orders/${id}`);
    dispatch({
      type: DELETE_ORDER,
      payload: id,
    });
    dispatch(setAlert("Order Removed", "success"));
  } catch (error) {
    const errors = error.response.data;
    if (errors) {
      dispatch(setAlert(errors.msg, "danger"));
    }
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
//GET OrderStatus
export const getOrderStatus = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/orderstatus");
    dispatch({
      type: GET_ORDERSTATUS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORDERSTATUS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add OrderStatus
export const addOrderStatus = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/orderstatus", formData, config);

    dispatch({
      type: ADD_ORDERSTATUS,
      payload: res.data,
    });

    dispatch(setAlert("Order completed", "success"));
  } catch (err) {
    dispatch({
      type: ORDERSTATUS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete OrderStatus
export const deleteOrderStatus = (id) => async (dispatch) => {
  try {
    console.log(id);
    const res = await axios.delete(`/api/orderstatus/${id}`);
    dispatch({
      type: DELETE_ORDERSTATUS,
      payload: id,
    });
    dispatch(setAlert("Order Removed", "success"));
  } catch (error) {
    const errors = error.response.data;
    if (errors) {
      dispatch(setAlert(errors.msg, "danger"));
    }
    dispatch({
      type: ORDERSTATUS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
