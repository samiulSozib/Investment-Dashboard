import axios from "axios";
import {
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,
    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_FAIL,
    CATEGORY_DELETE_REQUEST,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_DELETE_FAIL ,
    CATEGORY_UPDATE_REQUEST,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_FAIL,
} from '../constants/categoryConstants'
import { toast } from 'react-toastify';

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


export const insertCategory=(categoryInfo)=>{
    return async(dispatch)=>{
        dispatch({type:CATEGORY_CREATE_REQUEST})
        try{
            const response=await axios.post(`${base_url}/business-categories`,categoryInfo)
            const {data}=response.data
            dispatch({type:CATEGORY_CREATE_SUCCESS,payload:data})
            toast.success("Category add successfully")
        }catch(error){
            const errorMessage = error.response ? error.response.data.message : error.message;
            dispatch({type:CATEGORY_CREATE_FAIL,payload:errorMessage})
            toast.error(`Error : ${errorMessage}`)
        }
    }
}


export const deleteCategory = (categoryId) => {
    return async (dispatch) => {
      dispatch({ type: CATEGORY_DELETE_REQUEST });
      try {
        await axios.delete(`${base_url}/business-categories/${categoryId}`);
        dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: categoryId });
        toast.success('Category deleted successfully');
      } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message;
        dispatch({ type: CATEGORY_DELETE_FAIL, payload: errorMessage });
        toast.error(`Error: ${errorMessage}`);
      }
    };
  };


  export const editCategory = (categoryId, categoryInfo) => {
    return async (dispatch) => {
        dispatch({ type: CATEGORY_UPDATE_REQUEST });
        try {
            const response = await axios.put(`${base_url}/business-categories/${categoryId}`, categoryInfo);
            const { data } = response.data;
            dispatch({ type: CATEGORY_UPDATE_SUCCESS, payload: data });
            toast.success("Category updated successfully");
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            dispatch({ type: CATEGORY_UPDATE_FAIL, payload: errorMessage });
            toast.error(`Error: ${errorMessage}`);
        }
    };
};