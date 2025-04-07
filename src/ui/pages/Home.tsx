import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const contestId = localStorage.getItem("contestId");
  const contentId = localStorage.getItem("contentId");
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-dark-3 text-white">
      <h1 className="text-3xl font-semibold mb-6">Ready to Start?</h1>
      <p className="text-lg mb-4">Click on <span className="font-medium text-primary">Attempt</span> to begin your contest.</p>
      <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-xl text-lg transition duration-200"
      onClick={() => {
        navigate(`/contests/${contestId}/attempt/${contentId}`)
      }}>
        Attempt
      </button>
    </div>
  );
};
