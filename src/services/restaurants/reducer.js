import * as actions from "../actionTypes";

const initState = {
    restaurants: [],
    restaurantsPending: false,
    restaurantsError: {}
}

const restaurantsReducer = (state = initState, action) => {
    switch(action.type){
        case actions.GET_ALL_RESTAURANTS_PENDING:
            return Object.assign({}, state, { restaurantsPending: true });
        case actions.GET_ALL_RESTAURANTS_SUCCESS:
            return Object.assign({}, state, {
                restaurants: action.payload.data,
                restaurantsPending: false,
        });
        case actions.GET_ALL_RESTAURANTS_FAILED:
            return Object.assign({}, state, {
                restaurantsError: action.payload.data,
                restaurantsPending: false
        });
        
        default: return state;
    }
}

export default restaurantsReducer;