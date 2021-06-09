import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Register from '../auth/Register';
import RegisterComplete from '../auth/RegisterComplete';
import Login from '../auth/Login';
import ForgotPassword from '../auth/ForgotPassword';

import SearchShows from '../show/SearchShows';

import AdminRoute from "./AdminRoute";
import AdminDashboard from "../admin/AdminDashboard";
import UpcomingShows from "../admin/UpcomingShows";
import TrendingShows from "../admin/TrendingShows";

import UserRoute from "./UserRoute";
//import UserDashboard from "../user/Dashboard";

import NotFound from '../layout/NotFound';
import { Fragment } from 'react';


const Routes = props => {
    return (
      <Fragment>
        {/* <Alert /> */}
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/complete-registration" component={RegisterComplete} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgot-password" component={ForgotPassword} />

          <Route exact path="/search-shows" component={SearchShows} />
          
          <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
          <AdminRoute exact path="/admin/upcoming-shows" component={UpcomingShows} />
          <AdminRoute exact path="/admin/trending-shows" component={TrendingShows} />

          {/* <UserRoute exact path="/user/dashboard" component={Dashboard} /> */}
          
          <Route component={NotFound} /> 
        </Switch>
      </Fragment>
    );
};
  
export default Routes;