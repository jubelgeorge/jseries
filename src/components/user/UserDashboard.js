import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import UserNav from "./UserNav";
import Spinner from '../layout/Spinner';

import { Radio } from 'antd';

import { getShows, getLoggedInUser, updateLoggedInUserProfile } from "../../functions/user";



const UserDashboard = () => {  
  const [profileStatus, setProfileStatus] = useState("public");
  const [shows, setShows] = useState([]);
  const [alreadyWatchedShows, setAlreadyWatchedShows] = useState([]);
  const [currentlyWatchingShows, setCurrentlyWatchingShows] = useState([]);
  const [notYetWatchedShows, setNotYetWatchedShows] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    setShowsToLocalStorage();
    loadUser();    
  }, []);


  const setShowsToLocalStorage = async () => {
    try {
      setLoading(true);
      //getShows(user.token)
      // .then((res) =>{
      //     if (typeof window !== 'undefined') {
      //       localStorage.setItem('userShowList', JSON.stringify(res.data));          
      //     }
      //     //setLoading(false);
      //     setShows(res.data); 
          
          
      //     const alreadyWatchedShows1 = res.data.filter(s => {
      //       return s.watchStatus === 'Already Watched'
      //     });
      //     setAlreadyWatchedShows(alreadyWatchedShows1);
      
      //     const currentlyWatchingShows1 = res.data.filter(s => {
      //       return s.watchStatus === 'Currently Watching'
      //     });
      //     setCurrentlyWatchingShows(currentlyWatchingShows1);
      
      //     const notYetWatchedShows1 = res.data.filter(s => {
      //       return s.watchStatus === 'Not Yet Watched'
      //     });
      //     setNotYetWatchedShows(notYetWatchedShows1);    
      // })

      const response = await getShows(user.token);
      if (typeof window !== 'undefined') {
        localStorage.setItem('userShowList', JSON.stringify(response.data));          
      }
      setShows(response.data);            
            
      const alreadyWatchedShows1 = response.data.filter(s => {
        return s.watchStatus === 'Already Watched'
      });
      setAlreadyWatchedShows(alreadyWatchedShows1);
        
      const currentlyWatchingShows1 = response.data.filter(s => {
        return s.watchStatus === 'Currently Watching'
      });
      setCurrentlyWatchingShows(currentlyWatchingShows1);
  
      const notYetWatchedShows1 = response.data.filter(s => {
        return s.watchStatus === 'Not Yet Watched'
      });
      setNotYetWatchedShows(notYetWatchedShows1);  

      setLoading(false);  
  
    } catch (err) {
      console.log(err);
    } 
  }

  const loadUser = async () => {
    try {
      setLoading(true);
      // getLoggedInUser(user.token)
      //   .then((res) => {
      //     setProfileStatus(res.data.profileStatus);
      // });

      const response = await getLoggedInUser(user.token);
      setProfileStatus(response.data.profileStatus);
      setLoading(false);  
  
    } catch (err) {
        console.log(err);
    } 
  }

  const onRadioButtonChange = async (e) => {
    try {
      setLoading(true);
      const userProfileStatus = e.target.value;
      setProfileStatus(userProfileStatus);
      // updateLoggedInUserProfile(userProfileStatus, user.token)
      //   .then((res) => {
      //     loadUser();
      //   })

      const response = await updateLoggedInUserProfile(userProfileStatus, user.token);
      loadUser();
      setLoading(false);  
  
    } catch (err) {
        console.log(err);
    } 
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>

        <div className="col-md-10">
          <h4>Dashboard</h4>
          <hr />
          {loading ? (
            <Spinner />
          ) : (
            <>
              <h5>Do you want to make your showlist Public or Private?</h5>
              <Radio.Group onChange={onRadioButtonChange} value={profileStatus}>
                <Radio value="public">Public</Radio>
                <Radio value="private">Private</Radio>
              </Radio.Group>
              <hr />
              <h5>Statistics</h5>
              <p>Total Shows: <b>{shows.length}</b></p>
              <p>Already Watched: <b>{alreadyWatchedShows.length}</b></p>
              <p>Currently Watching: <b>{currentlyWatchingShows.length}</b></p>
              <p>Not Yet Watched: <b>{notYetWatchedShows.length}</b></p>
            </>
          )}          

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;