import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
const Navigation = () => {
  return (
    <ul className="navbar">
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/register">Register</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
      <li>
        <NavLink to="/feed">Feed</NavLink>
      </li>
      <li>
        <NavLink to="/submit">Submit</NavLink>
      </li>
    </ul>
  );
};
export default Navigation;
