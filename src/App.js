import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingOutlined } from "@ant-design/icons";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";

// import Navbar from './components/layout/nav/Navbar';
// import Landing from './components/layout/Landing';
// import Routes from './components/routing/Routes';
// import Footer from './components/layout/Footer';

//using lazy
const Navbar = lazy(() => import('./components/layout/nav/Navbar'));
const Landing = lazy(() => import( './components/layout/Landing'));
const Routes = lazy(() => import('./components/routing/Routes'));
const Footer = lazy(() => import('./components/layout/Footer'));


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
    <Suspense
      fallback={
        <div className="col text-center p-5">
          __ JS
          <LoadingOutlined />
          eries __
        </div>
      }
    >
      <Navbar />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route component={Routes} />
      </Switch>
      <Footer />
    </Suspense>
  );
};

export default App;