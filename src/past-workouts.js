import React from 'react';
import ViewPastWorkout from './view-past-workout'

export default function PastWorkouts(props) {
  return (
    <div className="App">
      <p>Past Workouts</p>
      <main class="main">
            <h1>Past Workouts</h1>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>View Workout</th>
                </tr>
                <tr>
                    <th>Example Name: Workout 1</th>
                    <th>March 21, 2020</th>
                    <th>
                        <button>View</button>
                    </th>
                </tr>
            </table>
            <button>New Workout</button>
        </main>
      <ViewPastWorkout />
    </div>
  );
}
