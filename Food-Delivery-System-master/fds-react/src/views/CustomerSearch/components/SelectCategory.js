import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SelectCategory = props => {
  const classes = useStyles();

  return (
    <div>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={props.value}
          onChange={props.onChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            props.items.map(item => {
              return <MenuItem value={item.value} key={item.value}>{item.name}</MenuItem>
            })
          }
        </Select>
      </FormControl>
    </div>
  );
}

SelectCategory.propTypes = {
    className: PropTypes.string
  };
  
export default SelectCategory;