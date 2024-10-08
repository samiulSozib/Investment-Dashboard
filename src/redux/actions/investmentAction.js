import axios from "axios";
import {INVESTMENT_LIST_REQUEST,
    INVESTMENT_LIST_SUCCESS,
    INVESTMENT_LIST_FAIL,
    INVESTMENT_DELETE_REQUEST,
    INVESTMENT_DELETE_SUCCESS,
    INVESTMENT_DELETE_FAIL,
    INVESTMENT_STATUS_CHANGE_REQUEST,
    INVESTMENT_STATUS_CHANGE_SUCCESS,
    INVESTMENT_STATUS_CHANGE_FAIL,
} from '../constants/investmentConstants'
import { toast } from "react-toastify";


//const base_url=process.env.REACT_APP_BASE_URL
//const base_url='http://localhost:1000'
const base_url='https://investment-api.nodescript-it.com'



export const investmentList=(page,item_per_page)=>{
    return async(dispatch)=>{
        dispatch({type:INVESTMENT_LIST_REQUEST})
        try{
            const response=await axios.get(`${base_url}/investments?page=${page}&item_per_page=${item_per_page}`)
            const data=response.data.data
            const totalItems=response.data.payload.pagination.total_items
            dispatch({type:INVESTMENT_LIST_SUCCESS,payload:{data,totalItems}})
        }catch(error){
            const errorMessage = error.response ? error.response.data.message : error.message;
            dispatch({type:INVESTMENT_LIST_FAIL,payload:errorMessage})
        }
    }
}


export const deleteInvestment = (id) => {
    return async (dispatch) => {
      dispatch({ type: INVESTMENT_DELETE_REQUEST });
      try {
        await axios.delete(`${base_url}/investments/${id}`);
        dispatch({ type: INVESTMENT_DELETE_SUCCESS, payload: id });
        toast.success("Investemnts Detele Successfully")
      } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message;
        dispatch({ type: INVESTMENT_DELETE_FAIL, payload: error });
        toast.error(`Error : ${errorMessage}`)
      }
    };
  };


  export const updateInvestmentStatus = (id, status) => {
    return async (dispatch) => {
        dispatch({ type: INVESTMENT_STATUS_CHANGE_REQUEST });
        try {
            await axios.patch(`${base_url}/investments/${id}/status`, { status });
            dispatch({ type: INVESTMENT_STATUS_CHANGE_SUCCESS, payload: { id, status } });
            toast.success("Investment status updated successfully");
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            dispatch({ type: INVESTMENT_STATUS_CHANGE_FAIL, payload: errorMessage });
            toast.error(`Error: ${errorMessage}`);
        }
    };
};