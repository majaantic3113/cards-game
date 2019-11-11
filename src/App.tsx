import React from 'react';
import { connect } from 'react-redux';

import {
  getNumberOfPlayers,
  getLoadingState,
} from './store/reducers/game.reducer';
import './App.css';
import GameIntro from './GameIntro/GameIntro';

interface Props {
  numberOfPlayers?: number;
  loading?: boolean;
}

export const App: React.FC<Props> = ({ numberOfPlayers, loading }) => (
  <div className="game">
    {numberOfPlayers ? loading ? 'loading' : 'llallala' : <GameIntro />}
  </div>
);

export const mapStateToProps = (state: any) => ({
  numberOfPlayers: getNumberOfPlayers(state),
  loading: getLoadingState(state),
});

export default connect(mapStateToProps)(App);
