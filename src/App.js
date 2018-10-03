import React, { Component } from "react"
import "./App.css"

function capitalize(string) {
  const stringArray = string.split("")
  return [stringArray[0].toUpperCase()].concat(stringArray.slice(1)).join("")
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
        <div id={`${name}-length`}>{this.props.length}</div>

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
        style={style}
        onClick={() => console.log("click button")}
        id={this.props.id}
      >
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
        <div id="time-left">{timeLeft}</div>
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      isCounting: false,
      isBreak: false,
      timeLeft: 25 * 60
    }
    this.increase = this.increase.bind(this)
    this.decrease = this.decrease.bind(this)
  }

  increase(property) {
    this.setState({
      [property]: this.state[property] + 1
    })
  }
  decrease(property) {
    if (this.state[property] < 2) return
    this.setState({
      [property]: this.state[property] - 1
    })
  }

  reset() {}

  start() {}

  stop() {}

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
        <Button id="start_stop" name="Start/Stop" />
        <Button id="reset" name="Reset" />
      </div>
    )
  }
}

export default App
