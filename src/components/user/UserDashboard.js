import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserNav from "./UserNav";
import { getShows } from "../../functions/user";



const UserDashboard = () => {  
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    setShowsToLocalStorage();
  }, []);


  const setShowsToLocalStorage = () => {
    getShows(user.token)
    .then((res) =>{
        //console.log(res.data);
        if (typeof window !== 'undefined') {
          localStorage.setItem('userShowList', JSON.stringify(res.data));          
        }
        //setLoading(false);
        //setShows(res.data);        
    })
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>

        <div className="col-md-10">
          <h4>Dashboard</h4>
          
          
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
