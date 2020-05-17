import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'


import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import Forecast from './components/Forecast'

let loggedIn = false
class App extends Component {
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

export default App
