import {INVESTMENT_LIST_REQUEST,
    INVESTMENT_LIST_SUCCESS,
    INVESTMENT_LIST_FAIL,
    INVESTMENT_DELETE_REQUEST,
    INVESTMENT_DELETE_SUCCESS,
    INVESTMENT_DELETE_FAIL,
    INVESTMENT_STATUS_CHANGE_REQUEST,
    INVESTMENT_STATUS_CHANGE_SUCCESS,
    INVESTMENT_STATUS_CHANGE_FAIL,
} from '../constants/investmentConstants'

const initialState={
    investments:[],
    error:null ,
    loading:false
}

const investmentReducer=(state=initialState,action)=>{
    switch(action.type){
        case INVESTMENT_LIST_REQUEST:
            return {...state,loading:true}
        case INVESTMENT_LIST_SUCCESS:
            return {...state,loading:false,investments:action.payload}
        case INVESTMENT_LIST_FAIL:
            return {...state,loading:false,error:action.payload}
        case INVESTMENT_DELETE_REQUEST:
            return {
                    ...state,
                    loading: true,
                    };
        case INVESTMENT_DELETE_SUCCESS:
            return {
                    ...state,
                    loading: false,
                    investments: state.investments.filter((investment) => investment.id !== action.payload),
                    };
        case INVESTMENT_DELETE_FAIL:
            return {
                    ...state,
                    loading: false,
                    error: action.payload,
                    };

        case INVESTMENT_STATUS_CHANGE_REQUEST:
            return { ...state, loading: true };
        case INVESTMENT_STATUS_CHANGE_SUCCESS:
            return {
                    ...state,
                    loading: false,
                    investments: state.investments.map((investment) =>
                    investment.id === action.payload.id
                    ? { ...investment, status: action.payload.status }
                    : investment
                ),
            };
        case INVESTMENT_STATUS_CHANGE_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state
    }
}


export default investmentReducer