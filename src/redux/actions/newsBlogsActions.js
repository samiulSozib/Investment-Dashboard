import axios from "axios";
import {NEWS_BLOGS_LIST_REQUEST,
    NEWS_BLOGS_LIST_SUCCESS,
    NEWS_BLOGS_LIST_FAIL,
    NEWS_BLOGS_DELETE_REQUEST,
    NEWS_BLOGS_DELETE_SUCCESS,
    NEWS_BLOGS_DELETE_FAIL,
    NEWS_BLOGS_ADD_REQUEST,
    NEWS_BLOGS_ADD_SUCCESS,
    NEWS_BLOGS_ADD_FAIL,
    NEWS_BLOGS_EDIT_REQUEST,
    NEWS_BLOGS_EDIT_SUCCESS,
    NEWS_BLOGS_EDIT_FAIL
    } from '../constants/newsBlogConstants'
import { toast } from "react-toastify";


//const base_url=process.env.REACT_APP_BASE_URL
const base_url='http://localhost:1000'
//const base_url='https://investment-api.nodescript-it.com'



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


  // Add News Blog
export const addNewsBlog = (formData) => {
  return async (dispatch) => {
    dispatch({ type: NEWS_BLOGS_ADD_REQUEST });
    try {
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
      const response = await axios.post(`${base_url}/news-blogs`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const { data } = response.data;
      console.log(data)
      dispatch({ type: NEWS_BLOGS_ADD_SUCCESS, payload: data });
      toast.success("News Blog Added Successfully");
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message;
      dispatch({ type: NEWS_BLOGS_ADD_FAIL, payload: errorMessage });
      toast.error(`Error: ${errorMessage}`);
    }
  };
};

// Edit News Blog
export const editNewsBlog = (blogId, formData) => {
  return async (dispatch) => {
    dispatch({ type: NEWS_BLOGS_EDIT_REQUEST });
    try {
      for (let pair of formData.entries()) {
          console.log(`${pair[0]}: ${pair[1]}`);
        }
        const response = await axios.put(`${base_url}/news-blogs/${blogId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      const { data } = response.data;
      console.log(data)
      dispatch({ type: NEWS_BLOGS_EDIT_SUCCESS, payload: data });
      toast.success("News Blog Updated Successfully");
    } catch (error) {
     
      const errorMessage = error.response ? error.response.data.message : error.message;
      console.log(errorMessage)
      dispatch({ type: NEWS_BLOGS_EDIT_FAIL, payload: errorMessage });
      toast.error(`Error: ${errorMessage}`);
    }
  };
};