import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import { RouteWithLayout } from './components';
import {
  Main as MainLayout,
  Minimal as MinimalLayout,
  Customer as CustomerLayout,
  Manager as ManagerLayout,
  Rider as RiderLayout,
  Staff as StaffLayout } from './layouts';

import {
  Login as LoginView,
  CustomerDashboard as CustomerDashboardView,
  CustomerCheckout as CustomerCheckoutView,
  CustomerSearch as CustomerSearchView,
  CustomerReview as CustomerReviewView,
  CustomerSettings as CustomerSettingsView,
  Dashboard as DashboardView,
  RiderDashboard as RiderDashboardView,
  RiderSchedule as RiderScheduleView,
  RiderReview as RiderReviewView,
  ManagerDashboard as ManagerDashboardView,
  ManagerPromotion as ManagerPromotionView,
  StaffDashboard as StaffDashboardView,
  StaffFoodItem as StaffFoodItemView,
  StaffPromo as StaffPromoView,
  StaffReview as StaffReviewView,
  ProductList as ProductListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  NotFound as NotFoundView
} from './views';

const Routes = () => {
  return (
    <Switch>
      {/* <Redirect
        exact
        from="/"
        to="/dashboard"
      /> */}
      <Route
        exact
        path='/'
        component={LoginView}
      />
      <Redirect
        exact
        from='/logout'
        to='/'
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/signup"
      />
      <RouteWithLayout
        component={ManagerDashboardView}
        exact
        layout={ManagerLayout}
        path="/manager_dashboard"
      />
      <RouteWithLayout
        component={ManagerPromotionView}
        exact
        layout={ManagerLayout}
        path="/manager_promo"
      />
      <RouteWithLayout
        component={StaffDashboardView}
        exact
        layout={StaffLayout}
        path="/staff_dashboard"
      />
      <RouteWithLayout
        component={StaffFoodItemView}
        exact
        layout={StaffLayout}
        path="/staff_items"
      />
      <RouteWithLayout
        component={StaffPromoView}
        exact
        layout={StaffLayout}
        path="/staff_promo"
      />
      <RouteWithLayout
        component={StaffReviewView}
        exact
        layout={StaffLayout}
        path="/staff_review"
      />
      <RouteWithLayout
        component={RiderDashboardView}
        exact
        layout={RiderLayout}
        path="/rider_dashboard"
      />
      <RouteWithLayout
        component={RiderScheduleView}
        exact
        layout={RiderLayout}
        path="/rider_schedule"
      />
      <RouteWithLayout
        component={RiderReviewView}
        exact
        layout={RiderLayout}
        path="/rider_review"
      />
      <RouteWithLayout
        component={CustomerDashboardView}
        exact
        layout={CustomerLayout}
        path="/customer_dashboard"
      />
      <RouteWithLayout
        component={CustomerCheckoutView}
        exact
        layout={CustomerLayout}
        path="/customer_checkout"
      />
      <RouteWithLayout
        component={CustomerSearchView}
        exact
        layout={CustomerLayout}
        path="/customer_search"
      />
      <RouteWithLayout
        component={CustomerSettingsView}
        exact
        layout={CustomerLayout}
        path="/customer_settings"
      />
      <RouteWithLayout
        component={CustomerReviewView}
        exact
        layout={CustomerLayout}
        path="/customer_review"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/products"
      />
      <RouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <RouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
