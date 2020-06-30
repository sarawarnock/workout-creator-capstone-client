import React from 'react';

export default class CreateNewWorkout extends React.Component {
  render() {
  return (
      <div className="App">
        <main class="main">
          <h1>Create New Workout</h1>
            <br />
            <h2>How long do you want to workout for?</h2>
                <button>Less than 5 minutes</button>
                <button>11-15 min</button>
                <button>16-20 min</button>
                <button>21-25 min</button>
                <button>26-30 min</button>
                <p class="error-msg">Must select one option</p>
            <br />
            <br />
            <h2>What muscle groups do you want to work?</h2>
                <button>Arms</button>
                <button>Legs</button>
                <button>Chest</button>
                <button>Back</button>
                <button>Core</button>
                <button>Cardio</button>
                <button>Advanced Movements</button>
                <p class="error-msg">Must select at least one option</p>
            <br />
            <br />
            <h2>What style of workout would you like?</h2>
                <button>EMOM (Every Minute On The Minute)</button>
                <button>AMRAP (As Many Rounds As Possible)</button>
                <button>RFT (Rounds for Rime)</button>
                <p class="error-msg">Must select one option</p>
            <br />
            <br />
            <button class="big-btn">GO!!</button>
        </main>
      </div>
    );
  }
}
