import axios from "axios";
import {CONTRACT_LIST_REQUEST,CONTRACT_LIST_SUCCESS,CONTRACT_LIST_FAIL} from '../constants/contractConstants'


//const base_url=process.env.REACT_APP_BASE_URL
//const base_url='http://localhost:1000'
const base_url='http://investment-api.nodescript-it.com'



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