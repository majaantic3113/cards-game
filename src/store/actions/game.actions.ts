export const SET_NUMBERS_OF_PLAYERS = 'Set number of players';

export interface SetNumberOfPlayersAction {
  type: typeof SET_NUMBERS_OF_PLAYERS;
  payload: number;
}

/**
 * Action for setting number of players
 * @param payload
 */
export const setNumberOfPlayers = (payload: number) => ({
  type: SET_NUMBERS_OF_PLAYERS,
  payload,
});
