import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_FEEDBACKS,
  DELETE_FEEDBACK,
  FEEDBACK_ERROR,
  ADD_FEEDBACK,
} from "./types";

//GET Feedback
export const getFeedback = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/feedback");
    dispatch({
      type: GET_FEEDBACKS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FEEDBACK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Feedback
export const deleteFeedback = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/feedback/${id}`);
    dispatch({
      type: DELETE_FEEDBACK,
      payload: id,
    });
    dispatch(setAlert("Feedback Removed", "success"));
  } catch (error) {
    const errors = error.response.data;
    if (errors) {
      dispatch(setAlert(errors.msg, "danger"));
    }
    dispatch({
      type: FEEDBACK_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Add Feedback
export const addFeedback = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/feedback", formData, config);

    dispatch({
      type: ADD_FEEDBACK,
      payload: res.data,
    });

    dispatch(setAlert("Post Posted", "success"));
    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: FEEDBACK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
