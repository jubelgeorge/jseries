import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserNav from "./UserNav";
import Spinner from '../layout/Spinner';

import { Radio, Space } from 'antd';

import { getShow, updateShow, getShows } from "../../functions/user";



const UserWatchStatusUpdate = ({ match }) => {  
    const [show, setShow] = useState([]);
    const [watchStatus, setWatchStatus] = useState("Already Watched");
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    const { id } = match.params;

    useEffect(() => {
        loadShow(id)
    }, []);


    const loadShow = async (id) => {
      try {
        setLoading(true);
        // getShow(id, user.token)
        //   .then((res) => {
        //     //console.log("RES",res.data);
        //     setLoading(false);
        //     setShow(res.data);
        //     setWatchStatus(res.data.watchStatus);
        // });

        const response = await getShow(id, user.token);
        setShow(response.data);
        setWatchStatus(response.data.watchStatus);
        setLoading(false);  
    
      } catch (err) {
          console.log(err);
      }  
    }

    const onRadioButtonChange = async (e) => {
      try {
        setLoading(true);
        const showWatchStatus = e.target.value;
        const showId = show._id;
        setWatchStatus(showWatchStatus);
        // updateShow(showWatchStatus, showId, user.token)
        //   .then((res) => {
        //     //console.log(res);
        //     loadShow();
        //     getShows(user.token)
        //       .then((res1) =>{
            
        //         if (typeof window !== "undefined") {
        //           // if show is in local storage GET it
        //           if (typeof window !== 'undefined') {
        //             localStorage.removeItem('userShowList');
        //           }
        //           // save to local storage
        //           localStorage.setItem('userShowList', JSON.stringify(res1.data));
          
        //           // add to redux state
        //           dispatch({
        //             type: "ADD_TO_LIST",
        //             payload: res1.data
        //           });
        //         }
        //     })
        // })

        const response1 = await updateShow(showWatchStatus, showId, user.token);
        loadShow();
        const response2 = await getShows(user.token);
        if (typeof window !== "undefined") {
          // if show is in local storage GET it
          if (typeof window !== 'undefined') {
            localStorage.removeItem('userShowList');
          }
          // save to local storage
          localStorage.setItem('userShowList', JSON.stringify(response2.data));
  
          // add to redux state
          dispatch({
            type: "ADD_TO_LIST",
            payload: response2.data
          });
        }
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
              {loading ? (
                <Spinner />
              ) : (
                <>
                  <h4 className="text-danger">Edit watch status of Show '{show.name}'</h4>

                  <Radio.Group onChange={(e => onRadioButtonChange(e, show.imdb))} value={watchStatus}>
                    <Space direction="vertical">
                      <Radio value="Already Watched">Already Watched</Radio>
                      <Radio value="Currently Watching">Currently Watching</Radio>
                      <Radio value="Not Yet Watched">Not Yet Watched</Radio>
                    </Space>
                  </Radio.Group>
                </>
              )}
          
            </div>
        </div>
      </div>
    );
};

export default UserWatchStatusUpdate;