import { Link } from 'react-router-dom';

export default function NavBar({ contentId, contestId }: { contentId: string; contestId: string }) {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="text-lg font-bold">My Electron App</div>
      <div className="flex gap-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to={`/contests/${contestId}/attempt/${contentId}`} className="hover:underline">Attempt</Link>
      </div>
    </nav>
  );
}