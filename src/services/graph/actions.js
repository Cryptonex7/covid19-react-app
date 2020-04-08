import * as actions from "../actionTypes";
import Axios from 'axios';
import { API_URL } from "../../constants";

export const getGraphDataConfirmed = async (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
        dispatch({type: actions.GET_GRAPH_DATA_CONFIRMED_PENDING});
        dispatch({type: actions.SET_LOADER, payload: true});
        const headers = {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            }
        };
        try{
            const res = await Axios.get(`${API_URL}/day_wise_confirmed`, headers);
            dispatch({type: actions.GET_GRAPH_DATA_CONFIRMED_SUCCESS, payload: res.data});
            dispatch({type: actions.SET_LOADER, payload: false});
            resolve(res.data);
        } catch (err) {
            dispatch({type: actions.GET_GRAPH_DATA_CONFIRMED_FAILED, payload: err});
            dispatch({type: actions.SET_LOADER, payload: false});
            reject(err);
        }
    })
};
