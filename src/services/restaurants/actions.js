import * as actions from "../actionTypes";
import { push } from "connected-react-router";
import Axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from "../../config";

export const getAllRestaurants = () => async (dispatch, getState) => {
    dispatch({ type: actions.GET_ALL_RESTAURANTS_PENDING });
    try{
        const res = await Axios
        .get(`${API_URL}/restaurants?limit=1000&page=1`)
        await dispatch({ type: actions.GET_ALL_RESTAURANTS_SUCCESS, payload: res });
        await dispatch(push("/admin/dashboard"));
    } catch(err) {
        dispatch({ type: actions.GET_ALL_RESTAURANTS_FAILED, payload: err });
        toast.error("unable to get dashboard info");
    }
};
