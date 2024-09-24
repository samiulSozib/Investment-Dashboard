import axios from "axios";
import {
    BUSINESS_PERFORMANCE_LIST_REQUEST,
    BUSINESS_PERFORMANCE_LIST_SUCCESS,
    BUSINESS_PERFORMANCE_LIST_FAIL,
    BUSINESS_PERFORMANCE_INSERT_REQUEST,
    BUSINESS_PERFORMANCE_INSERT_SUCCESS,
    BUSINESS_PERFORMANCE_INSERT_FAIL,
    BUSINESS_PERFORMANCE_DELETE_REQUEST,
    BUSINESS_PERFORMANCE_DELETE_SUCCESS,
    BUSINESS_PERFORMANCE_DELETE_FAIL,

} from '../constants/businessPerformanceConstants'
import { toast } from "react-toastify";


//const base_url=process.env.REACT_APP_BASE_URL
//const base_url='http://localhost:1000'
const base_url='https://investment-api.nodescript-it.com'



export const businessPerformanceList=()=>{
    return async(dispatch)=>{
        dispatch({type:BUSINESS_PERFORMANCE_LIST_REQUEST})
        try{
            const response=await axios.get(`${base_url}/business-performance`)
           
            const {data}=response.data
            dispatch({type:BUSINESS_PERFORMANCE_LIST_SUCCESS,payload:data})
        }catch(error){
            dispatch({type:BUSINESS_PERFORMANCE_LIST_FAIL,payload:error})
        }
    }
}

export const insertBusinessPerformance = (performanceData) => {
    return async (dispatch) => {
        dispatch({ type: BUSINESS_PERFORMANCE_INSERT_REQUEST });
        try {
            const response = await axios.post(`${base_url}/business-performance`, performanceData);
            const { data } = response.data;
            dispatch({ type: BUSINESS_PERFORMANCE_INSERT_SUCCESS, payload: data });
            toast.success("Business Performance Created Successfully")
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            dispatch({ type: BUSINESS_PERFORMANCE_INSERT_FAIL, payload: errorMessage });
            toast.error(`Error : ${errorMessage}`)
        }
    };
};


export const deleteBusinessPerformance = (id) => {
    return async (dispatch) => {
        dispatch({ type: BUSINESS_PERFORMANCE_DELETE_REQUEST });
        try {
            await axios.delete(`${base_url}/business-performance/${id}`);
            dispatch({ type: BUSINESS_PERFORMANCE_DELETE_SUCCESS, payload: id });
            toast.success("Deleted Successfully")
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            dispatch({ type: BUSINESS_PERFORMANCE_DELETE_FAIL, payload: errorMessage });
            toast.error(`Error : ${errorMessage}`)
        }
    };
};