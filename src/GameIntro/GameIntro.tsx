import React from 'react';
import './GameIntro.css';
import { connect } from 'react-redux';
import { setNumberOfPlayers } from '../store/actions/game.actions';

interface Props {
  setNumberOfPlayers?: (num: number) => void;
}

export const GameIntro: React.FC<Props> = ({ setNumberOfPlayers }) => {
  const POSSIBLE_NUMBERS: Array<number> = [2, 3, 4];
  return (
    <>
      <h1>Select number of players</h1>
      {POSSIBLE_NUMBERS.map((elem, index) => (
        <button
          key={index}
          className='button'
          onClick={() => setNumberOfPlayers && setNumberOfPlayers(elem)}
        >
          {elem} players
        </button>
      ))}
    </>
  );
};

export const mapDispatchToProps = (dispatch: any) => {
  return {
    setNumberOfPlayers: (numberOfPlayers: number) =>
      dispatch(setNumberOfPlayers(numberOfPlayers)),
  };
};

export default connect(
  undefined,
  mapDispatchToProps,
)(GameIntro);
