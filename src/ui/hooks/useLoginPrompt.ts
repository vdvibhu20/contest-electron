import {  useLocation } from "react-router-dom";

export default function useLoginPrompt() {
  // const navigate = useNavigate();
  const location = useLocation(); // Replaces `router.asPath`

  const showLoginPrompt = () => {
    const loginPrompt = document.getElementsByTagName("cb-login-signup")[0];

    if (loginPrompt) {
      loginPrompt.classList.remove("hide-cb-login-signup-prompt");
    }

    localStorage.setItem("cb_redirect_code_gym", location.pathname);
  };

  return { showLoginPrompt };
}
