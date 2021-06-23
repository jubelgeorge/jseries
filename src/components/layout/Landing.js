import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import Spinner from '../layout/Spinner';

import { Carousel } from 'antd';

import {getUpcomingShows} from "../../functions/upcomingShow";
import {getTrendingShows} from "../../functions/trendingShow";

const contentStyle = {
  height: '500px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
  margin: 'auto',
  width: '50%',  
  padding: '10px',
};


const Landing = () => {
  const [upcomingShows, setUpcomingShows] = useState([]);
  const [trendingShows, setTrendingShows] = useState([]);
  const [loading,setLoading] = useState(false);

  // redux
  const { user } = useSelector((state) => ({ ...state }));
  
  useEffect(() => {
    setLoading(true);
    loadAllUpcomingShows();
    loadAllTrendingShows();
  }, []);

  const loadAllUpcomingShows = async () => {
    try {
      setLoading(true);

      // getUpcomingShows()
      // .then((res) =>{
      //     setLoading(false);
      //     setUpcomingShows(res.data);
      // })

      const response = await getUpcomingShows();
      setUpcomingShows(response.data);
      setLoading(false);  
  
    } catch (err) {
      console.log(err);
    }      
  }

  const loadAllTrendingShows = async () => {
    try {
      setLoading(true);

      // getTrendingShows()
      // .then((res) =>{
      //     setLoading(false);
      //     setTrendingShows(res.data);
      // })

      const response = await getTrendingShows();
      setTrendingShows(response.data);
      setLoading(false);  
  
    } catch (err) {
      console.log(err);
    }    
  }

  return (
    <div> 
      <section className='landing'>
          <div className='dark-overlay'>
            <div className='landing-inner'>
              <h1 className='x-large' style={{color: "#fff"}}>Welcome to JSeries!</h1>
              <p className='lead' style={{color: "orange"}}> 
                Browse web & tv series, add the ones you have watched onto your list.
              </p>
              <div className='buttons'>
              {user && user.role ==="subscriber" ?
                  <Link to='/shows' className='btn btn-primary'>
                    Shows List
                  </Link>
                :
                  <Link to='/search-shows' className='btn btn-primary'>
                    Search for Shows
                  </Link>
                }              
              </div>
            </div>
          </div>
      </section>   

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
          Most Anticipated Upcoming TV Shows
      </h4>
      {loading ? (
        <Spinner />
        ) : (
        <Carousel autoplay className="pr-5 pl-5">
          {upcomingShows.map((u) => (
            <div key={u._id}>
              <img style={contentStyle} src={`/uploads/${u.image}`} />      
            </div>
          ))}
        </Carousel>
      )}    

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
          Most Trending Shows
      </h4>
      {loading ? (
        <Spinner />
        ) : (
        <Carousel autoplay className="pr-5 pl-5">
          {trendingShows.map((t) => (
            <div key={t._id}>
              <img style={contentStyle} src={`/uploads/${t.image}`} />      
            </div>
          ))}
        </Carousel>
      )}

    </div>
  );
};

export default Landing;