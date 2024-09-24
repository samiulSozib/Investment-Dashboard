import {
    BUSINESS_PERFORMANCE_LIST_REQUEST,
    BUSINESS_PERFORMANCE_LIST_SUCCESS,
    BUSINESS_PERFORMANCE_LIST_FAIL,
    BUSINESS_PERFORMANCE_INSERT_REQUEST,
    BUSINESS_PERFORMANCE_INSERT_SUCCESS,
    BUSINESS_PERFORMANCE_INSERT_FAIL,
    BUSINESS_PERFORMANCE_DELETE_REQUEST,
    BUSINESS_PERFORMANCE_DELETE_SUCCESS,
    BUSINESS_PERFORMANCE_DELETE_FAIL
} from '../constants/businessPerformanceConstants'


const initialState={
    businessPerformances:[],
    error:null ,
    loading:false
}

const businessesPerformanceReducer=(state=initialState,action)=>{
    switch(action.type){
        case BUSINESS_PERFORMANCE_LIST_REQUEST:
            return {...state,loading:true}
        case BUSINESS_PERFORMANCE_LIST_SUCCESS:
            return {...state,loading:false,businessPerformances:action.payload}
        case BUSINESS_PERFORMANCE_LIST_FAIL:
            return {...state,loading:false,error:action.payload}

        case BUSINESS_PERFORMANCE_INSERT_REQUEST:
            return { ...state, loading: true };
        case BUSINESS_PERFORMANCE_INSERT_SUCCESS:
            return {
                ...state,
                loading: false,
                businessPerformances: [...state.businessPerformances, action.payload],
            };
        case BUSINESS_PERFORMANCE_INSERT_FAIL:
             return { ...state, loading: false, error: action.payload };

        case BUSINESS_PERFORMANCE_DELETE_REQUEST:
            return { ...state, loading: true };
        case BUSINESS_PERFORMANCE_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                businessPerformances: state.businessPerformances.filter(
                    (performance) => performance.id !== action.payload
                ),
            };
        case BUSINESS_PERFORMANCE_DELETE_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state
    }
}


export default businessesPerformanceReducer