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
                <div className={'nav-links'}>
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
                </div>
            )
        }
        return (
            <div className={'nav-links'}>
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
            </div>
        )
    }
    renderLogInLink() {
        return (
            <div className={'nav-links'}>
                <Link className="header-links signup"
                      to='/sign-up'>Register</Link>
                <Link className="login header-links"
                      to='/login'>Login</Link>
            </div>
        )
    }

    render() {
        return (
            <>
                <header>
                    <nav>
                        <Link className="home-link" to='/'>
                            <h1>My Metcon</h1>
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