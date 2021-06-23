import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import UserNav from "./UserNav";
import Spinner from '../layout/Spinner';
import _ from "lodash";

import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { Card } from 'antd';
import { toast } from "react-toastify";

import { getShows, removeShow, getShowsByText } from "../../functions/user";

const { Meta } = Card;



const UserShowList = () => {  
  const [shows, setShows] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [text, setText] = useState("");
  
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  
  useEffect(() => {
    loadAllShows();
  }, []);

  useEffect(() => {
    const delayed = setTimeout(() => {
      loadAllSearchedShows();
    }, 300);
    return () => clearTimeout(delayed);    
  }, [text]);

  const loadAllShows = async () => {
    try {
      setLoading(true);
      // getShows(user.token)
      // .then((res) =>{
      //     //console.log(res);
      //     //setLoading(false);
      //     setShows(res.data);        
      // })

      const response = await getShows(user.token);
      setShows(response.data);  
      setLoading(false);  
  
    } catch (err) {
        console.log(err);
    }    
  }

  const loadAllSearchedShows = async () => {
    try {
      setLoading(true);
      //getShowsByText(text, user.token)
      // .then((res) =>{
      //     //console.log(res);
      //     //setLoading(false);
      //     setShows(res.data);        
      // })

      const response = await getShowsByText(text, user.token);
      setShows(response.data); 
      setLoading(false);  
  
    } catch (err) {
        console.log(err);
    }   
  }

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loadAllSearchedShows();
  }; 
  
  const handleRemoveFromList = async (e) => {
    try {
      setLoading(true);
      const IMDB = e.target.value;
      // if(window.confirm("Delete show?")){
      //   removeShow(IMDB, user.token)
      //     .then((res) => {
      //     //console.log(res.data);
      //       getShows(user.token)
      //         .then((res1) =>{
      //           //console.log(res);
      //           //setLoading(false);
      //           setShows(res1.data);        
              
      //           let showList1 = []; 
      //           if (typeof window !== "undefined") {
      //             // if show is in local storage GET it
      //             if (typeof window !== 'undefined') {
      //               localStorage.removeItem('userShowList');
      //             }
                  
      //             // remove duplicates
      //             let unique = _.uniqWith(res1.data, _.isEqual);
      //             // save to local storage
      //             // console.log('unique', unique)
      //             localStorage.setItem('userShowList', JSON.stringify(unique));
          
      //             // add to redux state
      //             dispatch({
      //               type: "ADD_TO_LIST",
      //               payload: unique
      //             });
      //           }
      //       })
          
      //       toast.success(`"${res.data.name}" show is removed from your list!`);
      //     })
      //     .catch((err) => console.log("Remove show err", err));
      // }
      if(window.confirm("Delete show?")){
        const response1 = await removeShow(IMDB, user.token);
        const response2 = await getShows(user.token);
        setShows(response2.data);   

        if (typeof window !== "undefined") {
          // if show is in local storage GET it
          if (typeof window !== 'undefined') {
            localStorage.removeItem('userShowList');
          }
          
          // remove duplicates
          let unique = _.uniqWith(response2.data, _.isEqual);

          // save to local storage
          localStorage.setItem('userShowList', JSON.stringify(unique));
  
          // add to redux state
          dispatch({
            type: "ADD_TO_LIST",
            payload: unique
          });
        }
        toast.success(`"${response1.data.name}" show is removed from your list!`);
      } 
      setLoading(false);  
  
    } catch (err) {
        toast.error("Remove show err", err);
        setLoading(false);
    }        
  };


  return (
    <div className="container-fluid">
      <div className="row p-3">
        <div className="col-md-3 pt-2">
          <UserNav />    
        </div>

        <div className="col-md-9 pt-2">
          <div className="container-fluid" style={{marginLeft: "-10px", marginTop: "-8px"}}>   
            <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
              <input
                onChange={handleChange}
                type="search"
                value={text}
                className="form-control mr-sm-2"
                placeholder="Search"
              />
              <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} />
            </form>
          </div>
          <br/>    
          <h4 className="text-danger">Shows</h4>
          {shows.length < 1 && <p>No shows found</p>}
          {loading ? (
            <Spinner />
          ) : (
            <>
              <p>Total no. of Shows: <b>{shows.length}</b></p>
              {shows.map((s) => (
                <div key={s._id} className="row p-3">
                  <div className="col-md-3 pt-2">              
                    <Card
                      hoverable
                      cover={
                        <img
                          alt={s.name}
                          src={s.image}
                          style={{ height: "150px", objectFit: "fit" }}
                          className="p-1"
                        />
                      }
                      actions={[
                        <Link to={`/show/${s.imdb}`}>
                          <EyeOutlined className="text-warning" /> <br /> View Show
                        </Link>                  
                      ]}
                    >
                      <Meta
                        title={s.name}
                        description={s.imdb}
                      />
                    </Card>    
                  </div>

                  <div>
                    <br />
                    <button onClick={handleRemoveFromList} value={s.imdb} className="btn btn-outline-danger">Remove From List</button>  
                    <br /><br />
                    <Link to={`/show/edit-watch-status/${s._id}`}>
                        <button className="text-primary" style={{cursor: "pointer"}}>Click here to update Watch Status</button> 
                    </Link>
                    <br /><br />
                    <p className="text-info">Current Watch Status: <b>{s.watchStatus}</b></p>
                  </div>
                </div>
              ))}             
            </> 
          )}          

        </div>
      </div>
    </div>            
  );
};

export default UserShowList;