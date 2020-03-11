import React, { Component } from "react";
import TimeToReact from "./TimeToReact/TimeToReact";
import Stopwatch from './Stopwatch/Stopwatch'

import "./App.css";

class App extends Component {

    render() {
        return <div className="container">
            {/* <TimeToReact /> */}
            <Stopwatch />
        </div>
    }
}

export default App;