import { useEffect, useState } from 'react'


import './App.css'

function App() {
  const handleCloseApp = () => {

    window.electron.closeApp(); 
  };
  const [count, setCount] = useState(0)

  window.electron.getData()

  useEffect(() => {

    window.electron.onDeepLinkData((data: { cb_auth?: string; contestId?:string,contentId?:string }) => {
      console.log('deep link data', data)
      localStorage.setItem('cb_auth', data.cb_auth || "")
      localStorage.setItem('contestId', data.contestId|| "")
      localStorage.setItem('contentId', data.contentId|| "")
    })
  },[])
  return (
    <>
      <button onClick={handleCloseApp} style={{ marginTop: '10px' }}>
          Close App
        </button>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
