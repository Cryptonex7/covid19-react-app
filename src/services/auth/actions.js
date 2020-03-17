import * as actions from "../actionTypes";
import Axios from 'axios';
import { API_URL } from "../../config";
import { getDashboardData } from "../dashboard/actions";


export const loginAdmin = (admin) => async dispatch => {
    dispatch({ type: actions.LOGIN_ADMIN_PENDING });
    try {
        const res = await Axios.post(`${API_URL}/admin/auth/login`, {
            username: admin.username,
            password: admin.password
        });
        await dispatch({ type: actions.LOGIN_ADMIN_SUCCESS, payload: res });
        await dispatch(getDashboardData());
    } catch (error) {
        dispatch({ type: actions.LOGIN_ADMIN_FAILED, payload: error });
    }
};