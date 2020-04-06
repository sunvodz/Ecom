import React, { useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EditPromo from './EditPromo';
import { makeStyles } from '@material-ui/styles';
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

const Cpromo = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [promos, setPromos] = useState(props.data);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState("");
  const [editIndex, setIndex] = useState(0);

  const handleClick = (id, order) => {
    setEditData(order)
    console.log("order: " + order)
    setIndex(id)
    console.log("index: " + id)
    setOpenEdit(true)
  }

  function handleEdit(id, discount, minAmt, startDate, endDate) {
    let promoData = [...promos];
    let promo = promoData[editIndex];

    promo.discount = discount;
    promo.minAmount = minAmt;
    promo.startDate = startDate;
    promo.endDate = endDate;
    promoData[editIndex] = promo;

    setPromos(promoData);
    setOpenEdit(!openEdit);

    let data = {
      id: id,
      discount: discount,
      minAmount: minAmt,
      startDate: startDate,
      endDate: endDate
    };

    /**** Update modified promotion data to the backend ****

    const url = 'api/v1/...';

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then(() => {
      console.log('Success!');
    })
    .catch((error) => {
      console.log('Error: ', error);
    });

    ****/
  }

  // QUERY: DELETE
  const handleDelete = (index, id) => {
    let promoData = [...promos];
    let promo = promoData[index];
    promoData.splice(index, 1); // remove the element
    setPromos(promoData);

    /**** Delete the promotion from the backend ****

    const url = 'api/v1/...' + '/' + id;

    fetch(url, {
      method: 'DELETE'
    })
    .then((response) => response.json())
    .catch((error) => {
      console.log('Error: ', error);
    });

    ****/
  }


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Current Promotion"
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
                  <TableCell>Minimum Amount</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {promos.map((promo, index) => (
                  <TableRow
                    hover
                    key={index}
                  >
                    <TableCell>{promo.promo_id}</TableCell>
                    <TableCell>{promo.discount}</TableCell>
                    <TableCell>{promo.minAmount}</TableCell>
                    <TableCell>{promo.startDate}</TableCell>
                    <TableCell>{promo.endDate}</TableCell>
                    <TableCell><EditIcon onClick={() => handleClick(index, promo)}/></TableCell>
                    <TableCell><DeleteIcon onClick={() => handleDelete(index, promo.promo_id)}/></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {openEdit && <EditPromo data={editData} onClick={handleEdit}/> }
        </PerfectScrollbar>
      </CardContent>
      <Divider />
    </Card>
  );
};

Cpromo.propTypes = {
  className: PropTypes.string
};

export default Cpromo;
