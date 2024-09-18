import {INVESTMENT_REQUEST_LIST_REQUEST,
    INVESTMENT_REQUEST_LIST_SUCCESS,
    INVESTMENT_REQUEST_LIST_FAIL,
    INVESTMENT_REQUEST_DELETE_REQUEST,
    INVESTMENT_REQUEST_DELETE_SUCCESS,
    INVESTMENT_REQUEST_DELETE_FAIL,
} from '../constants/investmentRequestConstants'

const initialState={
    investmentRequests:[],
    error:null ,
    loading:false
}

const investmentRequestReducer=(state=initialState,action)=>{
    switch(action.type){
        case INVESTMENT_REQUEST_LIST_REQUEST:
            return {...state,loading:true}

        case INVESTMENT_REQUEST_LIST_SUCCESS:
            return {...state,loading:false,investmentRequests:action.payload}

        case INVESTMENT_REQUEST_LIST_FAIL:
            return {...state,loading:false,error:action.payload}

        case INVESTMENT_REQUEST_DELETE_REQUEST:
            return { ...state, loading: true };
          
        case INVESTMENT_REQUEST_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: state.investmentRequests.filter((request) => request.id !== action.payload),
            };
          
        case INVESTMENT_REQUEST_DELETE_FAIL:
            return { ...state, loading: false, error: action.payload };

        default:
            return state
    }
}


export default investmentRequestReducer