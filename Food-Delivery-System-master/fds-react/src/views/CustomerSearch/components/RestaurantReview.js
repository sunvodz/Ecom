import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
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
  TableSortLabel
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


const RestaurantReview = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const [reviews] = useState(data.restaurantReview);

  /**
  const reviews = props.data; (passed down from CustomerSearch)
  **/

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Reviews"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sortDirection="desc">
                    <Tooltip
                      enterDelay={300}
                      title="Sort"
                    >
                      <TableSortLabel
                        active
                        direction="desc"
                      >
                        Date
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>

                  <TableCell sortDirection="asc">
                    <Tooltip
                      enterDelay={300}
                      title="Sort"
                    >
                      <TableSortLabel
                        active
                        direction="asc"
                      >
                        Rating
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>Review</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reviews.map(review => (
                  <TableRow
                    hover
                    key={review.id}
                  >
                    <TableCell>
                      {moment(review.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>{review.rating}</TableCell>
                    <TableCell>{review.content}</TableCell>
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

RestaurantReview.propTypes = {
  className: PropTypes.string
};

export default RestaurantReview;
