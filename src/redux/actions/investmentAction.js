import axios from "axios";
import {INVESTMENT_LIST_REQUEST,INVESTMENT_LIST_SUCCESS,INVESTMENT_LIST_FAIL} from '../constants/investmentConstants'


//const base_url=process.env.REACT_APP_BASE_URL
//const base_url='http://localhost:1000'
const base_url='https://investment-api.nodescript-it.com'



export const investmentList=()=>{
    return async(dispatch)=>{
        dispatch({type:INVESTMENT_LIST_REQUEST})
        try{
            const response=await axios.get(`${base_url}/investments`)
            const {data}=response.data
            dispatch({type:INVESTMENT_LIST_SUCCESS,payload:data})
        }catch(error){
            dispatch({type:INVESTMENT_LIST_FAIL,payload:error})
        }
    }
}