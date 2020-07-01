import React from 'react';
import { Link } from 'react-router-dom'

export default function Navbar(props) {
  return (
    <div className="navbar">
      <ul>
        <li className="nav-link">
          <Link
            to='/home'
          >Home</Link>
        </li>
        <li className="nav-link">
          <Link
            to='/create-workout'
          >Create Workout</Link>
        </li>
        <li className="nav-link">
          <Link
            to='/past-workouts'
          >Past Workouts</Link>
        </li>
      </ul>
    </div>
  );
}
