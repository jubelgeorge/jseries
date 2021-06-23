import React, { Fragment } from 'react';

import pic from "../../img/404-pic2.jpg";

const NotFound = () => {
  return (
    <Fragment>
      <h1 className="pl-4 pt-2">
        <i className='fas fa-exclamation-triangle' /> Page Not Found
      </h1>
      <img className="p-4" src={pic} style={{height: "500px"}} />
    </Fragment>
  );
};

export default NotFound;