import axios from "axios";
import {NEWS_BLOGS_LIST_REQUEST,
    NEWS_BLOGS_LIST_SUCCESS,
    NEWS_BLOGS_LIST_FAIL,
    NEWS_BLOGS_DELETE_REQUEST,
    NEWS_BLOGS_DELETE_SUCCESS,
    NEWS_BLOGS_DELETE_FAIL
    } from '../constants/newsBlogConstants'
import { toast } from "react-toastify";


//const base_url=process.env.REACT_APP_BASE_URL
//const base_url='http://localhost:1000'
const base_url='https://investment-api.nodescript-it.com'



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


export const deleteNewsBlog = (blogId) => {
    return async (dispatch) => {
      dispatch({ type: NEWS_BLOGS_DELETE_REQUEST });
      try {
        await axios.delete(`${base_url}/news-blogs/${blogId}`);
        dispatch({ type: NEWS_BLOGS_DELETE_SUCCESS, payload: blogId });
        toast.success("News Blog Deleted Successfully")
      } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message;
        dispatch({ type: NEWS_BLOGS_DELETE_FAIL, payload: errorMessage });
        toast.error(`Error: ${errorMessage}`)
      }
    };
  };