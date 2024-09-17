import {BEST_PERFORMING_BUSINESS_LIST_REQUEST,BEST_PERFORMING_BUSINESS_LIST_SUCCESS,BEST_PERFORMING_BUSINESS_LIST_FAIL} from '../constants/bestPerformingBusinessConstant'


const initialState={
    bestPerformingBusinesss:[],
    error:null ,
    loading:false
}

const bestPerformingBusinessReducer=(state=initialState,action)=>{
    switch(action.type){
        case BEST_PERFORMING_BUSINESS_LIST_REQUEST:
            return {...state,loading:true}
        case BEST_PERFORMING_BUSINESS_LIST_SUCCESS:
            return {...state,loading:false,bestPerformingBusinesss:action.payload}
        case BEST_PERFORMING_BUSINESS_LIST_FAIL:
            return {...state,loading:false,error:action.payload}
        default:
            return state
    }
}


export default bestPerformingBusinessReducer