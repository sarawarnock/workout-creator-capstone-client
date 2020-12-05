import React from 'react';
import CircleButton from './CircleButton/circle-button'
import { Link } from 'react-router-dom'
import WorkOutContext from './context';
import WorkoutApiService from './services/workout-api-service'

export default function ViewPastWorkout(props) {
  return (
    <div className="App">
      <main className="main">
        {props.appSavedWorkoutDetails.map(workoutDetail=> {
          if (props.match.params.workout_id == workoutDetail.workouts_id) {
            return (
              <div>
                <h2 key="reps">{workoutDetail.exercise_reps}</h2>
                <h3 key="title">{workoutDetail.title}</h3>
                <h3 key="desc">{workoutDetail.description}</h3>
              </div>
            )
          }})
          }            
            <CircleButton onClick={props.history.goBack}>
          Go Back
        </CircleButton>
        </main>
    </div>
  );
}

// export default class ViewPastWorkout extends React.Component {
//     static contextType = WorkOutContext

//     componentDidMount() {
//         console.log(this.context)
//         WorkoutApiService.getWorkoutDetails()
//             .then(this.context.setWorkout)
//     }

//     render() {
//         const workouts = this.context.state.workout
//         return (
//             <>
//                 <h2>Past Workouts</h2>
//                 <table className="workouts-table">
//                 <thead>
//                     <tr>
//                         <th className="tb-name">Name</th>
//                         <th className="tb-id">Workout ID</th>
//                         <th className="tb-view">View Workout</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                 {workouts.map(workout => {
//                     return (
//                     <tr>
//                     <td>{workout.workouts_name}</td>
//                     <td> {workout.id} </td>
//                     <td>
//                         <button>
//                         <Link
//                             to={`/past-workouts/${workout.id}`}
//                         >
//                             View
//                         </Link>
//                         </button>
//                     </td>
//                     </tr>
//                 )})}
//                 </tbody>
//                 </table>
//             </>
//         )
//     }
// }
