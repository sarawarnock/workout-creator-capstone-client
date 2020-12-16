import React from 'react';

export default function StartExercise(props) {
    const { currentStep, exercise } = props;
    console.log('currentStep', currentStep);
    console.log('exercise', exercise);

    return (
        <>
            <div className="flex-cnt">
                <button className="la"
                    onClick={props.clickPrev}>
                    <span className="arrow left-arrow"></span>
                </button>

                <h2 className="cap">{exercise.title}</h2>

                <button className="ra"
                    onClick={props.clickNext}>
                    <span className="arrow right-arrow"></span>
                </button>
            </div>
            <div className="ex-cont">
                <h3 className="ex-desc cap left">{exercise.description}</h3>
                <h3 className="ex-reps cap">{exercise.exercise_reps}x</h3>
            </div>
        </>
    )
};