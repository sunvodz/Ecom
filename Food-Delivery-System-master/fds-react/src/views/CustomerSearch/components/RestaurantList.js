import React, { useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from '@material-ui/core';

import data from './data';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));


const FoodItem = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const [restaurants] = useState(data.restaurantList);

  /**
  const restaurants = props.data; (passed down from CustomerSearch)
  **/

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Restaurants"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{valign:'top'}}>Restaurant ID</TableCell>
                  <TableCell>Restaurant</TableCell>
                  <TableCell>Category</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {restaurants.map(restaurant => (
                  <TableRow
                    hover
                    key={restaurant.id}
                  >
                    <TableCell>{restaurant.oid}</TableCell>
                    <TableCell>{restaurant.restaurant.name}</TableCell>
                    <TableCell>{restaurant.category.map(item => <li key={item}>{item}</li>)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions} />
    </Card>
  );
};

FoodItem.propTypes = {
  className: PropTypes.string
};

export default FoodItem;
