import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import { grey } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  icon: {
    marginLeft: '10px',
    minWidth: '30px',
  },
  text: {
    marginLeft: '20px',
  },
  listItem: {
    '&:hover': {
      backgroundColor: '#1f4437',
    },
  },
});

/* navigation items that are only visible once the user has
 * selected a board */
const DrawerList = ({ urlID }) => {
  const classes = useStyles();

  return (
    <Box color={grey[300]}>
      <List>
        <ListItem
          className={classes.listItem}
          button
          component={Link}
          to="/"
        >
          <ListItemIcon className={classes.icon}>
            <HomeIcon style={{ color: grey[500] }} />
          </ListItemIcon>
          <ListItemText className={classes.text} primary="Home" />
        </ListItem>
        <ListItem
          className={classes.listItem}
          button
          component={Link}
          to="/dashboard"
        >
          <ListItemIcon className={classes.icon}>
            <DashboardIcon style={{ color: grey[500] }} />
          </ListItemIcon>
          <ListItemText className={classes.text} primary="Dashboard" />
        </ListItem>
        { urlID ? (
          <>
            <ListItem
              className={classes.listItem}
              button
              component={Link}
              to={`/b/${urlID}`}
            >
              <ListItemIcon className={classes.icon}>
                <DeveloperBoardIcon style={{ color: grey[500] }} />
              </ListItemIcon>
              <ListItemText className={classes.text} primary="Board" />
            </ListItem>
            <ListItem
              className={classes.listItem}
              button
              component={Link}
              to={`/b/${urlID}/s`}
            >
              <ListItemIcon className={classes.icon}>
                <SettingsIcon style={{ color: grey[500] }} />
              </ListItemIcon>
              <ListItemText className={classes.text} primary="Settings" />
            </ListItem>
          </>
        ) : null }
      </List>
    </Box>
  );
};

DrawerList.propTypes = {
  urlID: PropTypes.string,
};

DrawerList.defaultProps = {
  urlID: undefined,
};

export default DrawerList;
