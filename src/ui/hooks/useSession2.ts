// import { hasCookie } from "cookies-next";
import useMeData from "./useMeData";
import TUser from "../types/TUser";
import { useEffect, useState } from "react";

type ReturnType = {
  status: 'UNAUTHENTICATED',
  me: null
} | {
  status: 'LOADING',
  me: null
} | {
  status: 'AUTHENTICATED',
  me: TUser
}

/**
 * Use this hook to check whether user is logged in or not!!
 */
export default function useSession2(): ReturnType {

  const [cookieExist, setCookieExist] = useState<boolean>();

  /**
   * `useEffect` is used here because the first render will be on server
   * and in that case `hasCookie` will return false even if there is cookie there
   * but on client hydration `hasCookie` will return true if user is logged in.
   * This will lead to server-client hydration mismatch.
   */
  useEffect(() => {
    const jwt = localStorage.getItem("cb_auth");
    // setCookieExist(hasCookie('cb_auth'));
    if(jwt) setCookieExist(true);
    else setCookieExist(false)
  }, [])

  const meQuery = useMeData({ enabled: cookieExist });
// console.log('query', meQuery);
  if (meQuery.isLoading || meQuery.isIdle || cookieExist === undefined) {
    return {
      status: 'LOADING',
      me: null
    }
  }

  if (cookieExist === false || meQuery.isError) {
    return {
      status: 'UNAUTHENTICATED',
      me: null
    }
  }

  return {
    status: 'AUTHENTICATED',
    me: meQuery.data
  }
}