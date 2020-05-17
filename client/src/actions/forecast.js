import axios from 'axios'
import { FORECAST_SUCCESS, FORECAST_ERROR, FORECAST_LOADING } from '../types'
import config from '../config'

export const getForecast = () => dispatch => {
  dispatch(WeatherForecastLoading())
  const instance = axios.create({
    baseURL: config.SERVER_HOST
  })

  instance.defaults.headers.common.Authorization = 'Bearer ' + localStorage.jwtToken
  instance.defaults.headers.common['Content-Type'] = 'application/json'

  instance.get('/api/forecast')
    .then(res => {
      const { forecast, success } = res.data
        if(success !== true) {
          return dispatch(fetchWeatherForecastError(res.data))
        }
      dispatch(getWeatherForecastSuccess(forecast))
    })
    .catch(err => {
      dispatch(fetchWeatherForecastError(err))
    })
}

export const getWeatherForecastSuccess = forecast => {
  return {
    type: FORECAST_SUCCESS,
    payload: forecast
  }
}

export const WeatherForecastLoading = () => {
  return {
    type: FORECAST_LOADING
  }
}

export const fetchWeatherForecastError = payload => {
  return {
    type: FORECAST_ERROR,
    payload
  }
}
