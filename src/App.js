import React, { Fragment, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from './components/layout/nav/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';
import Footer from './components/layout/Footer';

import { auth } from "./firebase";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user);
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
      }
    });
    // cleanup
    return () => unsubscribe();
  }, []);

  return (
    <Fragment>
      <Navbar />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route component={Routes} />
      </Switch>
      <Footer />
    </Fragment>
  );
};

export default App;
