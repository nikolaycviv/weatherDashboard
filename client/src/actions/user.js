import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { USER_ERROR, SET_CURRENT_USER } from '../types'
import setUserAuth from '../lib/setUserAuth'
import config from '../config'
const reqConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
}
export const registerUser = (user, history) => dispatch => {
  axios.post(config.SERVER_HOST + '/user/register', user, reqConfig)
    .then(res => history.push('/login'))
    .catch(err => {
      dispatch({
        type: USER_ERROR,
        payload: err.response.data
      })
    })
}

export const loginUser = (user) => dispatch => {
  axios.post(config.SERVER_HOST + '/user/login', user, reqConfig)
    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      setUserAuth(token)
      const jwt = jwtDecode(token)
      dispatch(setCurrentUser(jwt))
    })
    .catch(err => {
      dispatch({
        type: USER_ERROR,
        payload: err.response.data
      })
    })
}

export const setCurrentUser = jwt => {
  return {
    type: SET_CURRENT_USER,
    payload: jwt
  }
}

export const logoutUser = (history) => dispatch => {
  localStorage.removeItem('jwtToken')
  setUserAuth(false)
  dispatch(setCurrentUser({}))
  history.push('/login')
}
