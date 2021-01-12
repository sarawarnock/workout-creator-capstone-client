import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../Services/token-service';

export default class Header extends Component {
    state = {
        active: false
    }

          handleLogOut = () => {
            TokenService.clearAuthToken();
          }

          handleCLick = () => {
            this.setState({ active: !this.state.active })
          }

          closeMobileMenu = () => {
            this.setState({ active: false })
          }

            handleClickAndLogout = () => {
                this.closeMobileMenu();
                this.handleLogOut()
            }

      renderLogOutLink() {
        const { workouts } = this.context;
        const { active } = this.state;

          if (workouts.length === 0) {
          return (
              <>
                  <div className='menu-icon' onClick={this.handleCLick}>
                      <i className={active ? 'fas fa-times' : 'fas fa-bars'} />
                  </div>
                  <div className={'navlinks'}>
                      <Link to="/create-workout"
                            className="header-links workouts"
                            onClick={this.closeMobileMenu}
                      >
                          Create
                      </Link>
                      <Link to="/"
                            className="logout header-links"
                            onClick={this.handleClickAndLogout}
                      >
                          Logout
                      </Link>
                  </div>
              </>
          )
        }
        return (
            <>
                <div className='menu-icon' onClick={this.handleCLick}>
                    <i className={active ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <div className={'navlinks'}>
                    <Link to="/workouts"
                          className="workouts header-links"
                          onClick={this.closeMobileMenu}
                    >
                        Workouts
                    </Link>
                    <Link to="/"
                          className="logout header-links"
                          onClick={this.handleClickAndLogout}
                    >
                        Logout
                    </Link>
                </div>
            </>
        )
      }

      renderLogInLink() {
          const { active } = this.state;
          return (
            <>
                <div className='menu-icon' onClick={this.handleCLick}>
                    <i className={active ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <div className={'navlinks'}>
                    <Link
                        onClick={this.closeMobileMenu}
                        className="header-links signup"
                        to='/sign-up'>Sign Up</Link>
                    <Link
                        onClick={this.closeMobileMenu}
                        className="login header-links"
                        to='/login'>Login</Link>
                </div>
            </>
        )
      }

      render() {
        const { active } = this.state;
        return (
          <>
            <header>
              <nav className={active ? 'nav-menu active' : ''}>
                <Link onClick={this.closeMobileMenu}
                    className="home-link" to='/'>
                  <h1>My Metcon</h1>
                </Link>
                    {TokenService.hasAuthToken()
                      ? this.renderLogOutLink()
                      : this.renderLogInLink()
                    }
              </nav>
            </header>
          </>
        );
      }
}
