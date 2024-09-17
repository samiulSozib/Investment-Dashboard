import axios from "axios";
import {BUSINESS_PERFORMANCE_LIST_REQUEST,BUSINESS_PERFORMANCE_LIST_SUCCESS,BUSINESS_PERFORMANCE_LIST_FAIL} from '../constants/businessPerformanceConstants'


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