import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import WorkOutContext from '../context';
import TokenService from '../Services/token-service';

export default class Header extends Component {

  static contextType = WorkOutContext

  handleLogOut = () => {
    TokenService.clearAuthToken();
  }

  renderLogOutLink() {
    const { workouts } = this.context;
    if (workouts.length === 0) {
      return (
        <>
          <Link to="/create-workout" 
            className="header-links workouts"
          >
            Create
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

  renderLogInLink() {
    return (
      <>
        <Link className="header-links signup"
          to='/sign-up'>Sign Up</Link>
        <Link className="login header-links"
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
              <h1>EMOM<br/>Workouts</h1>
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
