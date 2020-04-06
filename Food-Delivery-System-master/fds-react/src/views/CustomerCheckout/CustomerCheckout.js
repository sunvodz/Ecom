import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import data from './components/data';

import {
    FoodItem,
    Total
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const CustomerCheckout = () => {
	const classes = useStyles();
	const [value, setValue] = React.useState('cash');

	const handleChange = event => {
    setValue(event.target.value);
  };

  const handleCheckout = () => {
    let payByCash = true;

    if(value === "cash") {
      console.log(payByCash);
    } else {
      payByCash = false;
      console.log(payByCash);
    }

    /**** Upload the order to the backend ****
     **** (let backend to generate an orderID) ****

    const data = {payment: payByCash};
    const url = 'api/v1/...';

    fetch(url, {
      method: 'POST',
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


  // SQL: pass table data from here because need oid for checkout

  /**** Fetch the orderd food list from the backend

  let checkoutList;
  const url = 'api/v1/...';

  fetch(url)
  .then((response) => response.json())
  .then((result) => {
    checkoutList = JSON.parse(result);
  })
  .catch((error) => {
    console.log('Error: ', error);
  });

  ****/

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
        className="test"
      >
        <Grid
          item
          lg={12}
          md={12}
          xl={12}
          xs={12}
        >
          <FoodItem data={data.foodItem}/>
          {/*<FoodItem data={checkoutList.foodItem} />*/}
        </Grid>
        <Grid
          item
          lg={6}
          sm={6}
          xl={6}
          xs={12}
        >
          <Total />
          {/*<Total data={checkoutList.totalValue} />*/}
        </Grid>
        <Grid>
					<FormControl component="fieldset">
						<FormLabel component="legend">Payment Mode</FormLabel>
						<RadioGroup aria-label="paymentMode" value={value} onChange={handleChange}>
							<FormControlLabel value="cash" control={<Radio />} label="Cash" />
							<FormControlLabel value="creditCard" control={<Radio />} label="Credit Card" />
						</RadioGroup>
					</FormControl>
					<Button style={{marginTop:"75px"}} color="primary" variant="contained" onClick={handleCheckout}>Check Out</Button>
        </Grid>

      </Grid>
    </div>
  );
};

export default CustomerCheckout;
