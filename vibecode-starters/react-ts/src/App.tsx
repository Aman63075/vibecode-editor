import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', textAlign: 'center' }}>
      <h1>⚡ VibeCode React Playground</h1>
      <p>Edit <code>src/App.tsx</code> to start vibe coding!</p>
      <div style={{ margin: '2rem 0' }}>
        <button
          onClick={() => setCount((c) => c + 1)}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Count is {count}
        </button>
      </div>
      <p style={{ color: '#94a3b8' }}>Built with React + Vite + WebContainers</p>
    </div>
  )
}