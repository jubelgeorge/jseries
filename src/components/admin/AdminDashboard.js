import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";

import AdminNav from "./AdminNav";
import Spinner from '../layout/Spinner';

import { getUsers } from "../../functions/admin";


const AdminDashboard = () => {    
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false); 

  const { user } = useSelector((state) => ({ ...state }));
    
  useEffect(() => {
    loadAllUsers();
  }, []);

  const loadAllUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers(user.token); 

      const resultantUsersWithoutAdminUser = response.data.filter(u => {
        return u.role === 'subscriber'
      })
      setUsers(resultantUsersWithoutAdminUser);  
      setLoading(false); 

    } catch (err) {
        console.log(err);
    }       
  } 

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4>Admin Dashboard</h4>
          <hr />
          <h5>Statistics</h5>
          {loading ? (
            <Spinner />
          ) : (
            <p>Total Users: <b>{users.length}</b></p>
          )}            
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;