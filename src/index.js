import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { ConnectedRouter } from "connected-react-router";
import { store, persistor, history } from "./store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./assets/css/materialStyles.css";
import "./services/ably";
import Router from "./Router";

window.Ably.connection.on("connected", () => {
  console.log("%cConnected, to Ably Realtime.", "color: green;");
  // store.dispatch(setRealtimeConnected(true));
});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading</div>} persistor={persistor}>
      <ConnectedRouter history={history}>
        <Router/>
        <ToastContainer position="bottom-left"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange={false}
          draggable
          pauseOnHover={false}/>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);