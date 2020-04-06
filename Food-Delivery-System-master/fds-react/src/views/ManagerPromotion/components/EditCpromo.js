import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { FormControl, InputLabel, Input, MenuItem, Select, TextField, Button } from '@material-ui/core';

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

const EditCpromo = props => {
  const { className, data, ...rest } = props;

  const classes = useStyles();
  const [discount, setDiscount] = useState(data.discount);
  const [targetCustomer, setTargetCustomer] = useState(data.cid);
  const [minAmt, setMinAmt] = useState(data.minAmount);
  const [startDate, setStartDate] = useState(data.startDate);
  const [endDate, setEndDate] = useState(data.endDate);

  const handleDiscount = (e) => {
    setDiscount(e.target.value)
  }
  const handleTargetCustomer = (e) => {
    setTargetCustomer(e.target.value)
  }
  const handleMinAmt = (e) => {
    setMinAmt(e.target.value)
  }
  const handleStartDate = (e) => {
    setStartDate(e.target.value)
  }
  const handleEndDate = (e) => {
    setEndDate(e.target.value)
	}
	
	// QUERY: INSERT
  const handleEnterButton = () => {
		console.log(discount)
		console.log(targetCustomer)
		console.log(minAmt)
		console.log(startDate)
		console.log(endDate)
		console.log(data.promo_id)
    props.onClick();

  }

  return (
    <div 
      style={{
        borderStyle: "solid",
        border: "1px solid black",
        backgroundColor: "white",
        zIndex: "1",
        position: "fixed",
        left: "40%",
        top: "30%",
        padding: "46px",
        width: "300px"
      }}
    >
			<div style={{marginBottom:"5px"}}>Edit Customer Promotion: {props.data.promo_id}</div>

      <FormControl>
				<InputLabel htmlFor="my-input">Discount</InputLabel>
				<Input id="my-input" aria-describedby="my-helper-text" onChange={handleDiscount} defaultValue={discount}/>
      </FormControl>
      
			<FormControl>
				<InputLabel htmlFor="my-input">Target Customer ID</InputLabel>
				<Input id="my-input" aria-describedby="my-helper-text" onChange={handleTargetCustomer} defaultValue={targetCustomer}/>
			</FormControl>

			<FormControl>
				<InputLabel htmlFor="my-input">Minimum Amount</InputLabel>
				<Input id="my-input" aria-describedby="my-helper-text" onChange={handleMinAmt} defaultValue={minAmt}/>
			</FormControl>
      <FormControl>
        <TextField
          label="Start Date"
          type="datetime-local"
          defaultValue={startDate}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleStartDate}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="End Date"
          type="datetime-local"
          defaultValue={endDate}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleEndDate}
        />
			</FormControl>
      <Button
        color="primary"
        size="small"
        variant="contained"
        onClick={handleEnterButton}
      >
        Enter
      </Button>
    </div>
  );
};

EditCpromo.propTypes = {
  className: PropTypes.string
};

export default EditCpromo;
