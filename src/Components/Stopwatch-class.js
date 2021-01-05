import React, { Component } from "react";
import WorkOutContext from "../context";

export default class StopwatchClass extends Component {
    static contextType = WorkOutContext;

    componentDidMount() {
        const { total_length } = this.props;
        this.context.set_total_length(total_length);
        this.context.setTime(0, 60, total_length);
        console.log('context', this.context);
    }

    render() {
        const { time, status, total_length  } = this.context;
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
                            ?   <button onClick={this.context._start}
                                        id="start">START</button>
                            :   ""
                        }
                        { (status === 1)
                            ?   <><button onClick={this.context._pause}
                                          id="pause">PAUSE</button>
                                <button onClick={this.context._reset}
                                        id="reset">RESET</button></>
                            : ""
                        }
                        { (status === 2)
                            ?   <><button onClick={this.context._resume}
                                          id="pause">RESUME</button>
                                <button onClick={this.context._reset}
                                        id="reset">RESET</button></>
                            :   ""
                        }
                    </div>
                    <h5>
                    <span>
                        { total_length }
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
                        ?   <button onClick={this.context._start}
                                    id="start">START</button>
                        :   ""
                    }
                    { (status === 1)
                        ?   <><button onClick={this.context._pause}
                                      id="pause">PAUSE</button>
                            <button onClick={this.context._reset}
                                    id="reset">RESET</button></>
                        : ""
                    }
                    { (status === 2)
                        ?   <><button onClick={this.context._resume}
                                      id="pause">RESUME</button>
                            <button onClick={this.context._reset}
                                    id="reset">RESET</button></>
                        :   ""
                    }
                </div>
            </div>
        </>)
    }
}