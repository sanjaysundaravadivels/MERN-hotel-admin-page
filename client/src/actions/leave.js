import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_LEAVEREQUESTS,
  DELETE_LEAVEREQUEST,
  LEAVEREQUEST_ERROR,
  ADD_LEAVEREQUEST,
} from "./types";

//GET Feedback
export const getLeaveRequest = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/leave");
    dispatch({
      type: GET_LEAVEREQUESTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LEAVEREQUEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Feedback
export const deleteleaveRequest = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/leave/${id}`);
    dispatch({
      type: DELETE_LEAVEREQUEST,
      payload: id,
    });
    dispatch(setAlert("Leave request Removed", "success"));
  } catch (error) {
    const errors = error.response.data;
    if (errors) {
      dispatch(setAlert(errors.msg, "danger"));
    }
    dispatch({
      type: LEAVEREQUEST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Add Leave request
export const addLeaveRequest = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/leave", formData, config);

    dispatch({
      type: ADD_LEAVEREQUEST,
      payload: res.data,
    });

    dispatch(setAlert("Leave request Posted", "success"));
  } catch (err) {
    dispatch({
      type: LEAVEREQUEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
