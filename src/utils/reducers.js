// reducers.js
import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { ACTIONS } from "./actions";

const app = (
  state = {
    user: {},
    accounts: [],
    account: {},
  },
  action
) => {
  switch (action.type) {
    case ACTIONS.APP.USER:
      return { ...state, user: action.data };
    case ACTIONS.APP.ACCOUNTS:
      return { ...state, accounts: action.data };
    case ACTIONS.APP.ACCOUNT:
      return { ...state, account: action.data };

    default:
      return state;
  }
};

export const createRootReducer = (history) =>
  combineReducers({
    app,
    router: connectRouter(history),
  });
