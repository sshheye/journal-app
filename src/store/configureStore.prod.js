import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import api from '../middlewares/api'
import rootReducer from '../reducers'
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk, api)
)

export default configureStore
