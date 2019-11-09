import { createSelector } from 'reselect';

import {
  SET_NUMBERS_OF_PLAYERS,
  SetNumberOfPlayersAction,
} from '../actions/game.actions';

interface GameState {
  numberOfPlayers: number;
}
export const initialState: GameState = {
  numberOfPlayers: 0,
};

/**
 * Creates new game state
 *
 * @param {initialState} state
 * @param {{type: String, payload: any}} action
 */
const gameReducer = (
  state = initialState,
  action: SetNumberOfPlayersAction,
) => {
  switch (action.type) {
    case SET_NUMBERS_OF_PLAYERS:
      return {
        ...initialState,
        numberOfPlayers: action.payload,
      };
    default:
      return state;
  }
};

export default gameReducer;

/**
 * Selects game parte of the state
 */
export const getGameState = (state: any) => state.game;

/**
 * Selects number of players part of state
 */
export const getNumberOfPlayers = createSelector(
  getGameState,
  gameState => gameState.numberOfPlayers,
);
