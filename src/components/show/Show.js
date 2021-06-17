import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { getSearchShows } from "../../functions/show";
import picDefault from "../../img/tvseries.jpg";
import { Card, Tabs, Tooltip } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import Spinner from '../layout/Spinner';
import { getShows, addShow, removeShow } from "../../functions/user";
import _ from "lodash";
import { toast } from "react-toastify";

import ShowInfoListItems from "./ShowInfoListItems";

const { TabPane } = Tabs;

const Show = ({ match, history }) => {
  const [show, setShow] = useState([]);
  const [shows, setShows] = useState([]); 
  const [showAdded, setShowAdded] = useState(false);
  const [tooltip, setTooltip] = useState("Click to add");
  const [loading, setLoading] = useState(false);

  const { user, showList } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const { imdb } = match.params;

  useEffect(() => {
    loadShow({ queryIMDB: imdb })
  }, [imdb]);
  
  useEffect(() => {
    showAdded1();
  }, [showAdded]);

  const showAdded1 = () => {
    showList.filter(s => {
      if(imdb === s.imdb) {
        setShowAdded(true);
        setTooltip("Added");
      }
    });    
  }
  
  const loadShow = (arg) => {
    setLoading(true);
    getSearchShows(arg)
      .then((res) => {
        //console.log("RES",res.data);
        setLoading(false);
        setShow(res.data);
    });
  }
  const {name, image, summary} = show;

  //Summary after modification
  //console.log(summary);
  const summary1 = _.replace(summary,'<p>', '');
  const summary2 = _.replace(summary1,'</p>', '');
  const summary3 = _.replace(summary2,'<b>', '');
  const summary4 = _.replace(summary3,'</b>', '');
  const summary5 = _.replace(summary4,'<i>', '');
  const summaryFinal = _.replace(summary5,'</i>', '');
  //console.log(summaryFinal);

  const handleAddToList = (show1) => {
    //console.log(show1);
    addShow({show:show1}, user.token)
    .then((res) => {
      //console.log(res.data);
      let showList1 = []; 
      if (typeof window !== "undefined") {
        // if show is in local storage GET it
        if (localStorage.getItem('userShowList')) {
          showList1 = JSON.parse(localStorage.getItem('userShowList'));
        }
        // push new show to cart
        showList1.push({
          ...res.data
        });
        // remove duplicates
        let unique = _.uniqWith(showList1, _.isEqual);
        // save to local storage
        // console.log('unique', unique)
        localStorage.setItem('userShowList', JSON.stringify(unique));
        // show tooltip
        setTooltip("Added");
  
        // add to redux state
        dispatch({
          type: "ADD_TO_LIST",
          payload: unique
        });
      }
      setShowAdded(true);
      toast.success(`"${res.data.name}"  show is added to your list!`);
    })
    .catch((err) => console.log("Add show err", err));
  };
  
  const handleRemoveFromList = (show) => {
    const IMDB = show.externals.imdb;
    removeShow(IMDB, user.token)
    .then((res) => {
    //console.log(res.data);
      getShows(user.token)
        .then((res1) =>{
          //console.log(res);
          //setLoading(false);
          setShows(res1.data);        
        
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
            setShowAdded(false);
            setTooltip("Click To Add");
          }
      })
       
       
       toast.success(`"${res.data.name}" show is removed from your list!`);
    })
    .catch((err) => console.log("Remove show err", err));
  };

  return (       
    <div className="container-fluid">
      <div className="row pt-4">
        {loading ? (
          <Spinner />
          ) : (
          ""
        )}
        {/* {JSON.stringify(show)}; */}
        <div className="col-md-7">
          {image ? (
            <Card 
              cover={
                <img 
                  src={image.original} 
                  style={{ height: "700px", objectFit: "fit" }}                     
                />
              }
            >              
            </Card>
          ) : (
            <Card cover={<img src={picDefault} className="mb-3 card-image" />}></Card>
          )}
         
          <Tabs type="card">
            <TabPane tab="Summary" key="1">
              {summaryFinal && summaryFinal}
            </TabPane>
            <TabPane tab="More" key="2">
              Call use on xxxx xxx xxx to learn more about this product.
            </TabPane>
          </Tabs>
        </div>

        
        <div className="col-md-5">
          <h1 className="bg-info p-3">{name}</h1>       
          {user && user.token 
            ?
              <Card
                actions={[                  
                  <Tooltip placement="top" title={tooltip}>
                    <a onClick={(e => handleAddToList(show))} disabled={showAdded}>
                      <PlusOutlined className="text-warning" /> <br />
                      {showAdded ? "Already Added" : "Add to List"}
                    </a>     
                  </Tooltip>,                  
                  <a onClick={(e => handleRemoveFromList(show))} disabled={!showAdded}>
                    <DeleteOutlined className="text-danger" /> <br />
                    Remove From List
                  </a> 
                ]}
              >
                <ShowInfoListItems show={show} />
              </Card>
            :
              <Card
                actions={[
                  <Tooltip title='Click to Login first'>
                    {/* <a onClick={handleLoginToAddToList}> */}
                    <Link
                      to={{
                        pathname: "/login",
                        state: { from: "show" }
                      }}
                    >
                      <PlusOutlined className="text-danger" /> <br />
                         Login to Add To List
                    </Link>                      
                    {/* </a>      */}
                  </Tooltip>
                ]}
              >
                <ShowInfoListItems show={show} />
              </Card>
          }
        </div>
      </div>
      
    </div>
  );
};

export default Show;
