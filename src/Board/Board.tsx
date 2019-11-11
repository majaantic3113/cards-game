import React from 'react';
import { connect } from 'react-redux';

import { getCardsOnTable } from '../store/reducers/game.reducer';

const Board = (props: any) => {
  console.log(props);
  return (
    <div>
      {props.cardsOnTable.map((card: any) => {
        return <img src={card.card.image} alt={card.card.code}></img>;
      })}
    </div>
  );
};

export const mapStateToProps = (state: any) => ({
  cardsOnTable: getCardsOnTable(state),
});

export default connect(mapStateToProps)(Board);
