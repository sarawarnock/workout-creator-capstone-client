import React from 'react';
import Login from './log-in'
import SignUp from './sign-up'

export default class LandingPage extends React.Component {
  render() {
  return (
    <div className="App">
      <p>Landing Page</p>
      <Login />
      <SignUp />
    </div>
  );
}
}