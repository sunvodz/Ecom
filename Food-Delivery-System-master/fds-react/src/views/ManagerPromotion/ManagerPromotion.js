import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Button } from '@material-ui/core';

import {
	AddPromo,
	Cpromo,
	Dpromo,
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

const ManagerPromotion = () => {
  const classes = useStyles();
  const [openDiv, setOpenDiv] = useState(false);

  const handleOpenDiv = () => {
    setOpenDiv(!openDiv);
  }

  // QUERY DATA for Customer promo list and delivery promo list

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
					>
						Add Promotion
					</Button>
          {openDiv && <AddPromo onClick={handleOpenDiv}/> }
				</Grid>
        <Grid
          item
          lg={12}
          sm={12}
          xl={12}
          xs={12}
        >
          <Cpromo data={data.cpromo} />
        </Grid>
				<Grid
					item
					lg={12}
					sm={12}
					xl={12}
					xs={12}
				>
					<Dpromo data={data.dpromo} />
				</Grid>

			</Grid>
    </div>
  );
};

export default ManagerPromotion;
