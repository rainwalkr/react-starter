import React,{Component} from 'react'
import './Stopwatch.css'

class Stopwatch extends Component {

    constructor(props){
        super(props)
        this.state = {
            startTime:null,
            elapsedMS:0,
            pausedTime:null,
            status:'not-ticking'
        }

        this.start = this.start.bind(this)
        this.reset = this.reset.bind(this)
        this.toggle = this.toggle.bind(this)
    }

    tick() {
        this.setState({
            elapsedMS: new Date().getTime() - this.state.startTime.getTime()
        });
    }

    componentDidMount() {
        
    }

    startTicking(){
        this.interval = setInterval(() => this.tick(), 1)
    }

    start(){
        this.setState({
            startTime:new Date(),
            status:'ticking'
        })
        this.startTicking()
    }

    pause(){
        clearInterval(this.interval)
        this.setState({
            pausedTime:new Date(),
            status:'paused'
        })
        this.interval = null
    }

    resume(){
        let pausedMS = new Date().getTime() - this.state.pausedTime.getTime()
        this.setState({
            startTime: new Date(this.state.startTime.getTime() + pausedMS),
            pausedTime:null,
            status:'ticking'
        })
        this.startTicking()
    }

    toggle(){

        if (!this.state.startTime) {
            this.start();
        } else if (this.interval) {
            this.pause()
        } else {
            this.resume()
        }

    }

    reset(){
        clearInterval(this.interval)
        this.setState({
            startTime:null,
            elapsedMS:0,
            status:'not-ticking'
        })
    }

    msToTime(ms) {
        return new Date(ms).toISOString().slice(11, -2);
    }

    render(){    
        return <div className="d-flex align-items-center justify-content-center h-100">
            <div>
                <div className="countdown">{this.msToTime(this.state.elapsedMS)}</div>
                <div className="d-flex justify-content-center actions">
                    <button className="toggle-btn mr-35" onClick={this.toggle}>{this.state.status === 'ticking'? 'Pause':'Start'}</button>
                    <button className="reset-btn" onClick={this.reset} >Reset</button>
                </div>
            </div>
        </div>
    }

}

export default Stopwatch;