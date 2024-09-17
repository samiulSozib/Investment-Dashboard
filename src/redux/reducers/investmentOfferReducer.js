import {INVESTMENT_OFFER_LIST_REQUEST,INVESTMENT_OFFER_LIST_SUCCESS,INVESTMENT_OFFER_LIST_FAIL} from '../constants/investmentOfferconstants'

const initialState={
    investmentOffers:[],
    error:null ,
    loading:false
}

const investmentOfferReducer=(state=initialState,action)=>{
    switch(action.type){
        case INVESTMENT_OFFER_LIST_REQUEST:
            return {...state,loading:true}
        case INVESTMENT_OFFER_LIST_SUCCESS:
            return {...state,loading:false,investmentOffers:action.payload}
        case INVESTMENT_OFFER_LIST_FAIL:
            return {...state,loading:false,error:action.payload}
        default:
            return state
    }
}


export default investmentOfferReducer