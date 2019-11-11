import { createSelector } from 'reselect';

import {
  SET_NUMBERS_OF_PLAYERS,
  FETCH_CARDS_START,
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_ERROR,
} from '../actions/game.actions';

interface GameState {
  numberOfPlayers: number;
  deck: any;
  loading: boolean;
  error: boolean;
  playerCards: Array<any>;
}
export const initialState: GameState = {
  numberOfPlayers: 0,
  deck: null,
  loading: false,
  error: false,
  playerCards: [],
};

const NUMBER_OF_CARDS_PER_PLAYER = 10;

export const chunkArray = (myArray: any, chunk_size: number) => {
  const tempArray = [];

  for (let index = 0; index < myArray.length; index += chunk_size) {
    tempArray.push(myArray.slice(index, index + chunk_size));
  }

  return tempArray;
};

/**
 * Creates new game state
 *
 * @param {initialState} state
 * @param {{type: String, payload: any}} action
 */
export const gameReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_NUMBERS_OF_PLAYERS:
      return {
        ...state,
        numberOfPlayers: action.payload,
      };
    case FETCH_CARDS_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CARDS_SUCCESS:
      const playerCards: any = {};

      const cardsInChunks = chunkArray(
        action.payload.data.cards,
        NUMBER_OF_CARDS_PER_PLAYER,
      );

      for (const index in cardsInChunks) {
        playerCards[`player${+index + 1}`] = cardsInChunks[index];
      }

      return {
        ...state,
        loading: false,
        playerCards,
      };
    case FETCH_CARDS_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
      };
    default:
      return state;
  }
};

export default gameReducer;

/**
 * Selects game parte of the state
 * @param state
 */
export const getGameState = (state: any) => state.game;

/**
 * Selects number of players part of state
 * @param state
 */
export const getNumberOfPlayers = createSelector(
  getGameState,
  gameState => gameState.numberOfPlayers,
);

/**
 * Selects loading part of state
 * @param state
 */
export const getLoadingState = createSelector(
  getGameState,
  gameState => gameState.loading,
);
