import {BEST_PERFORMING_INVESTOR_LIST_REQUEST,BEST_PERFORMING_INVESTOR_LIST_SUCCESS,BEST_PERFORMING_INVESTOR_LIST_FAIL} from '../constants/bestPerformingInvestorConstant'


const initialState={
    bestPerformingInvestors:[],
    error:null ,
    loading:false
}

const bestPerformingInvestorsReducer=(state=initialState,action)=>{
    switch(action.type){
        case BEST_PERFORMING_INVESTOR_LIST_REQUEST:
            return {...state,loading:true}
        case BEST_PERFORMING_INVESTOR_LIST_SUCCESS:
            return {...state,loading:false,bestPerformingInvestors:action.payload}
        case BEST_PERFORMING_INVESTOR_LIST_FAIL:
            return {...state,loading:false,error:action.payload}
        default:
            return state
    }
}


export default bestPerformingInvestorsReducer