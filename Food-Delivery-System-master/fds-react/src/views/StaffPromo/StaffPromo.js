import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Button } from '@material-ui/core';

import {
	AddPromo,
	CurrentPromo,
	data
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  formControl: {
    minWidth: 120,
  }
}));

const StaffPromo = () => {
  const classes = useStyles();
  const [openDiv, setOpenDiv] = useState(false);

  const handleOpenDiv = () => {
    setOpenDiv(!openDiv);
  }

	/**** Fetch promotion data from the backend ****

	const url = 'api/v1/...';
	let promoData;

	fetch(url)
	.then((response) => response.json())
	.then((result) => {
		promoData = JSON.parse(result);
	})
	.catch((error) => {
		console.log('Error: ', error);
	});

	****/

	/*
	const [promos, setPromo] = useState(promoData);
	*/

	function handleSubmit(disc, min, start, end) {
		let data = {
			discount: disc,
			minAmt: min,
			startDate: start,
			endDate: end
		};

		console.log("input: " + data);

		/****
		// Send data to the backend
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

		// Fetch the latest promo data from backend
		const url = 'api/v1/...';
		let promoData;

		fetch(url)
		.then((response) => response.json())
		.then((result) => {
			promoData = JSON.parse(result);
		})
		.catch((error) => {
			console.log('Error: ', error);
		});

		setPromo(promoData);

		****/
	}

  return (
    <div className={classes.root}>

      <Grid
        container
        item
        spacing={4}
      >
				<Grid
					item
					lg={2}
					sm={2}
					xl={2}
					xs={2}
				>
					<Button
						color="primary"
						size="small"
						variant="contained"
						onClick={handleOpenDiv}
						style={{width:"130px"}}
					>
						Add Promotion
					</Button>
          {openDiv && <AddPromo parentSubmit={handleSubmit} onClick={handleOpenDiv}/> }
				</Grid>
        <Grid
          item
          lg={12}
          sm={12}
          xl={12}
          xs={12}
        >
          <CurrentPromo data={data} />
					{/* <CurrentPromo data={promos} /> */}
        </Grid>
			</Grid>
    </div>
  );
};

export default StaffPromo;
