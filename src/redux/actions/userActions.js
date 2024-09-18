import axios from "axios";
import {USERS_LIST_REQUEST,USERS_LIST_SUCCESS,USERS_LIST_FAIL,USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL} from '../constants/userConstants'
import { toast } from "react-toastify";


//const base_url=process.env.REACT_APP_BASE_URL
//const base_url='http://localhost:1000'
const base_url='https://investment-api.nodescript-it.com'



export const userList=()=>{
    return async(dispatch)=>{
        dispatch({type:USERS_LIST_REQUEST})
        try{
            const response=await axios.get(`${base_url}/users`)
           
            const {data}=response.data
            dispatch({type:USERS_LIST_SUCCESS,payload:data})
        }catch(error){
            const errorMessage = error.response ? error.response.data.message : error.message;
            dispatch({type:USERS_LIST_FAIL,payload:errorMessage})
        }
    }
}

export const deleteUser = (userId) => {
    return async (dispatch) => {
        dispatch({ type: USER_DELETE_REQUEST });
        try {
            await axios.delete(`${base_url}/users/${userId}`);
            dispatch({ type: USER_DELETE_SUCCESS, payload: userId });
            toast.success("User Deleted Successfully")
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            dispatch({ type: USER_DELETE_FAIL, payload: errorMessage });
            toast.error(`Error : ${errorMessage}`)
        }
    };
};