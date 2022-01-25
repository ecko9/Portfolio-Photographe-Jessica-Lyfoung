import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import imagesReducer from './images/reducer';

const rootReducer = combineReducers({
  imagesReducer
})

let store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunkMiddleware),
  )
);

export default store;