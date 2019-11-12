import React from 'react';
import { connect } from 'react-redux';

import {
  getNumberOfPlayers,
  getLoadingState,
} from './store/reducers/game.reducer';
import './App.css';
import GameIntro from './GameIntro/GameIntro';
import Player from './Player/Player';
import Board from './Board/Board';

interface Props {
  numberOfPlayers?: number;
  loading?: boolean;
  state: any;
}

export const App: React.FC<Props> = ({ numberOfPlayers, loading, state }) => {
  return (
    <div className="game">
      {numberOfPlayers ? (
        loading ? (
          'loading'
        ) : (
          <>
            <Board />
            <Player />
          </>
        )
      ) : (
        <GameIntro />
      )}
    </div>
  );
};

export const mapStateToProps = (state: any) => ({
  numberOfPlayers: getNumberOfPlayers(state),
  loading: getLoadingState(state),
  state: state,
});

export default connect(mapStateToProps)(App);
