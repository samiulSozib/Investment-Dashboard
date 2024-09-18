import {
    CONTRACT_LIST_REQUEST,
    CONTRACT_LIST_SUCCESS,
    CONTRACT_LIST_FAIL,
    CONTRACT_DELETE_REQUEST,
    CONTRACT_DELETE_SUCCESS,
    CONTRACT_DELETE_FAIL,
} from '../constants/contractConstants'

const initialState={
    contracts:[],
    error:null ,
    loading:false
}

const contractReducer=(state=initialState,action)=>{
    switch(action.type){
        case CONTRACT_LIST_REQUEST:
            return {...state,loading:true}
        case CONTRACT_LIST_SUCCESS:
            return {...state,loading:false,contracts:action.payload}
        case CONTRACT_LIST_FAIL:
            return {...state,loading:false,error:action.payload}
        case CONTRACT_DELETE_REQUEST:
            return { ...state, loading: true };
        case CONTRACT_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                contracts: state.contracts.filter(contract => contract.id !== action.payload),
            };
        case CONTRACT_DELETE_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state
    }
}


export default contractReducer