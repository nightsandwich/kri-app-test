import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import states from './states'
import counties from './counties'
import notes from './notes'
import users from './users'

const reducer = combineReducers({ auth, states, counties, notes, users })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
export * from './states'
export * from './counties'
export * from './notes'
export * from './users'
