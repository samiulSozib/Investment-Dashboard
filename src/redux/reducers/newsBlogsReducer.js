import {NEWS_BLOGS_LIST_REQUEST,NEWS_BLOGS_LIST_SUCCESS,NEWS_BLOGS_LIST_FAIL} from '../constants/newsBlogConstants'

const initialState={
    newsBlogs:[],
    error:null ,
    loading:false
}

const newsBlogsReducer=(state=initialState,action)=>{
    switch(action.type){
        case NEWS_BLOGS_LIST_REQUEST:
            return {...state,loading:true}
        case NEWS_BLOGS_LIST_SUCCESS:
            return {...state,loading:false,newsBlogs:action.payload}
        case NEWS_BLOGS_LIST_FAIL:
            return {...state,loading:false,error:action.payload}
        default:
            return state
    }
}


export default newsBlogsReducer