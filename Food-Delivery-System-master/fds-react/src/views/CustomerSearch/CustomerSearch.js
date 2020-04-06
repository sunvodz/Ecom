import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { FoodItem, RestaurantFoodItem, RestaurantReview } from './components';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { SearchInput } from 'components';
import SelectCategory from './components/SelectCategory';
import { Button } from '@material-ui/core';
import RestaurantList from './components/RestaurantList';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const CustomerSearch = () => {
  const classes = useStyles();

  const [search, setSearch] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [showRestaurantList, setShowRestaurantList] = useState(false);
  const [showRestaurantFoodItem, setShowRestaurantFoodItem] = useState(false);
  const [showFoodItemList, setShowFoodItemList] = useState(false);

  const handleToggle = (event, value) => {
    if(value != null) setSearch(value);
  };

  let restaurantFood;
  let restaurantReview;
  let foodInCategory;
  let restaurantInCategory;

  const handleEnter = () => {
    // SQL: Pass search value to retrive restaurant food item & reviews

    /**** Upload the searched name to the backend for food items ****

    let restaurantName = searchValue;
    const url = 'api/v1/...' + restaurantName;

    fetch(url)
    .then((response) => response.json())
    .then((result) => {
      restaurantFood = JSON.parse(result);
    })
    .catch((error) => {
      console.log('Error: ', error);
    });

    ****/

    /**** Upload the searched name to the backend for reviews ****

    let restaurantName = searchValue;
    const url = 'api/v1/...' + restaurantName;

    fetch(url)
    .then((response) => response.json())
    .then((result) => {
      restaurantReview = JSON.parse(result);
    })
    .catch((error) => {
      console.log('Error: ', error);
    });

    ****/
    console.log(searchValue)
    setShowRestaurantFoodItem(true);
    setShowRestaurantList(false);
    setShowFoodItemList(false);
  }


  const handleListFood = () => {
    // SQL: Pass selected value to retrive all food item of category

    /**** Upload the selected category to the backend ****

    let category = selectedCategory;
    const url = 'api/v1/...' + category;

    fetch(url)
    .then((response) => response.json())
    .then((result) => {
      foodInCategory = JSON.parse(result);
    })
    .catch((error) => {
      console.log('Error: ', error);
    });

    ****/
    console.log(selectedCategory)
    setShowRestaurantFoodItem(false);
    setShowRestaurantList(false);
    setShowFoodItemList(true);
  }

  const handleListRestaurant = () => {
    // SQL: Pass selected value to retrive all restaurant of category

    /**** Upload the selected category to the backend ****

    let category = selectedCategory;
    const url = 'api/v1/...' + category;

    fetch(url)
    .then((response) => response.json())
    .then((result) => {
      restaurantInCategory = JSON.parse(result);
    })
    .catch((error) => {
      console.log('Error: ', error);
    });

    ****/
    console.log(selectedCategory)
    setShowRestaurantFoodItem(false);
    setShowRestaurantList(true);
    setShowFoodItemList(false);
  }

  const handleSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const handleSelectCategory = (event) => {
    setSelectedCategory(event.target.value);
  }

  const menuItems=[
    {value:'Halal', name:'Halal'},
    {value:'Seafood', name:'Seafood'},
    {value:'Meat', name:'Meat'}
  ];

  return (
    <div className={classes.root}>
      <ToggleButtonGroup
        value={search}
        exclusive
        onChange={handleToggle}
        aria-label="toggle"
      >
        <ToggleButton value={true} aria-label="Search">
          Search Restaurant
        </ToggleButton>
        <ToggleButton value={false} aria-label="Select">
          Select Category
        </ToggleButton>
      </ToggleButtonGroup>

      <div className={classes.row} style={{marginBottom:"16px"}}>
        { search ?
          <SearchInput
            className={classes.searchInput}
            placeholder="Search Item"
            onChange={handleSearchInput}
          /> :
          <SelectCategory
            value={selectedCategory}
            items={menuItems}
            onChange={handleSelectCategory}
          />
        }
        {search ? <Button variant="contained" color="primary" onClick={handleEnter}>Enter</Button> : "" }
        {search ? "" : <Button style={{marginRight:"5px"}} variant="outlined" color="primary" onClick={handleListFood}>Food</Button> }
        {search ? "" : <Button variant="outlined" color="primary" onClick={handleListRestaurant}>Restaurant</Button> }
      </div>
      {showRestaurantList ? <RestaurantList /> : ""}
      {/*showRestaurantList ? <RestaurantList data={restaurantInCategory}/> : ""*/}
      {showFoodItemList ? <FoodItem /> : ""}
      {/*showFoodItemList ? <FoodItem data={foodInCategory}/> : ""*/}
      {showRestaurantFoodItem ? <RestaurantFoodItem restaurantname={searchValue} /> : ""}
      {/*showRestaurantFoodItem ? <RestaurantFoodItem restaurantname={searchValue}, data={restaurantFood} /> : ""*/}
      {showRestaurantFoodItem ? <RestaurantReview /> : ""}
      {/*showRestaurantFoodItem ? <RestaurantReview data={restaurantReview}/> : ""*/}
    </div>
  );
};

export default CustomerSearch;
