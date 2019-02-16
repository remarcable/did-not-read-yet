import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
const Navigation = () => {
  return (
    <ul className="navbar">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/feed">Feed</Link>
      </li>
      <li>
        <Link to="/submit">Submit</Link>
      </li>
    </ul>
  );
};
export default Navigation;
