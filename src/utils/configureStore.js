import { applyMiddleware, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import { createRootReducer } from "./reducers";
import { createMigrate, persistStore, persistReducer } from "redux-persist";
import storage from "localforage";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

let createHistory = require("history").createBrowserHistory;
const history = createHistory();

var middlewares = [
  routerMiddleware(history), // history middleware
  thunk, // async actions middleware
];

if (process.env.NODE_ENV !== "production") {
  middlewares = [...middlewares, logger]; // logging for non-production environments
}

const migrations = {};

const configureStore = (pReducer, middleware) =>
  createStore(pReducer, middleware);

let persistConfig = {
  key: "tcs-bank",
  version: -1,
  storage,
  blacklist: ["router", "client"],
  migrate: createMigrate(migrations, {
    debug: process.env.NODE_ENV !== "production",
  }),
};
let pReducer = persistReducer(persistConfig, createRootReducer(history));
let store = configureStore(
  pReducer,
  composeWithDevTools({})(applyMiddleware(...middlewares)) // Dev tools support
);

// Store persistor
let persistor = persistStore(store);

// Use below line only to clear persisted storage on every reload
// persistor.purge();

export { history, store, persistor };
