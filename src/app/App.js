import React, { Component } from "react";

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentTime: new Date()
        }
    }

    tick() {
        this.setState({
            currentTime: new Date()
        });
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }


    render() {
        return <div>
            <h1>Time {this.state.currentTime.toLocaleTimeString()}</h1>
        </div>
    }
}

export default App;