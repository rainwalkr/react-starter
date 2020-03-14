import React, { Component } from "react";
import TimeToReact from "./TimeToReact/TimeToReact";
import Stopwatch from './Stopwatch/Stopwatch'

import "./App.css";

class App extends Component {

    constructor(props){
        super(props)
        this.state = {
            page:'time-to-react'
        };
        this.handleTextClick = this.handleTextClick.bind(this) 
    }

    handleTextClick = _ => {
        this.setState({
            page:'stopwatch'
        })
    }

    render() {
        let page
        if (this.state.page === 'time-to-react') {
            page = <TimeToReact onTextClicked={this.handleTextClick} />
        } else if (this.state.page === 'stopwatch') {
            page = <Stopwatch />
        }

        return <div className="container">
            {page}
        </div>
    }
}

export default App;