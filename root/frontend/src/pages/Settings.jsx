import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import NavigationInterface from '../components/Navigation';
import DeleteButton from '../components/settings/DeleteButton';
import boardService from '../services/boards';

const Settings = ({ match }) => {
  const deleteBoard = () => {
    boardService.deleteBoard(match.params.id);
  };

  return (
    <NavigationInterface
      title="Settings"
      urlID={match.params.id}
    >
      <Box marginLeft={2}>
        <Typography variant="subtitle1">
          <Box margin={1}>
            <Box fontWeight="fontWeightMedium">
              Delete Board
            </Box>
            <Box color="#303030">
              Warning: once a board is deleted, it cannot be brought back.
            </Box>
          </Box>
        </Typography>
        <DeleteButton onSubmit={deleteBoard} />
      </Box>
    </NavigationInterface>
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
