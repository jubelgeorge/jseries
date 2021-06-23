import React from "react";
import { Link } from "react-router-dom";



const UserNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/dashboard" className="nav-link">
          Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/shows" className="nav-link">
          Shows
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/shows/table" className="nav-link">
          TableShows
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/users" className="nav-link">
          Users
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/password" className="nav-link">
          Password
        </Link>
      </li>
    </ul>
  </nav>
);

export default UserNav;