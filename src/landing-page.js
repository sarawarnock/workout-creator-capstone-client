import React from 'react';
import { Link } from 'react-router-dom'

export default class LandingPage extends React.Component {
  render() {
    return (
      <main className="main">
        <h2>Create a metcon workout</h2>
        <div className="landing-text">
          <p>What is metcon? Metcon is short for metabolic conditioning a term that incorporates short bouts of higher-intensity training designed to increase metabolic demand and increase energy usage.</p>
          <p>1. Create your own metabolic-conditioning workout</p>
          <p>2. Choose what muscle groups you want to work, the duration of your workout, and a unique workout with instructions will be created.</p> 
          <p>3. Create an account to save your workouts and keep track of your progress!</p>
        </div>
        <Link to="/create-workout"
          className="try-it-link">Let's try it</Link>
        </main>
    );
  }
}