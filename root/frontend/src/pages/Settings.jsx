import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import NavigationInterface from '../components/Navigation';
import DeleteButton from '../components/settings/DeleteButton';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.grey[200],
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    height: '100vh',
    overflow: 'auto',
    padding: theme.spacing(2),
  },
  container: {
    paddingBlock: theme.spacing(3),
    display: 'flex',
    alignItems: 'flex-start',
  },
  newBoardButton: {
    width: theme.spacing(16),
    height: theme.spacing(10),
  },
}));

const Settings = ({ match }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavigationInterface
        title="Settings"
        boardID={match.params.id}
      />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Typography variant="subtitle1">
          <Box margin="5px">
            <Box fontWeight="fontWeightMedium">
              Delete Board
            </Box>
            <Box color="#303030">
              Warning: once a board is deleted, it cannot be brought back.
            </Box>
          </Box>
        </Typography>
        <DeleteButton />
      </main>
    </div>
  );
};

Settings.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Settings;
