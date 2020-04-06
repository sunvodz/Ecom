import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import FeedbackIcon from '@material-ui/icons/Feedback';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { Profile, SidebarNav } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Summary',
      href: '/staff_dashboard',
      icon: <DashboardIcon />
    },
    {
      title: 'Food Items',
      href: '/staff_items',
      icon: <FastfoodIcon />
    },
    {
      title: 'Promotion',
      href: '/staff_promo',
      icon: <LoyaltyIcon />
    },
    {
      title: 'Reviews',
      href: '/staff_review',
      icon: <FeedbackIcon />
    },
    {
      title: 'Logout',
      href: '/logout',
      icon: <ExitToAppIcon />
    },
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
