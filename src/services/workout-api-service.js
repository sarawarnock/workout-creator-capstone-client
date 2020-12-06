import React from 'react'
import config from '../config';
import TokenService from './token-service-lf'

const WorkoutApiService = {
    getWorkoutsById(id) {
        console.log(id)
        let getWorkoutUrl = `${config.API_ENDPOINT}/workouts/user/loggedin`;
        return fetch(getWorkoutUrl, {
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
            //map over the workouts by ID, returning each workout
            //so that we can get the individual workout details for that workout (including the exercises)  
    },

    // getLoggedInAuthor() {
    //     return fetch(`${config.API_ENDPOINT}/authors/user/loggedin`, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'authorization': `bearer ${TokenService.getAuthToken()}`,
    //         },
    //     })
    //     .then(res => 
    //         (!res.ok)
    //             ? res.json().then(e => Promise.reject(e))
    //             : res.json()    
    //     );
    // },

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