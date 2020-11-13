import React from "react"
import ReactDOM from "react-dom"

/**
 * 自定义hooks
 * 函数开头必须使用小写的use
 */

function useNumber(init) {
  const [number, setNumber] = React.useState(init || 0)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setNumber(number + 1)
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [number])
  return number
}

function Counter() {
  const number = useNumber(1)
  return <div>{number}</div>
}

function Counter1() {
  const number = useNumber(2)
  return <div>{number}</div>
}

function render() {
  ReactDOM.render(
    <>
      <Counter />
      <Counter1 />
    </>,
    document.getElementById("root")
  )
}
render()
