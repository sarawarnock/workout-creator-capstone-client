import React, { Component } from 'react';
import { Switch, withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import './App2.css';

import LandingPage from './landing-page';
import PersonalizedHomePage from './personalized-home-page';
import WorkoutsList from './workouts-list-sw';
import Header from './header';
import LoginRoute from './login-route';
import SignUpRoute from './sign-up-route';
import ViewWorkout from './view-workout-lf';
import CreateWorkoutRoute from './create-workout-route';
import NotFoundPage from './not-found-page';

// import config from './config';
import TokenService from './services/token-service-lf';
import AuthApiService from './services/auth-api-service-lf';
import IdleService from './services/idle-service-lf';

import WorkoutContext from './context';

class App extends Component {

    static contextType = WorkoutContext;

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            error: false,
        };
    }
  
    static getDerivedStateFromError(error) {
        return { error: true };
    }

    componentDidMount(){
        localStorage.clear();
        IdleService.setIdleCallback(this.logoutFromIdle);
        if (TokenService.hasAuthToken()) {
            IdleService.regiserIdleTimerResets();
            TokenService.queueCallbackBeforeExpiry(() => {
                AuthApiService.postRefreshToken();
            });
        } 
    }

    componentWillUnmount() {
        IdleService.unRegisterIdleResets();
        TokenService.clearCallbackBeforeExpiry();
    }

    logoutFromIdle = () => {
        TokenService.clearAuthToken();
        TokenService.clearCallbackBeforeExpiry();
        IdleService.unRegisterIdleResets();
        this.forceUpdate();
    }

  render() {
    return (
        <>
            <div className="App">
                <Header />
                <main className="main-pages">
                    <Switch>        
                        <Route 
                            exact
                            path='/'
                            component={LandingPage}
                        />
                        <Route 
                            exact
                            path={`/home`}
                            component={PersonalizedHomePage}
                        />
                        <Route 
                            exact
                            path='/login'
                            component={LoginRoute}
                        />
                        <Route 
                            exact
                            path='/sign-up'
                            component={SignUpRoute}
                        />
                        <Route 
                            exact
                            path='/create-workout'
                            component={CreateWorkoutRoute}
                        />
                        <Route 
                            exact
                            path={`/past-workouts`}
                            component={WorkoutsList}
                        />
                        <Route 
                            exact
                            path='/past-workouts/:workout_id'
                            component={ViewWorkout}
                        />
                        <Route 
                            component={NotFoundPage}
                        />
                    </Switch>
                </main>
            </div>
        </>
    );
  }
}

export default withRouter(App);