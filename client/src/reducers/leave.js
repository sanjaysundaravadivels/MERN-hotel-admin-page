import {
  GET_LEAVEREQUESTS,
  LEAVEREQUEST_ERROR,
  ADD_LEAVEREQUEST,
  DELETE_LEAVEREQUEST,
} from "../actions/types";
const initialState = {
  leaveRequests: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LEAVEREQUESTS:
      return {
        ...state,
        leaveRequests: payload,
        loading: false,
      };

    case DELETE_LEAVEREQUEST:
      return {
        ...state,
        leaveRequests: state.leaveRequests.filter(
          (post) => post._id !== payload
        ),
        loading: false,
      };
    case LEAVEREQUEST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case ADD_LEAVEREQUEST:
      return {
        ...state,
        leaveRequests: [...state.leaveRequests, payload],
        loading: false,
      };

    default:
      return state;
  }
}
