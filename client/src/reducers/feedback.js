import {
  GET_FEEDBACKS,
  FEEDBACK_ERROR,
  ADD_FEEDBACK,
  DELETE_FEEDBACK,
} from "../actions/types";
const initialState = {
  feedback: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FEEDBACKS:
      return {
        ...state,
        feedback: payload,
        loading: false,
      };

    case DELETE_FEEDBACK:
      return {
        ...state,
        feedback: state.feedback.filter((post) => post._id !== payload),
        loading: false,
      };
    case FEEDBACK_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case ADD_FEEDBACK:
      return {
        ...state,
        feedback: [...state.feedback, payload],
        loading: false,
      };

    default:
      return state;
  }
}
