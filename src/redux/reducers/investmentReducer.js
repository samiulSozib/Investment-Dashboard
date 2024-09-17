import {INVESTMENT_LIST_REQUEST,INVESTMENT_LIST_SUCCESS,INVESTMENT_LIST_FAIL} from '../constants/investmentConstants'

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
        default:
            return state
    }
}


export default investmentReducer