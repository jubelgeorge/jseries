import React, { Fragment, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

// import Register from '../auth/Register';
// import RegisterComplete from '../auth/RegisterComplete';
// import Login from '../auth/Login';
// import ForgotPassword from '../auth/ForgotPassword';

// import SearchShows from '../show/SearchShows';
// import Show from '../show/Show';

// import AdminRoute from "./AdminRoute";
// import AdminDashboard from "../admin/AdminDashboard";
// import UpcomingShows from "../admin/UpcomingShows";
// import TrendingShows from "../admin/TrendingShows";

// import UserRoute from "./UserRoute";
// import UserDashboard from "../user/UserDashboard";
// import UserShowList from "../user/UserShowList";
// import UserWatchStatusUpdate from "../user/UserWatchStatusUpdate";
// import UserTableShows from "../user/UserTableShows";


// import NotFound from '../layout/NotFound';

//lazy
const Register = lazy(() => import('../auth/Register'));
const RegisterComplete = lazy(() => import('../auth/RegisterComplete'));
const Login = lazy(() => import('../auth/Login'));
const ForgotPassword = lazy(() => import('../auth/ForgotPassword'));

const SearchShows = lazy(() => import('../show/SearchShows'));
const Show = lazy(() => import('../show/Show'));

const AdminRoute = lazy(() => import("./AdminRoute"));
const AdminDashboard = lazy(() => import("../admin/AdminDashboard"));
const UpcomingShows = lazy(() => import("../admin/UpcomingShows"));
const TrendingShows = lazy(() => import("../admin/TrendingShows"));
const UsersListAdmin = lazy(() => import("../admin/UsersListAdmin"));
const SingleUserShowList = lazy(() => import("../admin/SingleUserShowList"));
const PasswordChangeAdmin = lazy(() => import("../admin/PasswordChangeAdmin"));

const UserRoute = lazy(() => import("./UserRoute"));
const UserDashboard = lazy(() => import("../user/UserDashboard"));
const UserShowList = lazy(() => import("../user/UserShowList"));
const UserWatchStatusUpdate = lazy(() => import("../user/UserWatchStatusUpdate"));
const UserTableShows = lazy(() => import("../user/UserTableShows"));
const UsersList = lazy(() => import("../user/UsersList"));
const SingleUserShowsList = lazy(() => import("../user/SingleUserShowsList"));
const PasswordChange = lazy(() => import("../user/PasswordChange"));


const NotFound = lazy(() => import('../layout/NotFound'));


const Routes = props => {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/complete-registration" component={RegisterComplete} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgot-password" component={ForgotPassword} />

          <Route exact path="/search-shows" component={SearchShows} />
          <Route exact path="/show/:imdb" component={Show} />

          <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
          <AdminRoute exact path="/admin/upcoming-shows" component={UpcomingShows} />
          <AdminRoute exact path="/admin/trending-shows" component={TrendingShows} />
          <AdminRoute exact path="/admin/users" component={UsersListAdmin} />
          <AdminRoute exact path="/admin/user/:id" component={SingleUserShowList} />
          <AdminRoute exact path="/admin/password" component={PasswordChangeAdmin} />

          <UserRoute exact path="/dashboard" component={UserDashboard} /> 
          <UserRoute exact path="/shows" component={UserShowList} /> 
          <UserRoute exact path="/show/edit-watch-status/:id" component={UserWatchStatusUpdate} />
          <UserRoute exact path="/shows/table" component={UserTableShows} />
          <UserRoute exact path="/users" component={UsersList} />
          <UserRoute exact path="/user/:id" component={SingleUserShowsList} />
          <UserRoute exact path="/password" component={PasswordChange} />
          
          <Route component={NotFound} /> 
        </Switch>
      </Fragment>
    );
};
  
export default Routes;