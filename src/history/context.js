import React from "../react"
import ReactDOM from "../react-dom"
let ThemeContext = React.createContext(null)
let root = document.querySelector("#root")
class Header extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {value => (
          <div style={{ border: `5px solid ${value.color}`, padding: "5px" }}>
            header
            <Title />
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}
class Title extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {value => (
          <div style={{ border: `5px solid ${value.color}` }}>title</div>
        )}
      </ThemeContext.Consumer>
    )
  }
}
class Main extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {value => (
          <div
            style={{
              border: `5px solid ${value.color}`,
              margin: "5px",
              padding: "5px"
            }}
          >
            main
            <Content />
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}
class Content extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {value => (
          <div style={{ border: `5px solid ${value.color}`, padding: "5px" }}>
            Content
            <button
              onClick={() => value.changeColor("red")}
              style={{ color: "red" }}
            >
              红色
            </button>
            <button
              onClick={() => value.changeColor("green")}
              style={{ color: "green" }}
            >
              绿色
            </button>
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}

class Page extends React.Component {
  constructor(props) {
    super(props)
    this.state = { color: "red" }
  }
  changeColor = color => {
    this.setState({ color })
  }
  render() {
    let contextVal = { changeColor: this.changeColor, color: this.state.color }
    return (
      <ThemeContext.Provider value={contextVal}>
        <div
          style={{
            margin: "10px",
            border: `5px solid ${this.state.color}`,
            padding: "5px",
            width: 200
          }}
        >
          page
          <Header />
          <Main />
        </div>
      </ThemeContext.Provider>
    )
  }
}
ReactDOM.render(<Page />, root)
