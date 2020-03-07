import React,{ Component } from "react"

import "./TimeToReact.css"

class TimeToReact extends Component {
    
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

    render(){
        return <div className="d-flex align-items-center justify-content-center h-100">
            <div>
                <div className="catchy-text">Its Time To <span className="primary-color">React</span></div>
                <div className="time">{this.state.currentTime.toLocaleTimeString()}</div>
            </div>
        </div>
    }
}

export default TimeToReact;