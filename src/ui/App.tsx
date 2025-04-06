import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';

import './App.css'
import NavBar from './components/Navbar';
import { Home } from './pages/Home';
import Contest from './pages/Contest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const [contentId, setContentId] = useState('');
  const [contestId, setContestId] = useState('');
  const handleCloseApp = () => {

    window.electron.closeApp(); 
  };
 

  window.electron.getData()

  useEffect(() => {

    window.electron.onDeepLinkData((data: { cb_auth?: string; contestId?:string,contentId?:string }) => {
      console.log('deep link data', data)
      localStorage.setItem('cb_auth', data.cb_auth || "")
      localStorage.setItem('contestId', data.contestId|| "")
      localStorage.setItem('contentId', data.contentId|| "")
      setContentId(data.contentId || '');
      setContestId(data.contestId || '');

    })
  },[])

  const queryClient=new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <button onClick={handleCloseApp} style={{ marginTop: '10px' }}>
          Close App
        </button>
        <NavBar contentId={contentId} contestId={contestId} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={`/contests/:contestId/attempt/:contentId`} element={<Contest contentId={contentId} contestId={contestId} />} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App
