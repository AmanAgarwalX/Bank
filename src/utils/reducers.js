// reducers.js
import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { ACTIONS } from "./actions";

const app = (
  state = {
    form: {},
  },
  action
) => {
  switch (action.type) {
    case ACTIONS.APP.FORM:
      return { ...state, form: action.data };
    case ACTIONS.APP.DELETE_FORM:
      return { form: {} };

    default:
      return state;
  }
};

export const createRootReducer = (history) =>
  combineReducers({
    app,
    router: connectRouter(history),
  });
