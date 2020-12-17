import React, { useState } from 'react';


export default function StopWatch(props) {
    const { workout, length } = props;
    console.log('stopwatch workout:', workout);

    const minutes = length

    const [time, setTime] = useState({ ms: 0, sec: 60, min: minutes });
    const [interv, setInterv] = useState();
    //const updatedMin = useState({ minutes })

    // status if you want to hide start button after stopping
    // 0 = Not started, 1 = Started, 2 = Paused
    const [status, setStatus] = useState(0);
    
    let updatedMS = time.ms, updatedSec = time.sec, updatedMin = time.min;

    const _start = () => {
        _run();
        setStatus(1);
        setInterv(setInterval(_run, 10));
    };

    const _run = () => {
        if (updatedSec === 0) {
            updatedSec = 60;
            updatedMin--;
            props.clickNext();
        }
        if (updatedMS === 100) {
            updatedMS = 0;
            updatedSec--;
        }
        if (updatedMin === 0) {
            props.renderFinished();
        }
        updatedMS++;
        return setTime({ ms: updatedMS, sec: updatedSec, min: updatedMin });
    };

    const _pause = () => {
        clearInterval(interv);
        setStatus(2);
    };

    const _reset = () => {
        clearInterval(interv);
        setStatus(0);
        setTime({ ms: 0, sec: 60, min: minutes });
    };

    const _resume = () => _start();

    return ( <>
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
        <h5>
            <span>
                { (time.min >= 10) ? time.min : "0" + time.min }
            </span>
            <span> minutes</span>
        </h5>
    </>)
}