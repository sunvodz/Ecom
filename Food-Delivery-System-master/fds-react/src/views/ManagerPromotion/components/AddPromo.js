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

const AddPromo = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [selectedCategory, setSelectedCategory] = useState('customer');
  const [discount, setDiscount] = useState('');
  const [targetCustomer, setTargetCustomer] = useState('');
  const [minAmt, setMinAmt] = useState('');
  const [minOrders, setMinOrders] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSelectChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  const handleDiscount = (e) => {
    setDiscount(e.target.value)
  }
  const handleTargetCustomer = (e) => {
    setTargetCustomer(e.target.value)
  }
  const handleMinAmt = (e) => {
    setMinAmt(e.target.value)
  }
  const handleMinOrders = (e) => {
    setMinOrders(e.target.value)
  }
  const handleStartDate = (e) => {
    setStartDate(e.target.value)
  }
  const handleEndDate = (e) => {
    setEndDate(e.target.value)
  }

  // QUERY: INSERT data
  const handleEnterButton = () => {
    switch(selectedCategory) {
      case "customer":
        console.log(discount)
        console.log(targetCustomer)
        console.log(minAmt)
        console.log(startDate)
        console.log(endDate)
        break;
      case "delivery":
        console.log(discount)
        console.log(minOrders)
        console.log(startDate)
        console.log(endDate)
        break;
      default:
        console.log("error")
    
    }
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
			<FormControl style={{width: "200px"}}>
        <InputLabel id="demo-simple-select-label">Promotion Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedCategory}
          onChange={handleSelectChange}
        >
          <MenuItem value={"customer"}>Customer</MenuItem>
          <MenuItem value={"delivery"}>Delivery</MenuItem>
        </Select>
      </FormControl>
      
      <FormControl>
				<InputLabel htmlFor="my-input">Discount</InputLabel>
				<Input id="my-input" aria-describedby="my-helper-text" onChange={handleDiscount}/>
      </FormControl>
      
      { selectedCategory == "customer" &&
        <FormControl>
          <InputLabel htmlFor="my-input">Target Customer ID</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" onChange={handleTargetCustomer} />
        </FormControl>
      }

      { selectedCategory == "customer" &&
        <FormControl>
          <InputLabel htmlFor="my-input">Minimum Amount</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" onChange={handleMinAmt} />
        </FormControl>
      }
      { selectedCategory == "delivery" &&
        <FormControl>
          <InputLabel htmlFor="my-input">Minimum Orders</InputLabel>
				  <Input id="my-input" aria-describedby="my-helper-text" onChange={handleMinOrders} />
        </FormControl>
      }
      <FormControl>
        <TextField
          label="Start Date"
          type="datetime-local"
          defaultValue="2017-05-24T10:30"
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
          defaultValue="2017-05-24T10:30"
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

AddPromo.propTypes = {
  className: PropTypes.string
};

export default AddPromo;
