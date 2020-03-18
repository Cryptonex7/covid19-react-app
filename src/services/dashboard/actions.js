import * as actions from "../actionTypes";
import { push } from "connected-react-router";
import Axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from "../../config";

export const getDashboardData = (rest_id, fromDate, toDate) => async (dispatch, getState) => {
    console.log("Into Dash Function");
    if (!rest_id && !fromDate && !toDate){
        dispatch({ type: actions.GET_DASHBOARD_DATA_PENDING });
        const bearerToken = getState().auth.authData.token;
        try{
            const res = await Axios
            .get(`${API_URL}/admin/dashboard`, {
                headers: { Authorization: `Bearer ${bearerToken}` }
            })
            await dispatch({ type: actions.GET_DASHBOARD_DATA_SUCCESS, payload: res });
            await dispatch(push("/admin/dashboard"));
        } catch(err) {
            dispatch({ type: actions.GET_DASHBOARD_DATA_FAILED, payload: err });
            toast.error("unable to get dashboard info");
        }
    } else {
        dispatch({ type: actions.GET_DASHBOARD_FILTER_PENDING });
        const bearerToken = getState().auth.authData.token;
        var res;
        try{
            if (!rest_id && !fromDate && toDate){
                res = await Axios
                .get(`${API_URL}/admin/dashboard?to=${toDate}`, {
                    headers: { Authorization: `Bearer ${bearerToken}` }
                })
            }
            else if (!rest_id && fromDate && !toDate){
                res = await Axios
                .get(`${API_URL}/admin/dashboard?from=${fromDate}`, {
                    headers: { Authorization: `Bearer ${bearerToken}` }
                })
            }
            else if (!rest_id && fromDate && toDate){
                res = await Axios
                .get(`${API_URL}/admin/dashboard?from=${fromDate}&to=${toDate}`, {
                    headers: { Authorization: `Bearer ${bearerToken}` }
                })
            }
            else if (rest_id && !fromDate && !toDate){
                res = await Axios
                .get(`${API_URL}/admin/dashboard?rest_id=${rest_id}`, {
                    headers: { Authorization: `Bearer ${bearerToken}` }
                })
            }
            else if (rest_id && !fromDate && toDate){
                res = await Axios
                .get(`${API_URL}/admin/dashboard?rest_id=${rest_id}&to=${toDate}`, {
                    headers: { Authorization: `Bearer ${bearerToken}` }
                })
            }
            else if (rest_id && fromDate && !toDate){
                res = await Axios
                .get(`${API_URL}/admin/dashboard?rest_id=${rest_id}&from=${fromDate}`, {
                    headers: { Authorization: `Bearer ${bearerToken}` }
                })
            }
            else if (rest_id && fromDate && toDate){
                res = await Axios
                .get(`${API_URL}/admin/dashboard?rest_id=${rest_id}&from=${fromDate}&to=${toDate}`, {
                    headers: { Authorization: `Bearer ${bearerToken}` }
                })
            }
            await dispatch({ type: actions.GET_DASHBOARD_FILTER_SUCCESS, payload: res });
        } catch(err) {
            dispatch({ type: actions.GET_DASHBOARD_FILTER_FAILED, payload: err });
            toast.error("unable to get dashboard info");
        }
    }
};
