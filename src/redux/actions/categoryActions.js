import axios from "axios";
import {CATEGORY_LIST_REQUEST,CATEGORY_LIST_SUCCESS,CATEGORY_LIST_FAIL} from '../constants/categoryConstants'


//const base_url=process.env.REACT_APP_BASE_URL
//const base_url='http://localhost:1000'
const base_url='https://investment-api.nodescript-it.com'



export const categoryList=()=>{
    return async(dispatch)=>{
        dispatch({type:CATEGORY_LIST_REQUEST})
        try{
            const response=await axios.get(`${base_url}/business-categories`)
           
            const {data}=response.data
            dispatch({type:CATEGORY_LIST_SUCCESS,payload:data})
        }catch(error){
            dispatch({type:CATEGORY_LIST_FAIL,payload:error})
        }
    }
}