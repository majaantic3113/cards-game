import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import gameReducer from './reducers/game.reducer';

const store = createStore(
  combineReducers({ game: gameReducer }),
  applyMiddleware(thunk),
);

export default store;
