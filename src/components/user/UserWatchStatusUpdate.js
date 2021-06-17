import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getShow, updateShow, getShows } from "../../functions/user";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Spinner from '../layout/Spinner';
import { Card, Radio, Input, Space } from 'antd';
import { toast } from "react-toastify";
import UserNav from "./UserNav";


const UserWatchStatusUpdate = ({ match, history }) => {  
    const [show, setShow] = useState([]);
    const [watchStatus, setWatchStatus] = useState("Already Watched");
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    const { id } = match.params;

    useEffect(() => {
        loadShow(id)
    }, []);


    const loadShow = (id) => {
        // setLoading(true);
        getShow(id, user.token)
          .then((res) => {
            //console.log("RES",res.data);
            setLoading(false);
            setShow(res.data);
            setWatchStatus(res.data.watchStatus);
        });
    }

    const onRadioButtonChange = (e) => {
        //console.log('radio checked', e.target.value);
        const showWatchStatus = e.target.value;
        const showId = show._id;
        setWatchStatus(showWatchStatus);
        updateShow(showWatchStatus, showId, user.token)
          .then((res) => {
            //console.log(res);
            loadShow();
            getShows(user.token)
              .then((res1) =>{
            
                if (typeof window !== "undefined") {
                  // if show is in local storage GET it
                  if (typeof window !== 'undefined') {
                    localStorage.removeItem('userShowList');
                  }
                  // save to local storage
                  localStorage.setItem('userShowList', JSON.stringify(res1.data));
          
                  // add to redux state
                  dispatch({
                    type: "ADD_TO_LIST",
                    payload: res1.data
                  });
                }
            })
        })
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
              <h4 className="text-danger">Edit watch status of Show '{show.name}'</h4>
            )}
            <h4></h4>          
            <Radio.Group onChange={(e => onRadioButtonChange(e, show.imdb))} value={watchStatus}>
                  <Space direction="vertical">
                    <Radio value="Already Watched">Already Watched</Radio>
                    <Radio value="Currently Watching">Currently Watching</Radio>
                    <Radio value="Not Yet Watched">Not Yet Watched</Radio>
                  </Space>
            </Radio.Group>
            </div>
        </div>
        </div>
    );
};

export default UserWatchStatusUpdate;


  
    
    
