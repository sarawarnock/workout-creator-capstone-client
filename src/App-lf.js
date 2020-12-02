import React, { Component } from 'react';
import { Switch, withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import './App2.css';

import LandingPage from './landing-page';
import PersonalizedHomePage from './personalized-home-page';
import PastWorkouts from './past-workouts';
import Header from './header';
// import Login from './log-in';
import LoginRoute from './login-route';
import SignUpRoute from './sign-up-route';
import ViewPastWorkout from './view-past-workout';
import CreateNewWorkout from './create-new-workout';
import NotFoundPage from './not-found-page';

import config from './config';
import TokenService from './services/token-service-lf';
import AuthApiService from './services/auth-api-service-lf';
import IdleService from './services/idle-service-lf';

class App extends React.Component {
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

  updateAppSavedWorkouts = newWorkout => {
    this.setState({
      appSavedWorkouts: [...this.state.appSavedWorkouts, newWorkout]
    })
  }

  //renders all of the routes 
  renderMainPages = () => {
    return (
      <div className="main-pages">
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
          path='/create-workout'
          render={(props) => <CreateNewWorkout {...props} saveNewWorkout={this.updateAppSavedWorkouts} />}
        />
        <Route 
          exact
          path={`/past-workouts`}
          render={(props) => <PastWorkouts {...props} appSavedWorkouts={this.state.appSavedWorkouts} 
            appSavedWorkoutDetails={this.state.appSavedWorkoutDetails}
          />}
        />
        <Route 
          exact
          path='/login'
          component={LoginRoute}
        />
        <Route 
          exact
          path='/sign-up'
          component={SignUp}
        />
        <Route 
          exact
          path='/past-workouts/:workout_id'
          render={(props) => <ViewPastWorkout {...props}
          appSavedWorkoutDetails={this.state.appSavedWorkoutDetails} />}
        />
        <Route 
          component={NotFoundPage}
        />
      </Switch>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <Header />
        <main>
          {this.renderMainPages()}
        </main>
      </div>
    );
  }
}

export default App;