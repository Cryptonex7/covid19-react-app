import * as actions from "../actionTypes";

export const setLoader = (val) => {
    return {
        type: actions.SET_LOADER,
        payload: val
    }
}