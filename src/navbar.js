import React from 'react';
import { Link } from 'react-router-dom'

export default function Navbar(props) {
  return (
    <div className="navbar">
      {/* <ul>
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
      </ul> */}

      <nav role="navigation" className="nav">
                <label htmlFor="hamburger">&#9776;</label>
                <input type="checkbox" id="hamburger"/>
                    <ul className="menu">
                        <li className="nav-link cl-home"> <Link to='/home'>Home</Link></li>
                        <li className="nav-link cl-create-workout"> <Link to='/create-workout'>Create Workout</Link></li>
                        <li className="nav-link cl-past-workouts"><Link to='/past-workouts'>Past Workouts</Link></li>
                </ul>
            </nav>
    </div>
  );
}
