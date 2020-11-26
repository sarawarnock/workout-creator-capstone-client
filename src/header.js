import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from './services/token-service';
// import Navbar from './navbar';

export default class Header extends Component {

  handleLogOut = () => {
    TokenService.clearAuthToken();
  }

  renderLogOutLink() {
    return (
      <>
        <Link to="/" 
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
              <h2>Build Stronger Workouts</h2>
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
