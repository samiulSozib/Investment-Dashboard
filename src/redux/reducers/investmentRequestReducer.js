import {INVESTMENT_REQUEST_LIST_REQUEST,
    INVESTMENT_REQUEST_LIST_SUCCESS,
    INVESTMENT_REQUEST_LIST_FAIL,
    INVESTMENT_REQUEST_DELETE_REQUEST,
    INVESTMENT_REQUEST_DELETE_SUCCESS,
    INVESTMENT_REQUEST_DELETE_FAIL,
    INVESTMENT_REQUEST_STATUS_UPDATE_REQUEST,
    INVESTMENT_REQUEST_STATUS_UPDATE_SUCCESS,
    INVESTMENT_REQUEST_STATUS_UPDATE_FAIL
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
                investmentRequests: state.investmentRequests.filter((request) => request.id !== action.payload),
            };
          
        case INVESTMENT_REQUEST_DELETE_FAIL:
            return { ...state, loading: false, error: action.payload };

        case INVESTMENT_REQUEST_STATUS_UPDATE_REQUEST:
            return { ...state, loading: true };
    
        case INVESTMENT_REQUEST_STATUS_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                investmentRequests: state.investmentRequests.map(request =>
                    request.id === action.payload.id ? { ...request, status: action.payload.status } : request
                ),
            };
    
        case INVESTMENT_REQUEST_STATUS_UPDATE_FAIL:
            return { ...state, loading: false, error: action.payload };

        default:
            return state
    }
}


export default investmentRequestReducer