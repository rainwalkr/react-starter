import React,{Component} from 'react'
import './Stopwatch.css'
import resetImage from './reset.svg';
import playImage from './play_arrow.svg'
import pauseImage from './pause.svg'

class Stopwatch extends Component {

    stopwatchElm;
    countdownElm;

    touchMoved=null;

    constructor(props){
        super(props)
        this.state = {
            startTime:null,
            elapsedMS:0,
            pausedTime:null,
            status:'not-ticking'
        }
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

    toggle = () => {

        if (!this.state.startTime) {
            this.start();
        } else if (this.interval) {
            this.pause()
        } else {
            this.resume()
        }

    }

    reset = _ => {
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

    msToFormattedTime(ms) {
        let time = new Date(ms).toISOString();
        if (ms < 60000) {          
            time = ms < 10000? time.slice(18, -2) : time.slice(17, -2);
        } else if (ms > 60000 && ms < 3600000) {
            time = ms < 600000? time.slice(15,-2) : time.slice(14, -2);
        } else {
            time = time.slice(11, -2);
        }
        return time;
    }

    componentDidMount() {
        this.stopwatchElm = document.getElementById('stopwatch')
        window.addEventListener('keydown', this.handleKeydown.bind(this));
        this.stopwatchElm.addEventListener('click', this.handleClick.bind(this));
        this.countdownElm = document.getElementById('countdown');
        this.countdownElm.addEventListener('touchstart',this.handleTouch.bind(this),true)
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeydown.bind(this));
        this.stopwatchElm.removeEventListener('click', this.handleClick.bind(this));
        this.countdownElm.removeEventListener('touchstart',this.handleTouch.bind(this),true)
    }

    handleKeydown(e) {
        switch (e.code) {
            case 'Space':
                this.toggle()
                break;

            case 'Enter':
                this.reset()
                break;

            default:
                break;
        }
    }

    handleClick(){
        this.toggle()
    }

    handleTouch(e){
        this.countdownElm.addEventListener('touchmove',(e) => {
            console.log('touchmove',e)
            this.touchMoved = true;
        },true);
        // this.countdownElm.addEventListener('touchcancel',(e) => {
        //     console.log('touchcancel',e)
        // },true);
        this.countdownElm.addEventListener('touchend', (e) => {
            if (this.touchMoved) {
                this.reset()
                this.touchMoved = null;
            }
        },true);
    }

    render(){    
        return <div id="stopwatch" className="d-flex align-items-center justify-content-center h-100">
            <div>
                <div id="countdown" className="countdown">{this.msToFormattedTime(this.state.elapsedMS)}</div>
                {/* <div className="d-flex justify-content-center actions">
                    <button className="toggle-btn mr-35" onClick={this.toggle}>
                        { this.state.status === 'ticking'? 
                            <img src={pauseImage}/> : <img src={playImage}/> }
                    </button>
                    <button className="reset-btn" onClick={this.reset} ><img src={resetImage} /></button>
                </div> */}
            </div>
        </div>
    }

}

export default Stopwatch;