import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import { Link } from 'react-router-dom';

/* navigation items that are only visible once the user has
 * selected a board */
const BoardList = ({ boardID }) => (
  <List>
    <ListItem
      button
      component={Link}
      to={`/board/${boardID}`}
    >
      <ListItemIcon>
        <DeveloperBoardIcon />
      </ListItemIcon>
      <ListItemText primary="Board" />
    </ListItem>
    <ListItem
      button
      component={Link}
      to={`/board/${boardID}/s`}
    >
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItem>
  </List>
);

BoardList.propTypes = {
  boardID: PropTypes.string.isRequired,
};

export default BoardList;
