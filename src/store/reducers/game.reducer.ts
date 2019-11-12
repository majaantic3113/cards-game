import { createSelector } from 'reselect';

import {
  SET_NUMBERS_OF_PLAYERS,
  FETCH_CARDS_START,
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_ERROR,
  THROW_CARD_PLAYER,
  THROW_CARD_COMPUTER,
  FIND_ROUND_WINNER,
} from '../actions/game.actions';

interface GameState {
  numberOfPlayers: number;
  deck: any;
  loading: boolean;
  error: boolean;
  players: any;
  cardsOnTable: Array<any>;
  moveInProgress: boolean;
}
export const initialState: GameState = {
  numberOfPlayers: 0,
  deck: null,
  loading: false,
  error: false,
  players: {},
  cardsOnTable: [],
  moveInProgress: false,
};

const NUMBER_OF_CARDS_PER_PLAYER = 10;

const CARD_VALUES: any = {
  ACE: 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  JACK: 12,
  QUEEN: 13,
  KING: 14,
};

// helpers
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
        playerCards[`player${+index + 1}`] = {
          cards: cardsInChunks[index],
          score: 0,
        };
      }

      return {
        ...state,
        loading: false,
        players: playerCards,
      };
    case FETCH_CARDS_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case THROW_CARD_COMPUTER:
      const player = action.payload;

      const cardRandom =
        state.players[player].cards[
          Math.floor(Math.random() * state.players[player].cards.length)
        ];

      const updated = {
        ...state.players[player],
        cards: state.players[player].cards.filter((card: any) => {
          return card.code !== cardRandom.code;
        }),
      };

      return {
        ...state,
        cardsOnTable: [
          ...state.cardsOnTable,
          { user: player, card: cardRandom },
        ],
        players: { ...state.players, [player]: updated },
        moveInProgress: true,
      };

    case THROW_CARD_PLAYER:
      const playerOnMove = action.payload.user;
      const cardThrown = action.payload.card;

      const updatedPlayer = {
        ...state.players[playerOnMove],
        cards: state.players[playerOnMove].cards.filter((card: any) => {
          return card.code !== cardThrown.code;
        }),
      };

      return {
        ...state,
        cardsOnTable: [...state.cardsOnTable, action.payload],
        players: { ...state.players, [playerOnMove]: updatedPlayer },
        moveInProgress: true,
      };
    case FIND_ROUND_WINNER:
      const mappedCards = state.cardsOnTable
        .map((card: any) => {
          const points = CARD_VALUES[card.card.value];
          card.points = points;
          return card;
        })
        .sort((a, b) => b.points - a.points);

      console.log(mappedCards);

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

/**
 * Selects loading part of state
 * @param state
 */
export const getUserPlayerCards = createSelector(
  getGameState,
  gameState => gameState.players['player1'],
);

/**
 * Selects cardsOnTable part of state
 * @param state
 */
export const getCardsOnTable = createSelector(
  getGameState,
  gameState => gameState.cardsOnTable,
);

/**
 * Selects moveInProgress part of state
 * @param state
 */
export const getMoveInProgress = createSelector(
  getGameState,
  gameState => gameState.moveInProgress,
);
