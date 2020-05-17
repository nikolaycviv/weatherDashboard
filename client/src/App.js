import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import jwtDecode from 'jwt-decode'
import 'bootstrap/dist/css/bootstrap.min.css'

import setUserAuth from './lib/setUserAuth'
import store from './store'
import { setCurrentUser, logoutUser } from './actions/user'

import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import Forecast from './components/Forecast'

let loggedIn = false

if (localStorage.jwtToken) {
  setUserAuth(localStorage.jwtToken)
  const token = jwtDecode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(token))

  const currentTime = Date.now() / 1000
  if (token.exp < currentTime) {
    store.dispatch(logoutUser())
    window.location.href = '/login'
  }
  loggedIn = true
}

export default class App extends Component {
  render () {
    return (
      <Provider store = { store }>
        <Router>
          <div>
            <Navbar />
            <Route exact path="/">
              {loggedIn ? <Redirect to="/forecast" /> : <Home />}
            </Route>
            <div className="container">
              <Route exact path="/register" component={ Register } />
              <Route exact path="/login" component={ Login } />
              <Route exact path="/forecast" component={Forecast} />
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}
