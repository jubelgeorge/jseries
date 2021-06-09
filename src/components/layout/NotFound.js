import React, { Fragment } from 'react';

import pic from "../../img/404-pic2.jpg";

const NotFound = () => {
  return (
    <Fragment>
      <h1>
        <i className='fas fa-exclamation-triangle' /> Page Not Found
      </h1>
      {/* <p>Sorry, this page does not exist</p> */}
      <img className="p-4" src={pic} style={{height: "500px"}} />
    </Fragment>
  );
};

export default NotFound;