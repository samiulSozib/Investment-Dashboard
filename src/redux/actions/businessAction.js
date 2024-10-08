import axios from "axios";
import {BUSINESS_LIST_REQUEST,
    BUSINESS_LIST_SUCCESS,
    BUSINESS_LIST_FAIL,
    INSERT_BUSINESS_REQUEST,
    INSERT_BUSINESS_SUCCESS,
    INSERT_BUSINESS_FAIL,
    DELETE_BUSINESS_REQUEST,
    DELETE_BUSINESS_SUCCESS,
    DELETE_BUSINESS_FAIL,
    EDIT_BUSINESS_REQUEST,
    EDIT_BUSINESS_SUCCESS,
    EDIT_BUSINESS_FAIL,
    UPDATE_BUSINESS_STATUS_REQUEST,
    UPDATE_BUSINESS_STATUS_SUCCESS,
    UPDATE_BUSINESS_STATUS_FAIL 
} from '../constants/businessConstants'
import { toast } from 'react-toastify';


//const base_url=process.env.REACT_APP_BASE_URL
//const base_url='http://localhost:1000'
const base_url='https://investment-api.nodescript-it.com'



export const businessList=(page,item_per_page)=>{
    return async(dispatch)=>{
        dispatch({type:BUSINESS_LIST_REQUEST})
        try{
            const response=await axios.get(`${base_url}/business?page=${page}&item_per_page=${item_per_page}`)
           
            const data=response.data.data
            const totalItems=response.data.payload.pagination.total_items
            dispatch({type:BUSINESS_LIST_SUCCESS,payload:{data,totalItems}})

        }catch(error){
            dispatch({type:BUSINESS_LIST_FAIL,payload:error})
        }
    }
} 

export const insertBusiness = (businessData) => {
    return async (dispatch) => {
      dispatch({ type: INSERT_BUSINESS_REQUEST });
      try {
        const response = await axios.post(`${base_url}/business`, businessData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        const { data } = response.data;
        dispatch({ type: INSERT_BUSINESS_SUCCESS, payload: data });
        toast.success("Business Created Successfully")
      } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message;
        dispatch({ type: INSERT_BUSINESS_FAIL, payload: errorMessage });
        toast.error(`Error : ${errorMessage}`)
      }
    };
  };


  export const deleteBusiness = (businessId) => {
    return async (dispatch) => {
      dispatch({ type: DELETE_BUSINESS_REQUEST });
      try {
        await axios.delete(`${base_url}/business/${businessId}`);
        dispatch({ type: DELETE_BUSINESS_SUCCESS, payload: businessId });
        toast.success("Business Deleted Successfully")
      } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message;
        dispatch({ type: DELETE_BUSINESS_FAIL, payload: errorMessage });
        toast.error(`Error : ${errorMessage}`)
      }
    };
  };

  export const editBusiness = (businessId, updatedData) => {
    return async (dispatch) => {
      dispatch({ type: EDIT_BUSINESS_REQUEST });
      try {
        const response = await axios.put(`${base_url}/business/${businessId}`, updatedData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const { data } = response.data;
        dispatch({ type: EDIT_BUSINESS_SUCCESS, payload: data });
        toast.success("Business Updated Successfully");
      } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message;
        dispatch({ type: EDIT_BUSINESS_FAIL, payload: errorMessage });
        toast.error(`Error : ${errorMessage}`);
      }
    };
  };


  export const updateBusinessStatus = (businessId, newStatus) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_BUSINESS_STATUS_REQUEST });
        try {
            // Make the PATCH request to update the business status
            const response = await axios.patch(`${base_url}/business/${businessId}/status`, {
                status: newStatus,
            });

            const { data } = response.data;
            dispatch({ type: UPDATE_BUSINESS_STATUS_SUCCESS, payload: data });
            toast.success("Business Status Updated Successfully");
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            dispatch({ type: UPDATE_BUSINESS_STATUS_FAIL, payload: errorMessage });
            toast.error(`Error : ${errorMessage}`);
        }
    };
};