import React from 'react';
import WorkOutContext from './context';

export default class ViewPastWorkout extends React.Component {
    static defaultProps = {
        match: { params: {} },
    }

    static contextType = WorkOutContext;

    componentDidMount()

    render() {
      return (
        <></>
      )
    }
  }