import axios from 'axios';

export const SET_NUMBERS_OF_PLAYERS = '[PLAYERS] Set number of players';
export const FETCH_CARDS_START = '[CARDS] Fetch CARDS start';
export const FETCH_CARDS_SUCCESS = '[CARDS] Fetch CARDS success';
export const FETCH_CARDS_ERROR = '[CARDS] Fetch CARDS error';
export const THROW_CARD_COMPUTER = '[Cards] Throw card computer';
// player action
export const THROW_CARD_PLAYER = '[THROW CARD PLAYER] Throw card player';

/**
 * Returns an action for fetching CARDS
 */
export const fetchCardsStart = () => ({ type: FETCH_CARDS_START });

/**
 * Returns an action with CARDS data
 * @param {*} payload
 */
export const fetchCardsSuccess = (payload: any) => ({
  type: FETCH_CARDS_SUCCESS,
  payload,
});

/**
 * Returns an action with error when CARDS fetch fails
 * @param {Error} error
 */
export const fetchCardsError = (error: Error) => ({
  type: FETCH_CARDS_ERROR,
  error,
});

export interface SetNumberOfPlayersAction {
  type: typeof SET_NUMBERS_OF_PLAYERS;
  payload: number;
}

/**
 * Fetches CARDS and dispatches success and error actions
 */
export const fetchCards = (numberOfPlayers: number) => {
  return async (dispatch: any) => {
    console.log('uslo u fetch cards', dispatch);
    try {
      dispatch(fetchCardsStart());

      const deck = await axios.get(
        'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
      );

      const deckId = deck.data.deck_id;

      const cards = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numberOfPlayers *
          10}`,
      );

      dispatch(fetchCardsSuccess(cards));
    } catch (err) {
      dispatch(fetchCardsError(err));
    }
  };
};

/**
 * Action for setting number of players
 * @param payload
 */
export const setNumberOfPlayers = (payload: number) => ({
  type: SET_NUMBERS_OF_PLAYERS,
  payload,
});

export const throwCards = (userMove: any) => {
  console.log('uslo u thorw/cards', userMove);
  return (dispatch: any) => {
    console.log('uslo u dispath', dispatch);
    dispatch(throwCardPlayer(userMove));

    setTimeout(() => {
      dispatch(throwCardComputer('player2'));
    }, 500);
  };
};

export const throwCardComputer = (payload: string) => {
  return {
    type: THROW_CARD_COMPUTER,
    payload,
  };
};

/**
 * Action for throwing card
 * @param payload
 */
export const throwCardPlayer = (payload: { user: string; card: any }) => {
  return {
    type: THROW_CARD_PLAYER,
    payload,
  };
};
