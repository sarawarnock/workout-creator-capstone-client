import React from 'react';
import { Link } from 'react-router-dom';
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
      if (!TokenService.hasAuthToken()) {
          return (<div className={"container"}>
              <h2 className={'lt-h2'}>EMOM Workout Generator</h2>
              <div className="landing-text pad-bt-20">
                  <h3 className={"lt-h3"}>What is an EMOM?</h3>
                  <p>
                      EMOM stands for 'Every Minute On the Minute' - a burst style of workout
                      where you perform an exercise starting at the top of each minute and resting until the next minute.
                      Complete the amount of reps within the minute as fast as possible.
                  </p>
                  <p>
                      This style is a type of MetCon. MetCon is short for metabolic conditioning; a term that
                      incorporates short bouts of higher-intensity training designed to increase metabolic demand
                      and increase energy usage.
                  </p>
                  <ul className={"btmrg-40"}>
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
                  <Link className="try-it"
                        to='/sign-up'>
                      Let's try it &nbsp;&nbsp;&nbsp;&nbsp;<i className="fas fa-long-arrow-alt-right"></i>
                  </Link>
              </div>
          </div>);
      }
        return (<div className={"container"}>
            <h2 className={'lt-h2'}>EMOM Workout Generator</h2>
            <div className="landing-text">
                <h3 className={"lt-h3"}>What is an EMOM?</h3>
                <p>
                    EMOM stands for 'Every Minute On the Minute' - a burst style of workout
                    where you perform an exercise starting at the top of each minute and resting until the next minute.
                    Complete the amount of reps within the minute as fast as possible.
                </p>
                <p>
                    This style is a type of MetCon. MetCon is short for metabolic conditioning; a term that
                    incorporates short bouts of higher-intensity training designed to increase metabolic demand
                    and increase energy usage.
                </p>
            </div>
        </div>);
  }
}