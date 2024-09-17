import axios from "axios";
import {BEST_PERFORMING_BUSINESS_LIST_REQUEST,BEST_PERFORMING_BUSINESS_LIST_SUCCESS,BEST_PERFORMING_BUSINESS_LIST_FAIL} from '../constants/bestPerformingBusinessConstant'


//const base_url=process.env.REACT_APP_BASE_URL
//const base_url='http://localhost:1000'
const base_url='https://investment-api.nodescript-it.com'



export const bestPerformingBusinessList=()=>{
    return async(dispatch)=>{
        dispatch({type:BEST_PERFORMING_BUSINESS_LIST_REQUEST})
        try{
            const response=await axios.get(`${base_url}/best-performing-businesses`)
           
            const {data}=response.data
            dispatch({type:BEST_PERFORMING_BUSINESS_LIST_SUCCESS,payload:data})
        }catch(error){
            dispatch({type:BEST_PERFORMING_BUSINESS_LIST_FAIL,payload:error})
        }
    }
}