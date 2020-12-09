import React from 'react';
import WorkOutContext from './context';
import WorkoutApiService from './services/workout-api-service';

export default class ViewPastWorkout extends React.Component {
    static defaultProps = {
        match: { params: {} },
    }

    static contextType = WorkOutContext;

    componentDidMount() {
        const { workout_id } = this.props.match.params;
        this.context.clearError();
        // WorkoutApiService
    }

    render() {
      return (
        <></>
      )
    }
  }