import {INVESTMENT_OFFER_LIST_REQUEST,INVESTMENT_OFFER_LIST_SUCCESS,INVESTMENT_OFFER_LIST_FAIL,

    INVESTMENT_OFFER_STATUS_UPDATE_REQUEST,
    INVESTMENT_OFFER_STATUS_UPDATE_SUCCESS,
    INVESTMENT_OFFER_STATUS_UPDATE_FAIL
} from '../constants/investmentOfferconstants'

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

        case INVESTMENT_OFFER_STATUS_UPDATE_REQUEST:
            return { ...state, loading: true };
    
         case INVESTMENT_OFFER_STATUS_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                investmentOffers: state.investmentOffers.map(offer =>
                    offer.id === action.payload.id ? { ...offer, status: action.payload.status } : offer
                ),
            };
    
        case INVESTMENT_OFFER_STATUS_UPDATE_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state
    }
}


export default investmentOfferReducer