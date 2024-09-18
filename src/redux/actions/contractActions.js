import axios from "axios";
import {
    CONTRACT_LIST_REQUEST,
    CONTRACT_LIST_SUCCESS,
    CONTRACT_LIST_FAIL,
    CONTRACT_DELETE_REQUEST,
    CONTRACT_DELETE_SUCCESS,
    CONTRACT_DELETE_FAIL,

} from '../constants/contractConstants'
import { toast } from "react-toastify";


//const base_url=process.env.REACT_APP_BASE_URL
//const base_url='http://localhost:1000'
const base_url='https://investment-api.nodescript-it.com'



export const contractList=()=>{
    return async(dispatch)=>{
        dispatch({type:CONTRACT_LIST_REQUEST})
        try{
            const response=await axios.get(`${base_url}/contracts`)
           
            const {data}=response.data
            dispatch({type:CONTRACT_LIST_SUCCESS,payload:data})
        }catch(error){
            dispatch({type:CONTRACT_LIST_FAIL,payload:error})
        }
    }
}


export const deleteContract = (id) => async (dispatch) => {
    dispatch({ type: CONTRACT_DELETE_REQUEST });
    try {
      await axios.delete(`${base_url}/contracts/${id}`);
      dispatch({ type: CONTRACT_DELETE_SUCCESS, payload: id });
      toast.success("Contract Deleted Successfully")
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message;
      dispatch({
        type: CONTRACT_DELETE_FAIL,
        payload:errorMessage});
      toast.error(`Error : ${errorMessage}`)
    }
  };