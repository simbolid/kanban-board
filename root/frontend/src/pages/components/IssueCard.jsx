import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  card: {
    marginTop: '10px',
  },
}));

const IssueCard = (props) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography>
            {props.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

IssueCard.propTypes = {
  title: PropTypes.string.isRequired,
};

export default IssueCard;
