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
} from '@material-ui/core';

import mockData from './data';

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

const statusColors = {
  delivered: 'success',
  pending: 'info',
  refunded: 'danger'
};


const PastOrders = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const [orders] = useState(mockData);

  /**** Fetch the order list for the customer

  let orders;
  const url = 'api/v1/...';

  fetch(url)
  .then((response) => response.json())
  .then((result) => {
    orders = JSON.parse(result);
  })
  .catch((error) => {
    console.log('Error: ', error);
  });

  ****/

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={""}
        title="Past Orders"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order Ref</TableCell>
                  <TableCell>Restaurant</TableCell>
                  <TableCell>Food Item</TableCell>
                  <TableCell>Total Price</TableCell>
                  <TableCell>Payment Method</TableCell>
                  <TableCell>Order Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map(order => (
                  <TableRow
                    hover
                    key={order.id}
                  >
                    <TableCell>{order.ref}</TableCell>
                    <TableCell>{order.restaurant}</TableCell>
                    <TableCell>
                      <ol>
                        {order.food.map(item => {
                          return <li>{item}</li>
                        })}
                      </ol>
                    </TableCell>
                    <TableCell>{order.price}</TableCell>
                    <TableCell>{order.payment}</TableCell>
                    <TableCell>{order.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
      </CardActions>
    </Card>
  );
};

PastOrders.propTypes = {
  className: PropTypes.string
};

export default PastOrders;
