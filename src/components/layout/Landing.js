import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import { Carousel } from 'antd';

import {getUpcomingShows} from "../../functions/upcomingShow";
import {getTrendingShows} from "../../functions/trendingShow";

import Spinner from '../layout/Spinner';

// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";

const contentStyle = {
  height: '500px',
  //width: '500px',
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

  const loadAllUpcomingShows = () => {
    setLoading(true);
    getUpcomingShows()
    .then((res) =>{
        //console.log(res);
        setLoading(false);
        setUpcomingShows(res.data);
    })
  }

  const loadAllTrendingShows = () => {
    setLoading(true);
    getTrendingShows()
    .then((res) =>{
        //console.log(res);
        setLoading(false);
        setTrendingShows(res.data);
    })
  }

  return (
  <div> 
    <section className='landing'>
        <div className='dark-overlay'>
          <div className='landing-inner'>
            <h1 className='x-large' style={{color: "#fff"}}>Welcome to JSeries!</h1>
            <p className='lead'>
            Browse web & tv series, add the ones you have watched onto your list
            </p>
            <div className='buttons'>
            {user && user.role ==="subscriber" ?
                <Link to='/search-shows' className='btn btn-primary'>
                  Search for Shows
                </Link>
              :
                <Fragment>
                  <Link to='/register' className='btn btn-primary'>
                    Sign Up
                  </Link>
                  <Link to='/login' className='btn btn-warning'>
                    Login
                  </Link>
                </Fragment>
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

    {/* {loading ? (
      <Spinner />
      ) : (
      <Carousel showArrows={true} autoPlay infiniteLoop>
        {upcomingShows.map((u) => (          
            <img key={u._id} src={`/uploads/${u.image}`} />    
        ))}
      </Carousel>
    )} */}
    

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

    {/* {loading ? (
      <Spinner />
      ) : (
      <Carousel showArrows={true} autoPlay infiniteLoop className="pr-5 pl-5">
        {trendingShows.map((t) => (          
            <img key={t._id} src={`/uploads/${t.image}`} /> 
        ))}
      </Carousel>
    )} */}

  </div>
  );
};

export default Landing;




