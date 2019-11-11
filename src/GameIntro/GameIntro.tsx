import React from 'react';
import './GameIntro.css';
import { connect } from 'react-redux';
import { setNumberOfPlayers, fetchCards } from '../store/actions/game.actions';

interface Props {
  setNumberOfPlayers?: (num: number) => void;
  fetchCards?: (num: number) => void;
}

export const GameIntro: React.FC<Props> = ({
  setNumberOfPlayers,
  fetchCards,
}) => {
  const POSSIBLE_NUMBERS: Array<number> = [2, 3, 4];
  return (
    <>
      <h1>Select number of players</h1>
      {POSSIBLE_NUMBERS.map(elem => (
        <button
          key={elem}
          className="button"
          onClick={() => {
            if (setNumberOfPlayers) {
              setNumberOfPlayers(elem);
            }
            if (fetchCards) {
              fetchCards(elem);
            }
          }}
        >
          {elem} players
        </button>
      ))}
    </>
  );
};

export const mapDispatchToProps = (dispatch: any) => ({
  setNumberOfPlayers: (numberOfPlayers: number) =>
    dispatch(setNumberOfPlayers(numberOfPlayers)),
  fetchCards: (num: number) => dispatch(fetchCards(num)),
});

export default connect(undefined, mapDispatchToProps)(GameIntro);
