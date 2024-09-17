import {combineReducers} from 'redux'
import authReducer from './authReducer'
import businessesReducer from './businessReducer'
import investmentReducer from './investmentReducer'
import investmentRequestReducer from './investmentRequestReducer'
import investmentOfferReducer from './investmentOfferReducer'
import contractReducer from './contractReducer'
import businessesPerformanceReducer from './businessPerformanceReducer'
import bestPerformingBusinessReducer from './bestPerformingBusinessReducer'
import bestPerformingInvestorsReducer from './bestPerformingInvestorReducer'
import newsBlogsReducer from './newsBlogsReducer'
import categoryReducer from './categoryReducer'

const rootReducer=combineReducers({
    auth:authReducer,
    businesses:businessesReducer,
    investments:investmentReducer,
    investmentRequests:investmentRequestReducer,
    investmentOffer:investmentOfferReducer,
    contracts:contractReducer,
    businessPerformance:businessesPerformanceReducer,
    bestPerformingBusiness:bestPerformingBusinessReducer,
    bestPerformingInvestors:bestPerformingInvestorsReducer,
    newsBlogs:newsBlogsReducer,
    category:categoryReducer
})

export default rootReducer