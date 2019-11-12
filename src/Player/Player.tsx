import React from 'react';
import { connect } from 'react-redux';
import './Player.css';
import {
  getUserPlayerCards,
  getMoveInProgress,
  getNumberOfPlayers,
} from '../store/reducers/game.reducer';
import { throwCardPlayer, throwCards } from '../store/actions/game.actions';

interface Props {
  player?: any;
  throwCards?: any;
  moveInProgress?: boolean;
  numberOfPlayers?: number;
}

const Player: React.FC<Props> = ({
  player,
  throwCards,
  moveInProgress,
  numberOfPlayers,
}) => {
  return (
    <div>
      {player.cards.map((card: any) => (
        <img
          onClick={() => {
            console.log('clicke');
            // if (moveInProgress) {
            //   return;
            // }
            throwCards({ user: 'player1', card: card }, numberOfPlayers);
          }}
          className="card-image"
          key={card.code}
          src={card.image}
          alt={card.code}
        />
      ))}
    </div>
  );
};

export const mapStateToProps = (state: any) => ({
  player: getUserPlayerCards(state),
  moveInProgress: getMoveInProgress(state),
  numberOfPlayers: getNumberOfPlayers(state),
});

export const mapDispatchToProps = (dispatch: any) => ({
  throwCards: (cardThrownData: any, numberOfPlayers: number) =>
    dispatch(throwCards(cardThrownData, numberOfPlayers)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
