import React, { Fragment } from "react";
import {  
  UserOutlined,
  UserAddOutlined,
  SearchOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


const Navbar = () => { 
  let dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));

  let history = useHistory();  

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };  

  const links = (
    <ul>
      <li>
        <Link to="/search-shows">
          <SearchOutlined />
          <span className="hide-sm"> Search</span>
        </Link>
      </li>

      {!user && (
        <Fragment>
          <li>
            <Link to="/register">
              <UserAddOutlined />
              <span className="hide-sm"> Register</span>
            </Link>
          </li>
          <li>
            <Link to="/login">
              <UserOutlined />
              <span className="hide-sm"> Login</span>
            </Link>
          </li>
        </Fragment>
      )}

      {user && (
        <Fragment>
          {user && user.role === "subscriber" && (
            <li>
              <Link to="/user/dashboard">
                <i className="fas fa-user" />{' '}
                <span className="hide-sm">Dashboard</span>
              </Link>
            </li>
          )}

          {user && user.role === "admin" && (
            <li>
              <Link to="/admin/dashboard">
                <i className="fas fa-user" />{' '}
                <span className="hide-sm">AdminDashboard</span>
              </Link>
            </li>
          )}

          <li>
            <a onClick={logout} href="#!">
              <i className="fas fa-sign-out-alt" />{' '}
              <span className="hide-sm">Logout</span>
            </a>
          </li>
       
        </Fragment>
      )}
      
    </ul>
  );

     

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code" /> JSeries
        </Link>
      </h1>        
      <Fragment>{links}</Fragment>            
    </nav>     
  );
};

export default Navbar;



  

  