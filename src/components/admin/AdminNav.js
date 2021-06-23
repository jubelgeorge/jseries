import React from "react";
import { Link } from "react-router-dom";


const AdminNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/admin/dashboard" className="nav-link">
          Dashboard
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/upcoming-shows" className="nav-link">
          Upcoming Shows
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/trending-shows" className="nav-link">
          Trending Shows
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/users" className="nav-link">
          Users
        </Link>
      </li>      

      <li className="nav-item">
        <Link to="/admin/password" className="nav-link">
          Password
        </Link>
      </li>
    </ul>
  </nav>
);

export default AdminNav;