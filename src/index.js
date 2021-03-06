import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { ConnectedRouter } from "connected-react-router";
import { store, persistor, history } from "./store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Admin from "./layouts/Admin.js";
import "./assets/css/materialStyles.css";
import Dashboard from "./views/Dashboard/Dashboard";

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading</div>} persistor={persistor}>
      <ConnectedRouter history={history}>
        <Router history={hist}>
          <Switch>
            <Route path="/" component={Admin} />
            <Route path="/covid19-react-app" component={Admin} />
            {console.log("ENV: ", process.env.NODE_ENV)}
            <Redirect from="/covid19-react-app" to="/admin/dashboard" />
          </Switch>
        </Router>
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