import React, { useState } from 'react';


export default function StopWatch(props) {
    const { workout } = props;
    //console.log('stopwatch workout:', workout);

    // const minutes = length

    //const [time, setTime] = useState({ ms: 0, sec: 60, min: minutes });
    //const [interv, setInterv] = useState();
    //const finishedMin = useState({ minutes })

    // status if you want to hide start button after stopping
    // 0 = Not started, 1 = Started, 2 = Paused
    //const [status, setStatus] = useState(0);
    
    //let updatedMS = time.ms, updatedSec = time.sec, updatedMin = time.min;

    // const _start = () => {
    //     _run();
    //     setStatus(1);
    //     setInterv(setInterval(_run, 10));
    // };

    // const _run = () => {
    //     console.log({finishedMin})
    //     if (finishedMin === 0) {
    //         return props.renderFinished();
    //     }
    //     else if (updatedSec === 0) {
    //         updatedSec = 60;
    //         updatedMin--;
    //         props.clickNext();
    //     }
    //     else if (updatedMS === 100) {
    //         updatedMS = 0;
    //         updatedSec--;
    //     }
    //     else {
    //         updatedMS++;
    //     return setTime({ ms: updatedMS, sec: updatedSec, min: updatedMin });
    //     }
    // };

    // const _pause = () => {
    //     clearInterval(interv);
    //     setStatus(2);
    // };

    // const _reset = () => {
    //     clearInterval(interv);
    //     setStatus(0);
    //     setTime({ ms: 0, sec: 60, min: minutes });
    // };

    // const _resume = () => _start();

    return ( <>
        <div className="sw-cont">
            <h4>
                <span>
                    { (props.sec >= 10) ? props.sec : "0" + props.sec }
                </span>
            </h4>
            <div className="btn-cont">
                { (props.status === 0) 
                    ?   <button onClick={props._start}
                            id="start">START</button>
                    :   ""
                }
                { (props.status === 1)
                    ?   <><button onClick={props._pause}
                            id="pause">PAUSE</button>
                        <button onClick={props._reset}
                            id="reset">RESET</button></>
                    : ""
                }   
                { (props.status === 2)
                    ?   <><button onClick={props._resume}
                                id="pause">RESUME</button>
                        <button onClick={props._reset}
                            id="reset">RESET</button></>
                    :   ""
                }
                
            </div>
        </div>
        <h5>
            <span>
                { (props.min >= 10) ? props.min : "0" + props.min }
            </span>
            <span> minutes</span>
        </h5>
    </>)
}