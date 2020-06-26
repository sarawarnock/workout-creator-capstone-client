import React from 'react';
import './App.css';
import LandingPage from './landing-page'
import Navbar from './navbar'
import PersonalizedHomePage from './personalized-home-page'
import PastWorkouts from './past-workouts'
import CreateNewWorkout from './create-new-workout'
import NewWorkoutCreated from './new-workout-created'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <LandingPage />
        <Navbar />
        <PersonalizedHomePage />
        <PastWorkouts />
        <CreateNewWorkout />
        <NewWorkoutCreated />
      </div>
    );
  }
}

export default App;
