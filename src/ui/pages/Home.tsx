import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const handleCloseApp = () => {
  localStorage.removeItem("contestId");
  localStorage.removeItem("contentId");
  localStorage.removeItem("cb_auth");
  window.electron.closeApp();
};

export const Home = () => {
  const navigate = useNavigate();
  const [contestId, setContestId] = useState<string | null>(localStorage.getItem("contestId"));
  const [contentId, setContentId] = useState<string | null>(localStorage.getItem("contentId"));
  const [cb_auth, setCbAuth] = useState<string | null>(localStorage.getItem("cb_auth"));
  useEffect(() => {
    setContestId(localStorage.getItem("contestId"));
    setContentId(localStorage.getItem("contentId"));
    setCbAuth(localStorage.getItem("cb_auth"));
  }, []);

  const hasValidData = contestId!="" && contentId!="" && cb_auth!="";

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-dark-3 text-white text-center p-4">
      <h1 className="text-3xl font-semibold mb-6">
        {hasValidData ? "Ready to Start?" : "App is working fine!! "}
      </h1>

      <p className="text-lg mb-6 max-w-md">
        {hasValidData ? (
          <>
            Click on{" "}
            <span className="font-medium text-primary">Attempt</span> to begin
            your contest.
          </>
        ) : (
          <>
            If you want to start a contest, please visit the{" "}
            <a
              href="https://codeskiller.codingblocks.com/contests/live?offset=0" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:text-primary/80"
            >
              Contests Page at Coding Blocks
            </a>
            .
          </>
        )}
      </p>

      {hasValidData && (
        <button
          className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-xl text-lg transition duration-200 mb-4"
          onClick={() => {
    
            navigate(`/contests/${contestId}/attempt/${contentId}`);
          }}
        >
          Attempt
        </button>
      )}

      <button
        onClick={handleCloseApp}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl text-lg transition duration-200"
      >
        Close App
      </button>
    </div>
  );
};
