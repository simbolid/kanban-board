import React from 'react';
import PropTypes from 'prop-types';
import IssueCard from './IssueCard';

/* React.memo prevents dragging a card over a column from
 * re-rendering the tasks in that column. */
const CardList = React.memo(({
  cards,
  filter,
  columnTitle,
  deleteCard,
  updateCard,
}) => (
  cards
    .filter((card) => (
      card.title.toLowerCase().includes(filter.toLowerCase())
    ))
    .map((card, index) => (
      <IssueCard
        key={card._id}
        card={card}
        index={index}
        columnTitle={columnTitle}
        updateCard={updateCard}
        deleteCard={deleteCard}
      />
    ))
));

CardList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  filter: PropTypes.string.isRequired,
  columnTitle: PropTypes.string.isRequired,
  deleteCard: PropTypes.func.isRequired,
  updateCard: PropTypes.func.isRequired,
};

export default CardList;
