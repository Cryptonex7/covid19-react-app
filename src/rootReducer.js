import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import themeReducer from "./services/theme/reducer";

export const rootReducer = (history) => {
    return combineReducers({
        router: connectRouter(history),
        theme: themeReducer,
    })
}