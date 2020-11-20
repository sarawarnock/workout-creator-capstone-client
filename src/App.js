import React from 'react';
import { Route, Link, Switch } from 'react-router-dom'
import config from './config'
import TokenService from './services/token-service'
import './App2.css';
import LandingPage from './landing-page'
import Navbar from './navbar'
import PersonalizedHomePage from './personalized-home-page'
import PastWorkouts from './past-workouts'
import Header from './header'
import Login from './log-in';
import SignUp from './sign-up';
import ViewPastWorkout from './view-past-workout';
import CreateNewWorkout from './create-new-workout'
import NotFoundPage from './not-found-page'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      first_name: '',
      appSavedWorkouts: [],
      appSavedWorkoutDetails: []
    }
  }

  componentDidMount(){
    //get workouts by user ID
    //if the user has not logged in, get all past workouts, once user logs in, get their past workouts
    let getWorkoutUrl = ''
    if (sessionStorage.user_id == undefined) {
      getWorkoutUrl = `${config.API_ENDPOINT}/workouts`
    } else 
    getWorkoutUrl = `${config.API_ENDPOINT}/workouts/user/${TokenService.getUserId()}`;
    console.log(sessionStorage.user_id)
    fetch(getWorkoutUrl)
        .then(response => response.json())
        //map over the workouts by ID, returning each workout
        //so that we can get the individual workout details for that workout (including the exercises)
        .then(workouts => {
            this.setState({
                appSavedWorkouts: workouts
            });
      })
      //get all workout details for all workouts to use in Past Workouts component
      let getWorkoutDetailsUrl = `${config.API_ENDPOINT}/workoutdetails/workout/`;
        fetch(getWorkoutDetailsUrl)
        .then(response => response.json())
        .then(workoutDetails => {
            this.setState({
              appSavedWorkoutDetails: workoutDetails
            });
        })
        .catch(error => this.setState({ error }))
  }

  updateAppSavedWorkouts = newWorkout => {
    this.setState({
      appSavedWorkouts: [...this.state.appSavedWorkouts, newWorkout]
    })
  }
  
  //renders the Navbar
  renderNav() {
    return (
      <div>
        <Navbar />
      </div>
    )
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
          component={Login}
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
        <nav className="app-nav"> {this.renderNav()} </nav>
        <header>
            <Link to='/'>
              <Header />
            </Link>
        </header>

        <main>
          {this.renderMainPages()}
        </main>
      </div>
    );
  }
}

export default App;

// helo