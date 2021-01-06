import config from '../config';
import TokenService from './token-service'

const WorkoutApiService = {
    getWorkoutsById() {
        const getWorkoutUrl = `${config.API_ENDPOINT}/workouts/user/loggedin`;
        return fetch(getWorkoutUrl, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => 
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()    
        );
    },
    getWorkoutDetails(id) {
        const getWorkoutDetailsUrl = `${config.API_ENDPOINT}/workoutdetails/workout/${id}`;
        return fetch(getWorkoutDetailsUrl, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => 
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
    },
    postWorkout(workout) {
        return fetch(`${config.API_ENDPOINT}/workouts`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(workout),
          })
            // if the api returns data ...
            .then(res => {
                if (!res.ok) {
                    throw new Error('Something went wrong, please try again later.')
                }
                 // ... convert it to json
                 return res.json()
            })
            .catch(err => {
              this.setState({
                error: err.message
            })
          })
    },
    deleteWorkout(id) {
        return fetch(`${config.API_ENDPOINT}/workouts/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        });
    }
}

export default WorkoutApiService