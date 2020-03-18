import * as actions from "../actionTypes";

const initState = {
    isLoggedIn: false,
    authData: {},
    authPending: false,
    authError: {}
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case actions.LOGIN_ADMIN_PENDING:
            return Object.assign({}, state, { authPending: true });
        case actions.LOGIN_ADMIN_SUCCESS:
            return Object.assign({}, state, {
                authData: action.payload.data,
                authPending: false,
                isLoggedIn: true
            });
        case actions.LOGIN_ADMIN_FAILED:
            return Object.assign({}, state, {
                authError: action.payload.data,
                authPending: false
            });
        case "LOGOUT":
            return Object.assign({}, state, {
                authData: {},
                authPending: false,
                isLoggedIn: false
            });
        default: return state;
    }
}

export default authReducer;