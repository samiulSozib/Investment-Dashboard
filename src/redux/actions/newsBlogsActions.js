import axios from "axios";
import {NEWS_BLOGS_LIST_REQUEST,NEWS_BLOGS_LIST_SUCCESS,NEWS_BLOGS_LIST_FAIL} from '../constants/newsBlogConstants'


//const base_url=process.env.REACT_APP_BASE_URL
//const base_url='http://localhost:1000'
const base_url='http://investment-api.nodescript-it.com'



export const newsBlogsList=()=>{
    return async(dispatch)=>{
        dispatch({type:NEWS_BLOGS_LIST_REQUEST})
        try{
            const response=await axios.get(`${base_url}/news-blogs`)
           
            const {data}=response.data
            dispatch({type:NEWS_BLOGS_LIST_SUCCESS,payload:data})
        }catch(error){
            dispatch({type:NEWS_BLOGS_LIST_FAIL,payload:error})
        }
    }
}