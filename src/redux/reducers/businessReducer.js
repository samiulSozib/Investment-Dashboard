import {BUSINESS_LIST_REQUEST,BUSINESS_LIST_SUCCESS,BUSINESS_LIST_FAIL} from '../constants/businessConstants'

const initialState={
    businesses:[],
    error:null ,
    loading:false
}

const businessesReducer=(state=initialState,action)=>{
    switch(action.type){
        case BUSINESS_LIST_REQUEST:
            return {...state,loading:true}
        case BUSINESS_LIST_SUCCESS:
            return {...state,loading:false,businesses:action.payload}
        case BUSINESS_LIST_FAIL:
            return {...state,loading:false,error:action.payload}
        default:
            return state
    }
}


export default businessesReducer