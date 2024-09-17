import axios from "axios";
import {BEST_PERFORMING_INVESTOR_LIST_REQUEST,BEST_PERFORMING_INVESTOR_LIST_SUCCESS,BEST_PERFORMING_INVESTOR_LIST_FAIL} from '../constants/bestPerformingInvestorConstant'


//const base_url=process.env.REACT_APP_BASE_URL
//const base_url='http://localhost:1000'
const base_url='https://investment-api.nodescript-it.com'



export const bestPerformingInvestorsList=()=>{
    return async(dispatch)=>{
        dispatch({type:BEST_PERFORMING_INVESTOR_LIST_REQUEST})
        try{
            const response=await axios.get(`${base_url}/best-performing-investors`)
           
            const {data}=response.data
            dispatch({type:BEST_PERFORMING_INVESTOR_LIST_SUCCESS,payload:data})
        }catch(error){
            dispatch({type:BEST_PERFORMING_INVESTOR_LIST_FAIL,payload:error})
        }
    }
}