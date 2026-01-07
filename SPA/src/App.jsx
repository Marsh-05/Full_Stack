
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <div className="counter-card" role="region" aria-label="Counter module">
        <h2 className="title">Counter</h2>

        <div className="display" aria-live="polite" aria-atomic="true">{count}</div>

        <div className="controls" role="group" aria-label="Counter controls">
          <button
            className="btn btn-decrement"
            onClick={() => setCount(c => c - 1)}
            aria-label="Decrease value"
          >
            −
          </button>

          <button
            className="btn btn-increment"
            onClick={() => setCount(c => c + 1)}
            aria-label="Increase value"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
