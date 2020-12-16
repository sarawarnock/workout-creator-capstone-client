import React from 'react';
import Timer from 'react-compound-timer';

export default function Stopwatch() {
    return (
        <div>
            <Timer
                onStart={() => console.log('onStart hook')}
                onResume={() => console.log('onResume hook')}
                onPause={() => console.log('onPause hook')}
                onStop={() => console.log('onStop hook')}
                onReset={() => console.log('onReset hook')}
                startImmediately={false}
                initialTime={60000}
                direction="backward"
            > 
                {  ({start, resume, pause, stop, reset, timerState}) => {
                    <React.Fragment>
                        <div >
                            <Timer.Minutes /> minutes
                            <Timer.Seconds /> seconds
                            <Timer.Milliseconds /> milliseconds
                        </div>
                        <div className="timerState">{timerState}</div>
                        <br/>
                        <div className="sw-btns">
                            <button onClick={start}>Start</button>
                            <button onClick={pause}>Pause</button>
                            <button onClick={resume}>Resume</button>
                            <button onClick={stop}>Stop</button>
                            <button onClick={reset}>Reset</button>
                        </div>
                    </React.Fragment>
                }}
            </Timer>
        </div>
        
    )
}