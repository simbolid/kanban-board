import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  button: {
    color: 'darkgray',
    '&:hover': {
      backgroundColor: 'inherit',
      color: theme.palette.grey[800],
    },
  },
  focusedButton: {
    backgroundColor: 'inherit',
    color: theme.palette.grey[800],
  },
  menuItem: {
    paddingBlock: '5px',
  },
  delete: {
    '&:hover': {
      backgroundColor: theme.palette.red,
      color: 'white',
    },
  },
}));

const DropdownMenu = ({ onClick, onClose, onRename, onDelete, open }) => {
  const [popupAnchor, setPopupAnchor] = useState(null);

  const classes = useStyles();

  const handleClick = (event) => {
    setPopupAnchor(event.currentTarget);
    onClick();
  };

  const handleRename = () => {
    setPopupAnchor(null);
    onRename();
  };

  const handleDelete = () => {
    setPopupAnchor(null);
    onDelete();
  };

  const handleClose = () => {
    setPopupAnchor(null);
    onClose();
  };

  return (
    <>
      <IconButton
        className={popupAnchor ? classes.focusedButton : classes.button}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={popupAnchor}
        open={Boolean(popupAnchor) && open}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        elevation={4}
        MenuListProps={{ disablePadding: true }}
        keepMounted
      >
        <MenuItem
          className={classes.menuItem}
          onClick={handleRename}
        >
          Rename
        </MenuItem>
        <Divider />
        <MenuItem
          className={`${classes.menuItem} ${classes.delete}`}
          onClick={handleDelete}
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

DropdownMenu.propTypes = {
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  onRename: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

DropdownMenu.defaultProps = {
  onClick: () => { },
  onClose: () => { },
  open: true,
};

export default DropdownMenu;
