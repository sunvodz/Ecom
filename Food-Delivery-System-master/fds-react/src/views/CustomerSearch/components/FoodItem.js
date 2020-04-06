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
  const [items] = useState(data.foodItem);

  /**
  const items = props.data; (passed down from CustomerSearch)
  **/

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Food Items"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{valign:'top'}}>Restaurant</TableCell>
                  <TableCell>Food Item</TableCell>
                  <TableCell>Original Price</TableCell>
                  <TableCell>Discounted Price</TableCell>
                  <TableCell>Category</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map(item => (
                  <TableRow
                    hover
                    key={item.id}
                  >
                    <TableCell>{item.rname}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>{item.discounted}</TableCell>
                    <TableCell>{item.category.map(item => <li>{item}</li>)}</TableCell>
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
