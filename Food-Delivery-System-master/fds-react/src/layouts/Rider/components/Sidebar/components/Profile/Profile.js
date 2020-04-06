import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 100,
    height: 100
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  /**** Fetch the profile for the current user

  const url = 'api/v1/...';
  let profile;

  fetch(url)
  .then((response) => response.json())
  .then((result) => {
    profile = JSON.parse(result);
  })
  .catch((error) => {
    // cannot fetch the profile data
    console.log('Error: ', error);
  });

  ****/

  const user = {
    // name: profile.username;
    // bio: profile.usertype;
    name: 'Shen Zhi',
    avatar: '/images/avatars/Avatar.png',
    bio: 'Delivery Rider'
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to="/rider_dashboard"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        {user.name}
      </Typography>
      <Typography variant="body2">{user.bio}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
