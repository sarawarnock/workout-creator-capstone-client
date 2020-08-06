import React from 'react';
import { Route, Link } from 'react-router-dom'
import config from './config'
import './App2.css';
import LandingPage from './landing-page'
import Navbar from './navbar'
import PersonalizedHomePage from './personalized-home-page'
import PastWorkouts from './past-workouts'
import Header from './header'
import Login from './log-in';
import SignUp from './sign-up';
import ViewPastWorkout from './view-past-workout';
import CreateNewWorkout2 from './2-create-new-workout-checkbox'

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

  //------------------------------------------------
  componentDidMount(){
    //get workouts by user ID
    let getWorkoutUrl = `${config.API_ENDPOINT}/workouts/user/1`;
    fetch(getWorkoutUrl)
        .then(response => response.json())
        //map over the workouts by ID, returning each workout
        //so that we can get the individual workout details for that workout (including the exercises)
        .then(workouts => {
            this.setState({
                appSavedWorkouts: workouts
            });
      })

      let getWorkoutDetailsUrl = `${config.API_ENDPOINT}/workoutdetails/workout/`;
        fetch(getWorkoutDetailsUrl)
        .then(response => response.json())
        .then(workoutDetails => {
            this.setState({
              appSavedWorkoutDetails: workoutDetails
                //savedWorkoutDetails: [...this.state.savedWorkoutDetails, ...workoutDetails]
            });
        })
        .catch(error => this.setState({ error }))
  }
  
  //---------------------------------------------------

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

    // let appWorkoutDetails = []
    // for (let i = 0; i < this.state.appSavedWorkoutDetails.length; i++) {
    //   appWorkoutDetails.push(this.state.appSavedWorkoutDetails[i])
    //   console.log(appWorkoutDetails)
    // }

    console.log(this.state.appSavedWorkouts)
    console.log(this.state.appSavedWorkoutDetails)
    return (
      <div className="main-pages">
        <Route 
          exact
          path='/'
          component={LandingPage}
        />
        <Route 
          path='/home'
          component={PersonalizedHomePage}
        />
        <Route 
          path='/create-workout'
          //component={CreateNewWorkout2}
          render={(props) => <CreateNewWorkout2 {...props} saveNewWorkout={this.updateAppSavedWorkouts} />}
        />
        <Route 
          exact
          path='/past-workouts'
          //component={PastWorkouts}
          render={(props) => <PastWorkouts {...props} appSavedWorkouts={this.state.appSavedWorkouts} 
            appSavedWorkoutDetails={this.state.appSavedWorkoutDetails}
          />}
        />
        <Route 
          path='/login'
          component={Login}
        />
        <Route 
          path='/sign-up'
          component={SignUp}
        />
        {/* Will need to use the workout_id here to specify which workout to view */}
        {/* {['/', '/past-workouts/:workout_id'].map(path => ( */}
          <Route 
          exact
          //key={path}
          //path={path}
          path='/past-workouts/:workout_id'
          render={(props) => <ViewPastWorkout {...props}
          appSavedWorkoutDetails={this.state.appSavedWorkoutDetails} />}
        />
        {/* ))} */}
        {/* <Route 
          path='/forgot-password'
          component={ForgotPassword}
        /> */}
        {/* need to .map here too?
        once the workout gets created, it should go right to this page */}
        {/* <Route
          exact 
          path='/:workout_id'
          component={NewWorkoutCreated}
        /> */}
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
