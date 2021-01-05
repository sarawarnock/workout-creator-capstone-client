import React from 'react';
import WorkOutContext from '../context';
import WorkoutApiService from '../Services/workout-api-service';
import TokenService from "../Services/token-service";

export default class LandingPage extends React.Component {
  static contextType = WorkOutContext;

  componentDidMount() {
    this.context.clearError();
    if (TokenService.hasAuthToken()) {
      WorkoutApiService.getWorkoutsById()
        .then(this.context.setWorkOutsList)
        .catch(this.context.setError);
    }
  }

    render() {
    return (
        <div className="container">
            <h2 className="left lh">EMOM Creator</h2>
            <ul>
              <li className="left">
                <p>Sign up to create your own metabolic-conditioning workouts!</p>
              </li>
              <li className="left">
                <p>Save your workouts and keep track of your progress.</p>
              </li>
              <li className="left">
                <p>Select which muscle groups you would like to work and the duration of your workout,
                  and a unique workout with instructions will be created.</p>
              </li>
            </ul>
        </div>
    );
  }
}