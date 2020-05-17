import { combineReducers } from 'redux'
import errorReducer from './errorReducer'
import authReducer from './authReducer'
import forecastReducer from './forecastReducer'

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  forecast: forecastReducer
})
