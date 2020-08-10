import React from 'react';
import { Link } from 'react-router-dom'
import TokenService from './services/token-service'
import { render } from '@testing-library/react';

export default class Navbar extends React.Component {
  logOutClick = () => {
    console.log('Logging out')
    TokenService.clearAuthToken()
    TokenService.getUserId = (id) => {
      // console.log(id)
    }

    window.location='/'
  }
  render() {
    return (
      <div className="navbar">
        <nav role="navigation" className="nav">
                  <label htmlFor="hamburger">&#9776;</label>
                  <input type="checkbox" id="hamburger"/>
                      <ul className="menu">
                          <li className="nav-link cl-home"> <Link to='/home'>Home</Link></li>
                          <li className="nav-link cl-create-workout"> <Link to='/create-workout'>Create Workout</Link></li>
                          <li className="nav-link cl-past-workouts"><Link to='/past-workouts'>Past Workouts</Link></li>
                  </ul>
                  <Link to="/" onClick={this.logOutClick}>Log Out</Link>
              </nav>
      </div>
    );
  }
}
