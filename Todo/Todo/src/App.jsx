import { useState, useRef } from 'react'
import './App.css'

function App() {
  const [items, setItems] = useState([
    { id: 1, text: 'Gym', completed: false },
    { id: 2, text: 'Study', completed: false },
    { id: 3, text: 'Work', completed: false },
  ])
  const [value, setValue] = useState('')
  const inputRef = useRef(null)

  const addItem = () => {
    const text = value.trim()
    if (!text) return
    const id = Date.now()
    setItems(prev => [{ id, text, completed: false }, ...prev])
    setValue('')
    inputRef.current?.focus()
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') addItem()
  }

  const toggle = (id) => {
    setItems(prev => prev.map(it => it.id === id ? { ...it, completed: !it.completed } : it))
  }

  const remove = (id) => {
    setItems(prev => prev.filter(it => it.id !== id))
  }

  return (
    <div className="todo-page">
      <main className="todo-container" role="main">
        <section className="todo-card" aria-labelledby="todo-heading">
          <header className="card-head">
            <h1 id="todo-heading">To‑Do</h1>
            <p className="lead">Plan your day — black & light purple theme</p>
          </header>

          <div className="add-row">
            <input
              ref={inputRef}
              className="add-input"
              value={value}
              onChange={e => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Add a task (e.g. Read, Walk)"
              aria-label="New to-do"
            />
            <button className="ok-btn" onClick={addItem} aria-label="Add task">OK</button>
          </div>

          <ul className="todo-list" aria-live="polite">
            {items.map(item => (
              <li className="todo-item" key={item.id}>
                <label className="item-left">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggle(item.id)}
                    aria-label={`Mark ${item.text} complete`}
                  />
                  <span className={`item-text ${item.completed ? 'done' : ''}`}>{item.text}</span>
                </label>
                <button className="remove" onClick={() => remove(item.id)} aria-label={`Remove ${item.text}`}>✕</button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}

export default App
