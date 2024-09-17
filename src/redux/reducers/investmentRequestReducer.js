import {INVESTMENT_REQUEST_LIST_REQUEST,INVESTMENT_REQUEST_LIST_SUCCESS,INVESTMENT_REQUEST_LIST_FAIL} from '../constants/investmentRequestConstants'

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
        default:
            return state
    }
}


export default investmentRequestReducer