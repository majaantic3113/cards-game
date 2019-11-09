export const SET_NUMBERS_OF_PLAYERS = 'Set number of players';

export interface SetNumberOfPlayersAction {
  type: typeof SET_NUMBERS_OF_PLAYERS;
  payload: number;
}

/**
 * Creates an action that sets state with number of players
 */
export const setNumberOfPlayers = (payload: number) => ({
  type: SET_NUMBERS_OF_PLAYERS,
  payload,
});
