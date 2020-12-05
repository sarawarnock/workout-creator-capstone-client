For getting the logged in users info without their password and email I set up a seperate table called "Authors". This would be used to send back the user's info such as id and username without the password to their account.

getLoggedInAuthor() {
        return fetch(`${config.API_ENDPOINT}/authors/user/loggedin`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
        .then(res => 
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()    
        );
},