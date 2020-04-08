import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import themeReducer from "./services/theme/reducer";
import graphReducer from "./services/graph/reducer";
import miscReducer from "./services/misc/reducer";

export const rootReducer = (history) => {
    return combineReducers({
        router: connectRouter(history),
        misc: miscReducer,
        graph: graphReducer,
        theme: themeReducer,
    })
}