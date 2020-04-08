import * as actions from "../actionTypes";

const misc = {
    loader: false
};

const miscReducer = (state = misc, action) => {
    switch(action.type){
        case actions.SET_LOADER: 
            return Object.assign({}, state, {loader: action.payload});
        default: return state;
    }
};

export default miscReducer;