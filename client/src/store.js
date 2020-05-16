import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const inititalState = {
  user: null,
  serverHost: 'localhost:4000',
  location: 'sofia,bg'
}

const store = createStore(
  rootReducer,
  inititalState,
  compose(applyMiddleware(thunk))
)

export default store
