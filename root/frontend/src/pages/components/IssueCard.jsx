/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {
  usePopupState,
  bindTrigger,
  bindPopover,
} from 'material-ui-popup-state/hooks';

const useStyles = makeStyles(() => ({
  card: {
    marginTop: '10px',
  },
  overlay: {
    padding: '14px',
    minHeight: '91vh',
    minWidth: '50vw',
  },
  overlayTitle: {
    // TODO: use semi-bold font weight instead of bold
    fontWeight: 'bold',
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
        anchorReference="anchorPosition"
        anchorPosition={{ top: 75, left: 1200 }}
        marginThreshold={0}
      >
        <div className={classes.overlay}>
          <Typography className={classes.overlayTitle}>
            {props.title}
          </Typography>
        </div>
      </Popover>
    </>
  );
};

IssueCard.propTypes = {
  title: PropTypes.string.isRequired,
};

export default IssueCard;
