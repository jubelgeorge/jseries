import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

import UserNav from "./UserNav";
import { getShows, removeShow } from "../../functions/user";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Spinner from '../layout/Spinner';
import { Card } from 'antd';
import { toast } from "react-toastify";
import _ from "lodash";

const { Meta } = Card;

const UserShowList = ({history}) => {  
  const [shows, setShows] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [text, setText] = useState("");
  
  const { user, showList } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  
  useEffect(() => {
    loadAllShows();
  }, []);

  const loadAllShows = () => {
    //setLoading(true);
    getShows(user.token)
    .then((res) =>{
        //console.log(res);
        //setLoading(false);
        setShows(res.data);        
    })
  }

  const handleChange = (e) => {
    // setText(e.target.value);
    // setLoading(true);
    // setShows([]);
    // setIMDB(""); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(text);
    // setLoading(true);
    // loadSearchShows();
    // setIMDB("");
  }; 
  
  const handleRemoveFromList = (e) => {
    //console.log(e);
    const IMDB = e.target.value;
    if(window.confirm("Delete show?")){
      removeShow(IMDB, user.token)
        .then((res) => {
        //console.log(res.data);
          getShows(user.token)
            .then((res1) =>{
              //console.log(res);
              //setLoading(false);
              setShows(res1.data);        
            
              let showList1 = []; 
              if (typeof window !== "undefined") {
                // if show is in local storage GET it
                if (typeof window !== 'undefined') {
                  localStorage.removeItem('userShowList');
                }
                
                // remove duplicates
                let unique = _.uniqWith(res1.data, _.isEqual);
                // save to local storage
                // console.log('unique', unique)
                localStorage.setItem('userShowList', JSON.stringify(unique));
        
                // add to redux state
                dispatch({
                  type: "ADD_TO_LIST",
                  payload: unique
                });
              }
          })
        
          toast.success(`"${res.data.name}" show is removed from your list!`);
        })
        .catch((err) => console.log("Remove show err", err));
    }
    
  };

  return (
    <div className="container-fluid">
      <div className="row p-3">
        <div className="col-md-3 pt-2">
          <UserNav />    
        </div>

        <div className="col-md-9 pt-2">
          <div className="container-fluid">       
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

          {loading ? (
              <Spinner />
            ) : (
              <h4 className="text-danger">Shows</h4>
          )}          

          {shows.length < 1 && <p>No shows found</p>}

          {/* {JSON.stringify(shows)}; */}

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
        </div>
      </div>
    </div>            
  );
};

export default UserShowList;





  

  
      
    



