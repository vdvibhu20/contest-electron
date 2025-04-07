
import { useNavigate } from "react-router-dom";



export default function NavBar({ contentId, contestId }: { contentId: string; contestId: string }): JSX.Element {
  const navigate = useNavigate();
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="text-lg font-bold">My Electron App</div>
      <div className="flex gap-4">
      <button
          onClick={() => navigate("/")}
          className="hover:text-gray-300"
        >Home</button>
        <button
        onClick={() => navigate(`/contests/${contestId}/attempt/${contentId}`)} className="hover:underline"
        >Attempt</button>
       
      </div>
    </nav>
  );
}
