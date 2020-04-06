import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
  TotalCustOrders,
  RewardPoints,
  PastOrders
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const CustomerDashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>

        <Grid
          container
          item
          spacing={4}
        >
          <Grid
            item
            lg={6}
            sm={6}
            xl={6}
            xs={12}
          >
            <TotalCustOrders />
          </Grid>
          <Grid
            item
            lg={6}
            sm={6}
            xl={6}
            xs={12}
          >
            <RewardPoints />
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <PastOrders />
          </Grid>
        </Grid>

    </div>
  );
};

export default CustomerDashboard;
