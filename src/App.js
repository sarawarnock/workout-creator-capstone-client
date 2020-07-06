import React from 'react';
import { Route, Link } from 'react-router-dom'
import './App2.css';
import LandingPage from './landing-page'
import Navbar from './navbar'
import PersonalizedHomePage from './personalized-home-page'
import PastWorkouts from './past-workouts'
import CreateNewWorkout from './create-new-workout'
import NewWorkoutCreated from './new-workout-created'
import Header from './header'
import Login from './log-in';
import SignUp from './sign-up';
import ViewPastWorkout from './view-past-workout';
import ForgotPassword from './forgot-password';
import CreateNewWorkout2 from './2-create-new-workout-checkbox'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      first_name: '',
    }
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
  renderMainPages() {
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
          component={CreateNewWorkout2}
        />
        <Route 
          exact
          path='/past-workouts'
          component={PastWorkouts}
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
          component={ViewPastWorkout} 
        />
        {/* ))} */}
        <Route 
          path='/forgot-password'
          component={ForgotPassword}
        />
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
