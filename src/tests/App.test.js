import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { BrowserRouter } from 'react-router-dom'
import App from '../app'
import CreateNewWorkout from '../create-new-workout'
import PastWorkouts from '../past-workouts'
import ViewPastWorkout from '../view-past-workout'

const testWorkoutsArray = [
  {
    id: 1,
    total_length: 10,
    user_id: 1,
    workout_type: 'EMOM',
    workouts_name: 'Test workout'
  },
  {
    id: 2,
    total_length: 15,
    user_id: 1,
    workout_type: 'AMRAP',
    workouts_name: 'Test workout 2'
  }
]

const testWorkoutDetailsArray = [
  {
    description: 'Test description',
    exercise_reps: 10,
    exercises_id: 1,
    title: 'test title',
    workouts_id: 1
  },
  {
    description: 'Test description',
    exercise_reps: 10,
    exercises_id: 2,
    title: 'test title',
    workouts_id: 1
  }
]

const params =  () => {}
const goBack = () => {}

describe('Workout Creator app', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('New Workout component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CreateNewWorkout />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<CreateNewWorkout />)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
})

describe('Past Workouts componenet', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter history={goBack}>
        <PastWorkouts appSavedWorkouts={testWorkoutsArray} match= { params }  />
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(
        <BrowserRouter history={goBack}>
          <PastWorkouts appSavedWorkouts={testWorkoutsArray} match={ params } />
        </BrowserRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
})

describe('View Past Workouts componenet', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter >
        <ViewPastWorkout appSavedWorkoutDetails={testWorkoutDetailsArray} history={goBack} match={{ params }} />
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <ViewPastWorkout appSavedWorkoutDetails={testWorkoutDetailsArray} history={goBack} match={{ params }} />
        </BrowserRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});