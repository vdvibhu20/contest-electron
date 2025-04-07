import { useState, useEffect } from 'react';
// import Cookies from "js-cookie";

export default function useSession() {
	const [status, setStatus] = useState<
		'NOT_AUTHENTICATED' | 'AUTHENTICATED' | 'LOADING'
	>('LOADING');

	useEffect(() => {

		const jwt = localStorage.getItem("cb_auth");
		if (jwt) setStatus('AUTHENTICATED');
		else setStatus('NOT_AUTHENTICATED');
	}, []);

	return { status };
}
