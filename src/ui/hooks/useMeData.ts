import { useQuery, UseQueryOptions } from 'react-query';
// import createAxiosClient from '../utils/axiosClient';

import TUser from '../types/TUser';
import axios, { AxiosResponse } from 'axios';
// const client = createAxiosClient();
import type IUser from '../types/IUser';
import type IApiResponse from '../types/IApiResponse';
export async function fetchMe() {
	const jwt = localStorage.getItem("cb_auth");
	const response:AxiosResponse<IApiResponse<IUser>> = await axios({
		method: 'get',
		url: `${import.meta.env.VITE_API_ENDPOINT}/users/me`,
		headers: {
			Authorization: `Jwt ${jwt}`,
		},
	});
	// const response = await client.get<IApiResponse<TUser>>('/users/me');
	// console.log('data',response.data.data);
	return response.data.data;
}

type TQueryKey = ['users', 'me'];

export default function useMeData(
	options: UseQueryOptions<TUser, unknown, TUser, TQueryKey> = {}
) {
	return useQuery<TUser, unknown, TUser, TQueryKey>({
		queryKey: ['users', 'me'],
		queryFn: fetchMe,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		staleTime: Infinity,
		keepPreviousData: true,
		enabled: true,
		retry: false,
		...options,
	});
}
