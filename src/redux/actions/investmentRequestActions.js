import axios from "axios";
import {
    INVESTMENT_REQUEST_LIST_REQUEST,
    INVESTMENT_REQUEST_LIST_SUCCESS,
    INVESTMENT_REQUEST_LIST_FAIL,
    INVESTMENT_REQUEST_DELETE_REQUEST,
    INVESTMENT_REQUEST_DELETE_SUCCESS,
    INVESTMENT_REQUEST_DELETE_FAIL,
} from '../constants/investmentRequestConstants'
import { toast } from "react-toastify";

//const base_url=process.env.REACT_APP_BASE_URL
//const base_url='http://localhost:1000'
const base_url='https://investment-api.nodescript-it.com'



export const investementRequestList=()=>{
    return async(dispatch)=>{
        dispatch({type:INVESTMENT_REQUEST_LIST_REQUEST})
        try{
            const response=await axios.get(`${base_url}/investment-requests`)
            const {data}=response.data
            dispatch({type:INVESTMENT_REQUEST_LIST_SUCCESS,payload:data})
        }catch(error){
            dispatch({type:INVESTMENT_REQUEST_LIST_FAIL,payload:error})
        }
    }
}


export const deleteInvestmentRequest = (id) => {
    return async (dispatch) => {
      dispatch({ type: INVESTMENT_REQUEST_DELETE_REQUEST });
  
      try {
        await axios.delete(`${base_url}/investment-requests/${id}`);
        dispatch({ type: INVESTMENT_REQUEST_DELETE_SUCCESS, payload: id });
        toast.success("Investment Request Deleted Successfully")
      } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message;
        dispatch({type: INVESTMENT_REQUEST_DELETE_FAIL,payload: errorMessage});
        toast.error(`Error : ${errorMessage}`)
      }
    };
  };