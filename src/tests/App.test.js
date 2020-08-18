import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { BrowserRouter } from 'react-router-dom'
import App from '../app'
import CreateNewWorkout from '../create-new-workout'
import PastWorkouts from '../past-workouts'
import ViewPastWorkout from '../view-past-workout'

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
    ReactDOM.render(<PastWorkouts />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<PastWorkouts />)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
})

describe('View Past Workouts componenet', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ViewPastWorkout />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<ViewPastWorkout />)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});