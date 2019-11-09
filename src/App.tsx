import React from 'react';
import './App.css';
import GameIntro from './GameIntro/GameIntro';
import { connect } from 'react-redux';
import { getNumberOfPlayers } from './store/reducers/game.reducer';

interface Props {
  numberOfPlayers?: number;
}

const App: React.FC<Props> = ({ numberOfPlayers }) => {
  console.log(numberOfPlayers);
  return (
    <div className='game'>{numberOfPlayers ? 'llallala' : <GameIntro />}</div>
  );
};

export const mapStateToProps = (state: any) => ({
  numberOfPlayers: getNumberOfPlayers(state),
});

export default connect(mapStateToProps)(App);
