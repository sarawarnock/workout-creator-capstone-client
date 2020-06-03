# Workout Creator Capstone Client

This app creates workouts based on user selected muscle group, time domain and workout type. 

## Working Prototype
You can access a working prototype of the React app here: https://legoinventory.herokuapp.com/ and Node app here: 


## User Stories
This app is for two types of users; a visitor, and a logged-in user

#### Landing Page
* as a visitor
* I want to understand what I can do with this app (or sign up, or log in)
* so I can decide if I want to use it

#### Sign Up
* as a visitor
* I want to register to use this app
* so I can create a workout

#### Create Account Page
* As a visitor
* I want to create a username and password
* So I can create my own account

#### Login Page
* As a user with an account
* I want to log in to my account
* So I can create a workout or view my saved workouts

#### Personal Home Page
* As a user with an account
* I want to have a personal homepage with buttons for “Saved Workouts” and “New Workout”
* So I can redo an old workout, or create a new workout

#### Saved Workouts Page
* As a user with an account
* I want to view my past workouts
* So I can use them again

#### New Workout
* As a user with an account
* I want to create a new workout → I want to choose the length and the body parts I want to work
* So I can have a complete workout

#### Current Workout
* As a user with an account
* I want to view my new workout and be able to edit the time domain and muscle groups
* So I can begin my workout!

#### Forgot Password
* As a user with an account
* I want to update/change my password when I forget it
* So that I can log back into my account



### Wireframes
Landing/Login Page 
:-------------------------:
![Landing/Login Page](/github-images/wireframes/sign-up-page.jpeg) 


## Screenshots
Landing/Login Page 
:-------------------------:
![Landing Page](/github-images/screenshots/landing-page.jpg)  


## Functionality
The app's functionality includes:
* Every User has the ability to create a workout 
* the form to choose and create a workout
    * inputs
        * time interval (3-5, 6-10, 11-15, 16-20)
        * workout repetition type (AMRAP (As Many Rounds As Possible), EMOM (Every Minute On the Minute), RFT (Rounds For Time))
        * muscle groups (arms, legs, back, chest, core, cardio)
    * output
        * workout id
        * set of exercises based on the workout repetition type (with the random time between the interval start and stop) and filtered by the muscle groups; and the numbers reps related to the total amount of time (except from the ENOMs)

## Business Objects (database structure)

* users
    * id
    * email
    * pass
    * frist_name
    * last_name

* exercises
    * id
    * title (varchar)
    * description (text)
    * is_arms (boolean: true or false)
    * is_legs (boolean: true or false)
    * is_back (boolean: true or false)
    * is_chest (boolean: true or false)
    * is_core (boolean: true or false)
    * is_cardio (boolean: true or false)

* workouts
    * id
    * user_id
    * workouts_name
    * total_legth (time)


* workout_details
    * id
    * workout_id
    * exercises_id
    * exercises_reps
    * exercises_reps_break


## Technology
* Front-End: HTML5, CSS3, JavaScript ES6, React
* Back-End: Node.js, Express.js, Mocha, Chai, RESTful API Endpoints, Postgres
* Development Environment: Heroku, DBeaver

## API Documentation
API Documentation details: 

## Responsive
App is built to be usable on mobile devices, as well as responsive across mobile, tablet, laptop, and desktop screen resolutions.

## Development Roadmap
This is v1.0 of the app, but future enhancements are expected to include:
* 

## How to run it
Use command line to navigate into the project folder and run the following in terminal

### Local Node scripts
* To install the node project ===> npm install
* To migrate the database ===> npm run migrate -- 1
* To run Node server (on port 8000) ===> npm run dev
* To run tests ===> npm run test

### Local React scripts
* To install the react project ===> npm install
* To run react (on port 3000) ===> npm start
* To run tests ===> npm run test

