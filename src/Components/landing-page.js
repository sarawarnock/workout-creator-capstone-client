import React from 'react';
import { Link } from 'react-router-dom'

export default class LandingPage extends React.Component {
  render() {
    return (
      <main className="main">
        <h2>Create An EMOM Style Workout</h2>
        <div className="landing-text">
          <p>What is an EMOM? EMOM stands for 'Every Minute On the Minute' - a style of workout 
              where you do a different exercise each minute (and repeat for a given number of minutes)! 
              This style is a type of MetCon. MetCon is short for metabolic conditioning; a term that 
              incorporates short bouts of higher-intensity training designed to increase metabolic demand 
              and increase energy usage.</p>
            <ul>
              <li>
                <p>Sign up to create your own metabolic-conditioning workouts!</p>
              </li>
              <li>
                <p>Save your workouts and keep track of your progress.</p>
              </li>
              <li>
                <p>Select which muscle groups you would like to work and the duration of your workout, 
                  and a unique workout with instructions will be created.</p> 
              </li>
            </ul>
        </div>
        {/* <Link to="/sign-up"
          className="try-it-link link">Let's try it</Link> */}
        </main>
    );
  }
}