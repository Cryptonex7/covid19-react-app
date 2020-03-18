import * as actions from "../actionTypes";

const initState = {
    dashboardData: {},
    dashboardPending: false,
    dashboardError: {}
}

export const dashboardReducer = (state = initState, action) => {
    switch(action.type){
        case actions.GET_DASHBOARD_DATA_PENDING:
            return Object.assign({}, state, { dashboardPending: true });
        case actions.GET_DASHBOARD_DATA_SUCCESS:
            return Object.assign({}, state, {
                dashboardData: action.payload.data,
                dashboardPending: false,
        });
        case actions.GET_DASHBOARD_DATA_FAILED:
            return Object.assign({}, state, {
                dashboardError: action.payload.data,
                dashboardPending: false
        });
        default: return state;
    }
}

const initRestState = {
    dashboardFilter: {},
    filterPending: false,
    filterError: ""
}

export const dashboardFilterReducer = (state = initRestState, action) => {
    switch(action.type){
        case actions.GET_DASHBOARD_FILTER_PENDING:
            return Object.assign({}, state, { filterPending: true });
        case actions.GET_DASHBOARD_FILTER_SUCCESS:
            return Object.assign({}, state, {
                dashboardFilter: action.payload.data,
                filterPending: false,
        });
        case actions.GET_DASHBOARD_FILTER_FAILED:
            return Object.assign({}, state, {
                filterError: action.payload.data,
                filterPending: false
        });
        default: return state;
    }
}