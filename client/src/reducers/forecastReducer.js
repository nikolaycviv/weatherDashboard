import { FORECAST_SUCCESS, FORECAST_ERROR, FORECAST_LOADING } from '../types'

const initialState = {
  weatherForecast: {},
  error: false,
  loading: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FORECAST_SUCCESS:
      return {
        ...state,
        weatherForecast: action.payload,
        error: false,
        loading: false
      }
    case FORECAST_ERROR:
      return {
        ...state,
        error: true,
        loading: false
      }
    case FORECAST_LOADING:
      return {
        ...state,
        loading: true,
        error: false
      }
    default:
      return state
  }
}
