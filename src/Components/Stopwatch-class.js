import React, { Component } from "react";
import WorkOutContext from "../context";

export default class StopwatchClass extends Component {
    static contextType = WorkOutContext;

    

    render() {
        console.log('context', this.context);
        const { time, status  } = this.context;
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
                            ?   <button onClick={this._start}
                                        id="start">START</button>
                            :   ""
                        }
                        { (status === 1)
                            ?   <><button onClick={this._pause}
                                          id="pause">PAUSE</button>
                                <button onClick={this._reset}
                                        id="reset">RESET</button></>
                            : ""
                        }
                        { (status === 2)
                            ?   <><button onClick={this._resume}
                                          id="pause">RESUME</button>
                                <button onClick={this._reset}
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
                        ?   <button onClick={this._start}
                                    id="start">START</button>
                        :   ""
                    }
                    { (status === 1)
                        ?   <><button onClick={this._pause}
                                      id="pause">PAUSE</button>
                            <button onClick={this._reset}
                                    id="reset">RESET</button></>
                        : ""
                    }
                    { (status === 2)
                        ?   <><button onClick={this._resume}
                                      id="pause">RESUME</button>
                            <button onClick={this._reset}
                                    id="reset">RESET</button></>
                        :   ""
                    }
                </div>
            </div>
        </>)
    }
}