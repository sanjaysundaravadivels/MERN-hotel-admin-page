import {
  GET_MENU,
  MENU_ERROR,
  UPDATE_MENUITEM,
  DELETE_MENUITEM,
} from "../actions/types";
const initialState = {
  menu: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MENU:
      return {
        ...state,
        menu: payload,
        loading: false,
      };

    case MENU_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case DELETE_MENUITEM:
      return {
        ...state,
        menu: state.menu.filter((item) => item._id !== payload),
        loading: false,
      };
    case UPDATE_MENUITEM:
      return {
        ...state,
        menu: [...state.menu, payload],
        loading: false,
      };
    default:
      return state;
  }
}
