import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  button: {
    color: 'darkgray',
    '&:hover': {
      backgroundColor: 'inherit',
      color: 'black',
    },
  },
  focusedButton: {
    backgroundColor: 'inherit',
    color: 'black',
  },
  deleteMenuItem: {
    '&:hover': {
      backgroundColor: '#e62020',
      color: 'white',
    },
  },
});

const DropdownMenu = ({ onDelete }) => {
  const [popupAnchor, setPopupAnchor] = useState(null);

  const classes = useStyles();

  const handleDelete = () => {
    setPopupAnchor(null);
    onDelete();
  };

  return (
    <>
      <IconButton
        className={popupAnchor ? classes.focusedButton : classes.button}
        aria-haspopup="true"
        onClick={(event) => setPopupAnchor(event.currentTarget)}
        disableRipple
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={popupAnchor}
        open={Boolean(popupAnchor)}
        onClose={() => setPopupAnchor(null)}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        elevation={4}
        MenuListProps={{ disablePadding: true }}
        keepMounted
      >
        <MenuItem
          className={classes.deleteMenuItem}
          onClick={handleDelete}
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

DropdownMenu.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default DropdownMenu;
