import React, { useState } from 'react';
import bell from "../Sounds/bellcrush_E_minor.wav";

export default function StopWatch(props) {
    const { length } = props;
    const [time, setTime] = useState({ ms: 0, sec: 60, min: length });
    const [interv, setInterv] = useState();

    console.log('interv', interv);
    // status for hiding start button
    // 0 = Not started, 1 = Started, 2 = Paused
    const [status, setStatus] = useState(0);

    let updatedMS = time.ms, updatedSec = time.sec, updatedMin = time.min;

    const playSound = () => {
        const audio = new Audio(bell);
        return audio.play();
    }

    const _start = () => {
        _run();
        setStatus(1);
        setInterv(setInterval(_run, 10));
        playSound();
    };

    const _run = () => {
        if (updatedSec === 0) {
            updatedSec = 60;
            updatedMin--;
            props.updateMin();
            props.clickNext();
            playSound();
            console.log('still running...');
        }
        if (updatedMS === 100) {
            updatedMS = 0;
            updatedSec--;
        }
        if (updatedMin === 0) {
            _stop();
        }
        updatedMS++;
        return setTime({ ms: updatedMS, sec: updatedSec, min: updatedMin });
    };

    const _pause = () => {
        console.log('running pause stopwatch');
        clearInterval(interv);
        setStatus(2);
    };

    const _resume = () => _start();

    const _reset = () => {
        console.log('running reset stopwatch');
        clearInterval(interv);
        setStatus(0);
        setTime({ ms: 0, sec: 60, min: length });
    };

    // call reset once to stop at end of workout
    const once = function(fn, context) {
        let result;
        return function() {
            if(fn) {
                result = fn.apply(context || this, arguments);
                fn = null;
            }
            return result;
        };
    }

    const _stop = once(function() {
        console.log('running stop');
        _reset();
    });

    if (time.min > 1) {
        return (<>
            <div className="sw-cont">
                <h4>
                    <span>
                        { (time.sec >= 10) ? time.sec : "0" + time.sec }
                    </span>
                </h4>
                <div className="btn-cont">
                    { (status === 0)
                        ?   <button onClick={_start}
                                id="start">START</button>
                        :   ""
                    }
                    { (status === 1)
                        ?   <><button onClick={_pause}
                                id="pause">PAUSE</button>
                            <button onClick={_reset}
                                id="reset">RESET</button></>
                        : ""
                    }
                    { (status === 2)
                        ?   <><button onClick={_resume}
                                    id="pause">RESUME</button>
                            <button onClick={_reset}
                                id="reset">RESET</button></>
                        :   ""
                    }
                </div>
                <h5>
                    <span>
                        { time.min }
                    </span>
                    <span> minutes</span>
                </h5>
            </div>
        </>)
    }
    return (<>
            <div className="sw-cont">
                <h4>
                    <span>
                        { (time.sec >= 10) ? time.sec : "0" + time.sec }
                    </span>
                </h4>
                <div className="btn-cont">
                    { (status === 0)
                        ?   <button onClick={_start}
                                id="start">START</button>
                        :   ""
                    }
                    { (status === 1)
                        ?   <><button onClick={_pause}
                                id="pause">PAUSE</button>
                            <button onClick={_reset}
                                id="reset">RESET</button></>
                        : ""
                    }
                    { (status === 2)
                        ?   <><button onClick={_resume}
                                    id="pause">RESUME</button>
                            <button onClick={_reset}
                                id="reset">RESET</button></>
                        :   ""
                    }
                </div>
            </div>
        </>)
}