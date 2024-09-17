import axios from "axios";
import {USERS_LIST_REQUEST,USERS_LIST_SUCCESS,USERS_LIST_FAIL} from '../constants/userConstants'


//const base_url=process.env.REACT_APP_BASE_URL
//const base_url='http://localhost:1000'
const base_url='https://investment-api.nodescript-it.com'



export const contractList=()=>{
    return async(dispatch)=>{
        dispatch({type:USERS_LIST_REQUEST})
        try{
            const response=await axios.get(`${base_url}/news-blogs`)
           
            const {data}=response.data
            dispatch({type:USERS_LIST_SUCCESS,payload:data})
        }catch(error){
            dispatch({type:USERS_LIST_FAIL,payload:error})
        }
    }
}