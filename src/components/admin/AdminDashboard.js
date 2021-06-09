import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import AdminNav from "./AdminNav";


const AdminDashboard = () => {    

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4>Admin Dashboard</h4>
          
          
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
