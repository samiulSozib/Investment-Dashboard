import axios from "axios";
import {INVESTMENT_OFFER_LIST_REQUEST,INVESTMENT_OFFER_LIST_SUCCESS,INVESTMENT_OFFER_LIST_FAIL,

    INVESTMENT_OFFER_STATUS_UPDATE_REQUEST,
    INVESTMENT_OFFER_STATUS_UPDATE_SUCCESS,
    INVESTMENT_OFFER_STATUS_UPDATE_FAIL
} from '../constants/investmentOfferconstants'
import { toast } from "react-toastify";


//const base_url=process.env.REACT_APP_BASE_URL
//const base_url='http://localhost:1000'
const base_url='https://investment-api.nodescript-it.com'



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

export const updateInvestmentOfferStatus = (id, status) => {
    return async (dispatch) => {
        dispatch({ type: INVESTMENT_OFFER_STATUS_UPDATE_REQUEST });

        try {
            const response = await axios.patch(`${base_url}/investment-offers/${id}/status`, { status });
            dispatch({
                type: INVESTMENT_OFFER_STATUS_UPDATE_SUCCESS,
                payload: { id, status }
            });
            toast.success("Investment Offer status updated successfully");
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            dispatch({
                type: INVESTMENT_OFFER_STATUS_UPDATE_FAIL,
                payload: errorMessage
            });
            toast.error(`Error: ${errorMessage}`);
        }
    };
};