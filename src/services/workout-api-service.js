import config from '../config';
import TokenService from './token-service-lf'

const WorkoutApiService = {
    getWorkoutsById() {
        console.log('fetching workouts by id..');
        let getWorkoutUrl = `${config.API_ENDPOINT}/workouts/user/loggedin`;
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

    getWorkoutDetails() {
        let getWorkoutDetailsUrl = `${config.API_ENDPOINT}/workoutdetails/workout/`;
        return fetch(getWorkoutDetailsUrl, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => {
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        })
    }
}

export default WorkoutApiService