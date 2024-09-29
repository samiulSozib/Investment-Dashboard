import {
    BUSINESS_LIST_REQUEST,
    BUSINESS_LIST_SUCCESS,
    BUSINESS_LIST_FAIL,
    INSERT_BUSINESS_REQUEST,
    INSERT_BUSINESS_SUCCESS,
    INSERT_BUSINESS_FAIL,
    DELETE_BUSINESS_REQUEST,
    DELETE_BUSINESS_SUCCESS,
    DELETE_BUSINESS_FAIL,
    EDIT_BUSINESS_REQUEST,
    EDIT_BUSINESS_SUCCESS,
    EDIT_BUSINESS_FAIL,
    UPDATE_BUSINESS_STATUS_REQUEST,
    UPDATE_BUSINESS_STATUS_SUCCESS,
    UPDATE_BUSINESS_STATUS_FAIL
  } from '../constants/businessConstants';
  
  const initialState = {
    businesses: [],
    error: null,
    loading: false,
    totalItems:0
  };
  
  const businessReducer = (state = initialState, action) => {
    switch (action.type) {
      case BUSINESS_LIST_REQUEST:
        return { ...state, loading: true };
        
      case BUSINESS_LIST_SUCCESS:
        return { ...state, loading: false, businesses: action.payload.data,totalItems:action.payload.totalItems };
        
      case BUSINESS_LIST_FAIL:
        return { ...state, loading: false, error: action.payload };
        
      case INSERT_BUSINESS_REQUEST:
        return { ...state, loading: true };
        
      case INSERT_BUSINESS_SUCCESS:
        return { ...state, loading: false, businesses: [...state.businesses, action.payload] };
        
      case INSERT_BUSINESS_FAIL:
        return { ...state, loading: false, error: action.payload };
        
      case DELETE_BUSINESS_REQUEST:
        return { ...state, loading: true };
        
      case DELETE_BUSINESS_SUCCESS:
        return { ...state, loading: false, businesses: state.businesses.filter(business => business.id !== action.payload) };
        
      case DELETE_BUSINESS_FAIL:
        return { ...state, loading: false, error: action.payload };

      case EDIT_BUSINESS_REQUEST:
        return { ...state, loading: true };
      case EDIT_BUSINESS_SUCCESS:
        return {
          ...state,
          loading: false,
          businesses: state.businesses.map(business => 
             business.id === action.payload.id ? action.payload : business
          ),
        };
      case EDIT_BUSINESS_FAIL:
        return { ...state, loading: false, error: action.payload };

      case UPDATE_BUSINESS_STATUS_REQUEST:
        return { ...state, loading: true };
    
      case UPDATE_BUSINESS_STATUS_SUCCESS:
        return {
            ...state,
            loading: false,
            businesses: state.businesses.map(business =>
              business.id === action.payload.id
                ? { ...business, status: action.payload.status }
                : business
            ),
          };
    
      case UPDATE_BUSINESS_STATUS_FAIL:
        return { ...state, loading: false, error: action.payload };
        
      default:
        return state;
    }
  };
  
  export default businessReducer;
  