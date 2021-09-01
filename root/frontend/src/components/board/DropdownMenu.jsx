import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
      color: (props) => props.focusColor,
    },
  },
  focusedButton: {
    backgroundColor: 'inherit',
    color: (props) => props.focusColor,
  },
  deleteMenuItem: {
    '&:hover': {
      backgroundColor: theme.palette.red,
      color: 'white',
    },
  },
}));

const DropdownMenu = ({ onClick, onClose, onDelete, ...props }) => {
  const [popupAnchor, setPopupAnchor] = useState(null);

  const classes = useStyles(props);

  const handleDelete = () => {
    setPopupAnchor(null);
    onDelete();
  };

  const handleClick = (event) => {
    setPopupAnchor(event.currentTarget);
    onClick();
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
        disableRipple
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={popupAnchor}
        open={Boolean(popupAnchor)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        elevation={4}
        MenuListProps={{ disablePadding: true }}
        keepMounted
      >
        <MenuItem
          className={classes.deleteMenuItem}
          onClick={handleDelete}
          disableRipple
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

DropdownMenu.propTypes = {
  focusColor: PropTypes.string,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
};

DropdownMenu.defaultProps = {
  focusColor: 'black',
  onClick: () => { },
  onClose: () => { },
};

export default DropdownMenu;
