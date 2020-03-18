import { createStore, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from "history";
import { rootReducer } from "./rootReducer";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reduxReset from "redux-reset";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["router", "dashboardFilter"]
};

export const history = createBrowserHistory();

const pReducer = persistReducer(persistConfig, rootReducer(history));
const middlewares = [thunk, routerMiddleware(history)];
const store = createStore(
  pReducer,
  // reducer(history),
  compose(
    applyMiddleware(...middlewares),
    reduxReset({
      type: "LOGOUT"
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({trace: true})
  )
);
const persistor = persistStore(store);
export { store, persistor };
// export { store }
