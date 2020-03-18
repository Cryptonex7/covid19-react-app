import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import themeReducer from "./services/theme/reducer";
import authReducer from "./services/auth/reducer";
import {dashboardReducer, dashboardFilterReducer} from "./services/dashboard/reducer";
import restaurantsReducer from "./services/restaurants/reducer";

export const rootReducer = (history) => {
    return combineReducers({
        router: connectRouter(history),
        theme: themeReducer,
        restaurants: restaurantsReducer,
        dashboardFilter: dashboardFilterReducer,
        dashboard: dashboardReducer,
        auth: authReducer
    })
}