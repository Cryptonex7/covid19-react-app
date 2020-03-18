import * as actions from "../actionTypes";
import Axios from 'axios';
import { API_URL } from "../../config";
import { getDashboardData } from "../dashboard/actions";
import { persistor } from "../../store";
import { push } from "connected-react-router";


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

    
export const logoutAdmin = () => async dispatch => {
    window.localStorage.clear();
    dispatch({ type: "LOGOUT" });
    persistor.purge();
    persistor.persist();
    dispatch(push("/"));
    window.location.reload();
};