import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import NavigationInterface from '../components/Navigation';
import DeleteButton from '../components/settings/DeleteButton';

const Settings = ({ match }) => (
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
      <DeleteButton urlID={match.params.id} />
    </Box>
  </NavigationInterface>
);

Settings.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Settings;
