import React from 'react';

export default function NewWorkoutCreated(props) {
  return (
    <div className="App">
      <p>New Workout Created</p>
      <main class="main">
            <h1>New Workout</h1>
            <p>Here is your newest workout!</p>
            <h2>Time Domain</h2>
            <button>Chosen Time Domain</button>
            <h2>Muscle Groups</h2>
            <button>Chosen Muscle Groups</button>
            <h2>Workout Type</h2>
            <button>Chosen Workout Type</button>
            <br />
            <br />
            <div class="new-workout">
                <h2>Workout Name/Date</h2>
                <h3>Example: EMOM 9</h3>
                <p>Minute 1: 10 pushups</p>
                <p>Minute 2: 10 V ups</p>
                <p>Minute 3: 20 jumping lunges</p>
            </div>
        </main>
    </div>
  );
}

