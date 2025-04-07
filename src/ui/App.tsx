import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';


// import NavBar from './components/Navbar';
import { Home } from './pages/Home';

import { QueryClient, QueryClientProvider } from 'react-query';
import Contests from './pages/Contests';
import ContestAttemptPage from './pages/Contest';

function App() {
  const [contentId, setContentId] = useState('');
  const [contestId, setContestId] = useState('');
  // const handleCloseApp = () => {

  //   window.electron.closeApp(); 
  // };
 

  window.electron.getData()

  useEffect(() => {
    console.log(`Generated URL: /contests/${contestId}/attempt/${contentId}`);
    window.electron.onDeepLinkData((data: { cb_auth?: string; contestId?:string,contentId?:string }) => {
      console.log('deep link data', data)
      localStorage.setItem('cb_auth', data.cb_auth || "")
      localStorage.setItem('contestId', data.contestId|| "")
      localStorage.setItem('contentId', data.contentId|| "")
      setContentId(data.contentId || '');
      setContestId(data.contestId || '');

    })
  },[contestId,contentId])

  const queryClient=new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      {/* <button
  onClick={handleCloseApp}
  className="fixed top-4 right-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-200"
>
  x
</button> */}
        {/* <NavBar contentId={contentId} contestId={contestId} /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={`/contests/:contestId`} element={<Contests />} />

        <Route path="/contests/:contestId/attempt/:contentId" element={<ContestAttemptPage/>} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App
