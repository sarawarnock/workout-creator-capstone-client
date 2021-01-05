import React from "react";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <h3 className=".sh3">Build<br/> Stronger<br/> Workout routines</h3>
            <h4 className="sh4">Create an EMOM Style workout</h4><br/>
            <h4 className="sh4">What is an EMOM?</h4><br/><br/>
            <p className="sp">
                EMOM stands for 'Every Minute On the Minute' - a burst style of workout
                where you perform an exercise starting at the top of each minute and resting until the next minute.
                Complete the amount of reps within the minute as fast as possible.
                <br/><br/>
                This style is a type of MetCon. MetCon is short for metabolic conditioning; a term that
                incorporates short bouts of higher-intensity training designed to increase metabolic demand
                and increase energy usage.
            </p>
        </div>
    )
}