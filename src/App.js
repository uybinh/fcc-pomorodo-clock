import React, { Component } from "react"
import "./App.css"

function capitalize(string) {
  const stringArray = string.split("")
  return [stringArray[0].toUpperCase()].concat(stringArray.slice(1)).join("")
}

function formatTime(time) {
  const second = String(time % 60).padStart(2, "0")
  const min = String(Math.floor(time / 60)).padStart(2, "0")
  return `${min}:${second}`
}

class Controller extends Component {
  render() {
    const controllerStyle = {}
    const buttonStyle = {}
    const name = this.props.name
    return (
      <div style={controllerStyle} id={`${name}-control`}>
        {/* Label */}
        <div id={`${name}-label`}>{`${capitalize(name)} Length`}</div>

        {/* Increase */}
        <div
          onClick={this.props.onIncrease}
          style={buttonStyle}
          id={`${name}-increment`}
        >
          <i className="fas fa-arrow-alt-circle-up" />
        </div>

        {/* Length display */}
        <div id={`${name}-length`}>{this.props.length / 60}</div>

        {/* Decrease */}
        <div
          onClick={this.props.onDecrease}
          style={buttonStyle}
          id={`${name}-decrement`}
        >
          <i className="fas fa-arrow-alt-circle-down" />
        </div>
      </div>
    )
  }
}

class Button extends Component {
  render() {
    const style = {
      cursor: "pointer"
    }
    return (
      <div
        className="button"
        style={style}
        onClick={this.props.onClick}
        id={this.props.id}
      >
        {this.props.name}
      </div>
    )
  }
}

class TimeDisplay extends Component {
  render() {
    const style = {}
    const timeLeft = this.props.timeLeft
    style.color = timeLeft < 60 ? "red" : "inherit"
    return (
      <div id="timer" style={style}>
        <div id="timer-label">{this.props.label}</div>
        <div id="time-left">{formatTime(timeLeft)}</div>
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.defaultState = {
      breakLength: 5 * 60,
      sessionLength: 25 * 60,
      isCounting: false,
      isBreak: false,
      timeLeft: 25 * 60,
      countID: null
    }
    this.state = {
      breakLength: 5 * 60,
      sessionLength: 25 * 60,
      isCounting: false,
      isBreak: false,
      timeLeft: 25 * 60,
      countID: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.startStop = this.startStop.bind(this)
    this.reset = this.reset.bind(this)
    this.count = this.count.bind(this)
  }

  handleChange(type, property) {
    const condition = {
      increase: this.state[property] >= 3600,
      decrease: this.state[property] < 120
    }
    const delta = {
      increase: +60,
      decrease: -60
    }
    if (this.state.isCounting || condition[type]) return
    const length = this.state[property] + delta[type]
    this.setState({ [property]: length })
    this.setTimeLeft(property, length)
  }

  setTimeLeft(property, time) {
    if (property === "sessionLength") {
      this.setState({ timeLeft: time })
    }
  }

  reset() {
    this.state.isCounting && this.startStop()
    this.stopBuzz()
    this.setState(this.defaultState)
  }

  count() {
    if (this.state.timeLeft === 0) {
      this.buzz()
      this.changeTimer()
      return
    }
    this.setState({
      timeLeft: this.state.timeLeft - 1,
      isCounting: true
    })
  }

  changeTimer() {
    this.startStop()
    const timeLeft = this.state.isBreak
      ? this.state.sessionLength
      : this.state.breakLength
    this.setState({
      isBreak: !this.state.isBreak,
      timeLeft
    })
    this.startStop()
  }

  startStop() {
    if (this.state.isCounting) {
      this.setState({
        isCounting: false,
        countID: clearInterval(this.state.countID)
      })
    } else {
      this.setState({
        isCounting: true,
        countID: setInterval(this.count, 1000)
      })
    }
  }

  buzz() {
    this.audioBeep.currentTime = 0
    this.audioBeep.play()
  }

  stopBuzz() {
    this.audioBeep.pause()
    this.audioBeep.currentTime = 0
  }

  render() {
    const timeLabel = this.state.isBreak ? "Break" : "Session"
    return (
      <div className="container">
        <h1>FCC Pomorodo Clock</h1>
        <TimeDisplay label={timeLabel} timeLeft={this.state.timeLeft} />

        <div className="buttons-wrapper">
          <Button
            id="start_stop"
            name={[
              <i className="fas fa-play" />,
              <i className="fas fa-stop" />
            ]}
            onClick={this.startStop}
          />
          <Button
            id="reset"
            name={<i className="fas fa-redo-alt" />}
            onClick={this.reset}
          />
        </div>

        <div className="controllers-wrapper">
          <Controller
            name="break"
            length={this.state.breakLength}
            onIncrease={() => this.handleChange("increase", "breakLength")}
            onDecrease={() => this.handleChange("decrease", "breakLength")}
          />
          <Controller
            name="session"
            length={this.state.sessionLength}
            onIncrease={() => this.handleChange("increase", "sessionLength")}
            onDecrease={() => this.handleChange("decrease", "sessionLength")}
          />
        </div>

        <audio
          id="beep"
          preload="auto"
          src="https://goo.gl/65cBl1"
          ref={audio => (this.audioBeep = audio)}
        />
      </div>
    )
  }
}

export default App
