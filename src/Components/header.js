import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../Services/token-service-lf';

export default class Header extends Component {

  handleLogOut = () => {
    TokenService.clearAuthToken();
  }

  renderLogOutLink() {
    return (
      <>
        <Link to="/workouts" 
          className="workouts header-links"
        >
          Workouts
        </Link>
        <Link to="/" 
          className="logout header-links"
          onClick={this.handleLogOut}
        >
          Logout
        </Link>
      </>
    )
  }

  // renderCreateWorkout() {
  //   return (
  //     <>
  //       <Link to="/workouts" 
  //         className="workouts header-links"
  //       >
  //         New Workout
  //       </Link>
  //       <Link to="/" 
  //         className="logout header-links"
  //         onClick={this.handleLogOut}
  //       >
  //         Logout
  //       </Link>
  //     </>
  //   )
  // }

  renderLogInLink() {
    return (
      <>
        <Link className="header-links signup"
          to='/sign-up'>Sign Up</Link>
        <Link className="header-links"
          to='/login'>Login</Link>
      </>
    )
  }

  render() {
    return (
      <>
        <header>
          <nav>
            <Link className="home-link" to='/'>
              <h1>MyMetcon</h1>
            </Link>
            <div className="app-nav">
                {TokenService.hasAuthToken()
                  ? this.renderLogOutLink()
                  : this.renderLogInLink()
                }
            </div>
          </nav>
        </header>
      </>
    );
  }
}
