import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { RestaurantReview, RiderReview } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const CustomerReview = () => {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <RestaurantReview />
      <RiderReview />
    </div>
  );
};

export default CustomerReview;