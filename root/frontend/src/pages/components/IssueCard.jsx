/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import {
  usePopupState,
  bindTrigger,
  bindPopover,
} from 'material-ui-popup-state/hooks';

const useStyles = makeStyles(() => ({
  card: {
    marginTop: '10px',
  },
}));

const IssueCard = (props) => {
  const classes = useStyles();

  const popupState = usePopupState({
    variant: 'popover',
  });

  return (
    <>
      <Card className={classes.card} {...bindTrigger(popupState)}>
        <CardActionArea>
          <CardContent>
            <Typography>
              {props.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography>
          {props.title}
        </Typography>
      </Popover>
    </>
  );
};

IssueCard.propTypes = {
  title: PropTypes.string.isRequired,
};

export default IssueCard;
