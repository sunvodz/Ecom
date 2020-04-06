import React from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
  TotalOrders,
  TotalHours,
  Salary,
  DeliveryList
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const RiderDashboard = (props) => {
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
            lg={4}
            sm={4}
            xl={4}
            xs={12}
          >
            <TotalOrders/>
          </Grid>
          <Grid
            item
            lg={4}
            sm={4}
            xl={4}
            xs={12}
          >
            <TotalHours />
          </Grid>
          <Grid
            item
            lg={4}
            sm={4}
            xl={4}
            xs={12}
          >
            <Salary />
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <DeliveryList />
          </Grid>
        </Grid>

    </div>
  );
};

export default RiderDashboard;
