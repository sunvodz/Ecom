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

  /**** Fetch the restaurant reviews from backend ****

  const url = 'api/v1/...';
  let reviews;

  fetch(url)
  .then((response) => response.json())
  .then((result) => {
    reviews = JSON.parse(result);
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
        title="Restaurant Reviews"
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
                        direction="desc"
                      >
                        Restaurant
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>

                  <TableCell sortDirection="asc">
                    <Tooltip
                      enterDelay={300}
                      title="Sort"
                    >
                      <TableSortLabel
                        direction="asc"
                      >
                        Review
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reviews.map(review => (
                  <TableRow
                    hover
                    key={review.id}
                  >
                    <TableCell>{ review.name }</TableCell>
                    <TableCell>
                      {review.feedbackList.map(feedback => (
                          <div style={{display:"flex", justifyContent:"space-between", width:"700px", borderBottom:"1px solid #ced3db" }} >
                            <div>{feedback.content}</div>
                            <div style={{}}>Rating: {feedback.rating}/5</div>
                            <div style={{}}>Posted On: {moment(feedback.date).format('DD/MM/YYYY')}</div>
                          </div>
                      ))}
                    </TableCell>
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
