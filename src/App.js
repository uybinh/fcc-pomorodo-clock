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
    const controllerStyle = {
      width: "200px",
      height: "auto"
    }
    const buttonStyle = {
      width: "50%",
      display: "inline-block",
      cursor: "pointer"
    }
    const name = this.props.name
    return (
      <div style={controllerStyle} id={`${name}-control`}>
        {/* Label */}
        <div id={`${name}-label`}>{`${capitalize(name)} length`}</div>

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
      <div style={style} onClick={this.props.onClick} id={this.props.id}>
        {this.props.name}
      </div>
    )
  }
}

class TimeDisplay extends Component {
  render() {
    const style = {
      height: "auto"
    }
    const timeLeft = this.props.timeLeft
    return (
      <div style={style}>
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
      sessionLength: 5 * 60,
      isCounting: false,
      isBreak: false,
      timeLeft: 300,
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
    this.increase = this.increase.bind(this)
    this.decrease = this.decrease.bind(this)
    this.startStop = this.startStop.bind(this)
    this.reset = this.reset.bind(this)
  }

  increase(property) {
    if (this.state.isCounting || this.state[property] > 3600) return
    const length = this.state[property] + 60
    const isBreak = property === "breakLength" ? true : false
    this.setState({
      [property]: length,
      timeLeft: length,
      isBreak
    })
  }
  decrease(property) {
    if (this.state.isCounting || this.state[property] < 2) return
    const length = this.state[property] - 60
    this.setState({
      [property]: length,
      timeLeft: length
    })
  }

  reset() {
    if (this.state.isCounting) {
      this.startStop()
    }
    this.setState(this.defaultState)
  }

  count() {
    return setInterval(() => {
      if (this.state.timeLeft === 0) {
        this.startStop()
        const timeLeft = this.state.isBreak
          ? this.state.sessionLength
          : this.state.breakLength
        this.setState({
          isBreak: !this.state.isBreak,
          timeLeft
        })
        this.startStop()
        return
      }
      this.setState({
        timeLeft: this.state.timeLeft - 1,
        isCounting: true
      })
    }, 10)
  }

  startStop() {
    if (this.state.isCounting) {
      clearInterval(this.state.countID)
      this.setState({
        isCounting: false
      })
      return
    }
    this.setState({
      countID: this.count()
    })
  }

  render() {
    return (
      <div className="container">
        <Controller
          name="break"
          length={this.state.breakLength}
          onIncrease={e => this.increase("breakLength")}
          onDecrease={e => this.decrease("breakLength")}
        />
        <Controller
          name="session"
          length={this.state.sessionLength}
          onIncrease={e => this.increase("sessionLength")}
          onDecrease={e => this.decrease("sessionLength")}
        />
        <TimeDisplay label="Time" timeLeft={this.state.timeLeft} />
        <Button id="start_stop" name="Start/Stop" onClick={this.startStop} />
        <Button id="reset" name="Reset" onClick={this.reset} />
      </div>
    )
  }
}

export default App
