import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Button } from '@material-ui/core';

import {
	AddNew,
	data,
  FoodItem,
  EditItem
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  formControl: {
    minWidth: 120,
  }
}));

const StaffFoodItem = () => {
  const classes = useStyles();
  const [openDiv, setOpenDiv] = useState(false);

  const handleOpenDiv = () => {
    setOpenDiv(!openDiv);
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
						Add New Item
					</Button>
          {openDiv && <AddNew onClick={handleOpenDiv}/> }
				</Grid>
        <Grid
          item
          lg={12}
          sm={12}
          xl={12}
          xs={12}
        >
          <FoodItem data={data}/>
        </Grid>
			</Grid>
    </div>
  );
};

export default StaffFoodItem;
