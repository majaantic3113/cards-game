import React from 'react';
import { connect } from 'react-redux';
import './Player.css';
import {
  getUserPlayerCards,
  getMoveInProgress,
} from '../store/reducers/game.reducer';
import { throwCardPlayer, throwCards } from '../store/actions/game.actions';

interface Props {
  player?: any;
  throwCards?: any;
  moveInProgress?: boolean;
}

const Player: React.FC<Props> = ({ player, throwCards, moveInProgress }) => {
  return (
    <div>
      {player.cards.map((card: any) => (
        <img
          onClick={() => {
            console.log('clicke');
            // if (moveInProgress) {
            //   return;
            // }
            throwCards({ user: 'player1', card: card });
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
});

export const mapDispatchToProps = (dispatch: any) => ({
  throwCards: (cardThrownData: any) => dispatch(throwCards(cardThrownData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
