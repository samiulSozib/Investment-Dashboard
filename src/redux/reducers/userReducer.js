import {USERS_LIST_REQUEST,USERS_LIST_SUCCESS,USERS_LIST_FAIL,USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL} from '../constants/userConstants'

const initialState={
    users:[],
    error:null ,
    loading:false
}

const usersReducer=(state=initialState,action)=>{
    switch(action.type){
        case USERS_LIST_REQUEST:
            return {...state,loading:true}
        case USERS_LIST_SUCCESS:
            return {...state,loading:false,users:action.payload}
        case USERS_LIST_FAIL:
            return {...state,loading:false,error:action.payload}

        case USER_DELETE_REQUEST:
            return { ...state, loading: true, error: null };
        case USER_DELETE_SUCCESS:
                return { 
                    ...state, 
                loaing: false, 
                users: state.users.filter(user => user.id !== action.payload)
            };
        case USER_DELETE_FAIL:
                return { ...state, loading: false, error: action.payload };
        default:
            return state
    }
}


export default usersReducer