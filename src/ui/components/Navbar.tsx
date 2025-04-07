import { Link } from 'react-router-dom';

export default function NavBar({ contentId, contestId }: { contentId: string; contestId: string }) {
  console.log(contentId, contestId)
  const handleCloseApp = () => {

    window.electron.closeApp(); 
  };
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="text-lg font-bold">My Electron App</div>
      <div className="flex gap-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to={`/contests/${contestId}`}>contest</Link>
        <Link to={`/contests/${contestId}/attempt/${contentId}`} className="hover:underline">Attempt</Link>
        <button
          onClick={handleCloseApp}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-full transition duration-200 shadow-md"
          title="Close App"
        >
          ✕
        </button>
      </div>
    </nav>
  );
}