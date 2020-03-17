import { Realtime } from "ably/browser/static/ably-commonjs.js";
import { ABLY_KEY } from "../config.js";
import { store } from "../store";

window.Ably = new Realtime({
  key: ABLY_KEY,
  recover: function(_, cb) { cb(true); }
});

const select = state => {
  return state.dashboard.dashboardData;
};

let current;

const handleChange = () => {
  let prev = current;
  current = select(store.getState());
  if (prev !== current) {
    window.adminChannel = window.Ably.channels.get("dashboard");
  }
};

store.subscribe(handleChange);
