import * as actions from "../actionTypes";

const initState = {
    darkTheme: false
}

const themeReducer = (state = initState, action) => {
    switch(action.type){
        case actions.TOGGLE_THEME:
            return {...state, darkTheme: !state.darkTheme}
        default: return state;
    }
}

export default themeReducer;