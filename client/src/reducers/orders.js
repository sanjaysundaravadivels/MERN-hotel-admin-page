import {
  GET_ORDERS,
  POST_ERROR,
  DELETE_ORDER,
  GET_ORDERSTATUS,
  ADD_ORDERSTATUS,
  ORDERSTATUS_ERROR,
  DELETE_ORDERSTATUS,
} from "../actions/types";
const initialState = {
  orders: [],
  orderStatus: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: payload,
        loading: false,
      };
    case GET_ORDERSTATUS:
      return {
        ...state,
        orderStatus: payload,
        loading: false,
      };
    case ADD_ORDERSTATUS:
      return {
        ...state,
        orderStatus: [...state.orderStatus, payload],
        loading: false,
      };
    case DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter((order) => order._id !== payload),
        loading: false,
      };
    case DELETE_ORDERSTATUS:
      return {
        ...state,
        orderStatus: state.orderStatus.filter((order) => order._id !== payload),
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case ORDERSTATUS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
