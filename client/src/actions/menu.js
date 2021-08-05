import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_MENU,
  MENU_ERROR,
  UPDATE_MENUITEM,
  DELETE_MENUITEM,
} from "./types";

//Get all menu
export const getMenu = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/menu");

    dispatch({
      type: GET_MENU,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MENU_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update Menuitem

export const createMenuItem =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      console.log(formData);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("api/menu", formData, config);
      dispatch({
        type: UPDATE_MENUITEM,
        payload: res.data,
      });
      dispatch(
        setAlert(edit ? "Menu Item updated" : "Menu Item Created", "success")
      );
      if (!edit) {
        history.push("/dashboard");
      }
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
      }
      dispatch({
        type: MENU_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };

// Delete an MenuItem

export const deleteMenuItem = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/menu/${id}`);
    dispatch({
      type: DELETE_MENUITEM,
      payload: res.data,
    });
    dispatch(setAlert("Menu item Removed", "success"));
  } catch (error) {
    dispatch({
      type: MENU_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
