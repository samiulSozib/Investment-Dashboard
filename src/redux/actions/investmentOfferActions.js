import axios from "axios";
import {INVESTMENT_OFFER_LIST_REQUEST,INVESTMENT_OFFER_LIST_SUCCESS,INVESTMENT_OFFER_LIST_FAIL} from '../constants/investmentOfferconstants'


//const base_url=process.env.REACT_APP_BASE_URL
//const base_url='http://localhost:1000'
const base_url='http://investment-api.nodescript-it.com'



export const investementOffertList=()=>{
    return async(dispatch)=>{
        dispatch({type:INVESTMENT_OFFER_LIST_REQUEST})
        try{
            const response=await axios.get(`${base_url}/investment-offers`)
            const {data}=response.data
            dispatch({type:INVESTMENT_OFFER_LIST_SUCCESS,payload:data})
        }catch(error){
            dispatch({type:INVESTMENT_OFFER_LIST_FAIL,payload:error})
        }
    }
}