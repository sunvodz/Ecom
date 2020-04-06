import React, { useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EditDpromo from './EditDpromo';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

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

const Dpromo = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [orders] = useState(props.data);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState("");

  const handleClick = (orders) => {
    setEditData(orders)
    setOpenEdit(true)
  }

  const handleEdit = () => {
    setOpenEdit(!openEdit);
  }

  // QUERY: DELETE
  const handleDelete = (fid) => {
    console.log(fid)
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Delivery Promotion"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Promotion ID</TableCell>
                  <TableCell>Discount</TableCell>
                  <TableCell>Minimum Number of Orders</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map(order => (
                  <TableRow
                    hover
                    key={order.id}
                  >
                    <TableCell>{order.promo_id}</TableCell>
                    <TableCell>{order.discount}</TableCell>
                    <TableCell>{order.minOrders}</TableCell>
                    <TableCell>{order.startDate}</TableCell>
                    <TableCell>{order.endDate}</TableCell>
                    <TableCell><EditIcon onClick={() => handleClick(order)}/></TableCell>
                    <TableCell><DeleteIcon onClick={() => handleDelete(order.promo_id)}/></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {openEdit && <EditDpromo data={editData} onClick={handleEdit}/> }
        </PerfectScrollbar>
      </CardContent>
      <Divider />
    </Card>
  );
};

Dpromo.propTypes = {
  className: PropTypes.string
};

export default Dpromo;
