import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from './services/token-service';
import Navbar from './navbar';

export default class Header extends Component {

  handleLogOut = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
  }

  renderLogOutLink() {
    <Link to="/" 
      className="logout"
      onClick={this.handleLogOut}
    >
      Logout
    </Link>
  }

  renderLogInLink() {
    return (
      <>
        <button className="small-btn logout-btn">
          <Link to="/" onClick={this.logOutClick}>Log Out</Link>
        </button>
      </>
    )
  }

  render() {
    return (
      <>
        <header>
          <nav>
            <Link to='/'>
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
