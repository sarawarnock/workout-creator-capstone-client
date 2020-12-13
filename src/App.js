import React, { Component } from 'react';
import { Switch, withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import './App.css';
import PublicRoute from './Routes/public-route'
import PrivateRoute from './Routes/private-route'
import LandingPage from './Components/landing-page';
// import PersonalizedHomePage from './Components/personalized-home-page';
import WorkoutsList from './Components/workouts-list';
import Header from './Components/header';
import LoginRoute from './Routes/login-route';
import SignUpRoute from './Routes/sign-up-route';
import ViewWorkout from './Components/view-workout';
import CreateWorkoutRoute from './Routes/create-workout-route';
import NotFoundPage from './Components/not-found-page';

import TokenService from './Services/token-service-lf';
import AuthApiService from './Services/auth-api-service';
import IdleService from './Services/idle-service';

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
        <div className="App">
            <Header />
            <main className="main-pages">
                <Switch>        
                    <Route 
                        exact
                        path='/'
                        component={LandingPage}
                    />
                    {/* <PrivateRoute 
                        exact
                        path={`/home`}
                        component={PersonalizedHomePage}
                    /> */}
                    <PublicRoute 
                        exact
                        path='/login'
                        component={LoginRoute}
                    />
                    <PublicRoute 
                        exact
                        path='/sign-up'
                        component={SignUpRoute}
                    />
                    <PrivateRoute 
                        exact
                        path='/create-workout'
                        component={CreateWorkoutRoute}
                    />
                    <PrivateRoute 
                        exact
                        path={`/workouts`}
                        component={WorkoutsList}
                    />
                    <PrivateRoute 
                        exact
                        path='/workouts/:workout_id'
                        component={ViewWorkout}
                    />
                    <Route 
                        component={NotFoundPage}
                    />
                </Switch>
            </main>
        </div>
    );
  }
}

export default withRouter(App);