import axios from "axios";
import {BUSINESS_LIST_REQUEST,BUSINESS_LIST_SUCCESS,BUSINESS_LIST_FAIL} from '../constants/businessConstants'


//const base_url=process.env.REACT_APP_BASE_URL
//const base_url='http://localhost:1000'
const base_url='https://investment-api.nodescript-it.com'



export const businessList=()=>{
    return async(dispatch)=>{
        dispatch({type:BUSINESS_LIST_REQUEST})
        try{
            const response=await axios.get(`${base_url}/business`)
           
            const {data}=response.data
            dispatch({type:BUSINESS_LIST_SUCCESS,payload:data})
        }catch(error){
            dispatch({type:BUSINESS_LIST_FAIL,payload:error})
        }
    }
}