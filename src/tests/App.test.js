import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { BrowserRouter } from 'react-router-dom'
import App from '../app'
import Login from '../log-in'
import SignUp from '../sign-up'
import NotFound from '../not-found-page'
import CreateNewWorkout from '../create-new-workout'
import PastWorkouts from '../past-workouts'
import ViewPastWorkout from '../view-past-workout'
import PersonalizedHomePage from '../personalized-home-page'
import Navbar from '../navbar'
import Header from '../header'
import LandingPage from '../landing-page'

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

describe('Login component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(
      <BrowserRouter>
        <Login />
      </BrowserRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});

describe('Sign Up component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});

describe('Not Found component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});

describe('Header component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(
      <BrowserRouter>
        <Header />
      </BrowserRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});

describe('Navbar component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});

describe('Personal Home Page component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
    <BrowserRouter>
      <PersonalizedHomePage />
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(
      <BrowserRouter>
        <PersonalizedHomePage />
      </BrowserRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});

describe('Landing Page component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
    <BrowserRouter>
      <LandingPage />
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});