import React, { useState } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Droppable } from 'react-beautiful-dnd';
import ButtonToTextField from './ButtonToTextField';
import IssueCard from './IssueCard';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    minWidth: '270px',
  },
  paper: {
    paddingInline: theme.spacing(2), // left and right
    paddingBlock: theme.spacing(1), // top and bottom
    backgroundColor: theme.palette.grey[50],
    borderRadius: 0,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  title: {
    fontWeight: 'bold',
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
    <Grid item className={classes.gridItem} xs={12} md={4} lg={3}>
      <Paper className={classes.paper} elevation={0}>
        <Typography className={classes.title} gutterBottom>
          {props.title}
        </Typography>
        <Droppable droppableId={props.id}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <List>
                {props.cards
                  .filter((card) => card.title.toLowerCase().includes(props.filter.toLowerCase()))
                  .map((card, index) => (
                    <IssueCard key={card.id} cardId={card.id} index={index} title={card.title} />
                  ))}
              </List>
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
      </Paper>
    </Grid>
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
};

export default Column;
