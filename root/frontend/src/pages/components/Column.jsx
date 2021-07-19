import React, { useState } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import ButtonToTextField from './ButtonToTextField';
import IssueCard from './IssueCard';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    minWidth: '270px',
    width: '330px',
  },
  paper: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.grey[50],
    borderRadius: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  title: {
    fontWeight: 'bold',
    paddingLeft: theme.spacing(2),
  },
}));

const Column = (props) => {
  const [newCardRequested, setNewCardRequested] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const classes = useStyles();

  const handleNewCardCancel = () => {
    setNewCardRequested(false);
    setNewCardTitle('');
  };

  const handleNewCardSubmit = () => {
    // the new card requires a title
    if (newCardTitle !== '') {
      setNewCardRequested(false);
      props.addCard(props.id, { title: newCardTitle });
      setNewCardTitle('');
    }
  };

  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided) => (
        <Grid
          item
          className={classes.gridItem}
          xs={12}
          md={4}
          lg={3}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Paper className={classes.paper} elevation={0}>
            <Typography className={classes.title} {...provided.dragHandleProps} gutterBottom>
              {props.title}
            </Typography>
            <List>
              <Droppable droppableId={props.id} type="card">
                {/* eslint-disable-next-line no-shadow */}
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {props.cards
                      .filter((card) => (
                        card.title.toLowerCase().includes(props.filter.toLowerCase())
                      ))
                      .map((card, index) => (
                        <IssueCard
                          key={card.id}
                          cardId={card.id}
                          index={index}
                          title={card.title}
                        />
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <ButtonToTextField
                buttonPressed={newCardRequested}
                onButtonClick={() => setNewCardRequested(true)}
                onCancel={handleNewCardCancel}
                onTextFieldChange={(e) => setNewCardTitle(e.target.value)}
                onTextFieldSubmit={handleNewCardSubmit}
                textFieldLabel="Card title"
                textFieldValue={newCardTitle}
                title="Add Card"
              />
            </List>
          </Paper>
        </Grid>
      )}
    </Draggable>
  );
};

Column.propTypes = {
  title: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      // TODO: add id
    }),
  ).isRequired,
  addCard: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Column;
