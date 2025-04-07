import { useQuery, UseQueryOptions } from 'react-query';
import createAxiosClient from '../utils/axiosClient';
import IApiResponse from '../types/IApiResponse';
import ISubmission from '../types/ISubmission';

const client = createAxiosClient();

async function fetchSubmissionsByUserId(
	userId: string,
	queryObj: { [key: string]: unknown }
) {
	const response = await client.get<IApiResponse<ISubmission[]>>(
		`/submissions/user/${userId}`,
		{
			params: queryObj,
		}
	);
	return response.data;
}

type TQueryKey = ['submissions', 'user', string, ...unknown[]];

export default function useSubmissionDataByUserId(
	userId: string,
	queryObj: {
		[key: string]: unknown;
	} = {},
	options: UseQueryOptions<
		IApiResponse<ISubmission[]>,
		unknown,
		IApiResponse<ISubmission[]>,
		TQueryKey
	> = {}
) {
	return useQuery<
		IApiResponse<ISubmission[]>,
		unknown,
		IApiResponse<ISubmission[]>,
		TQueryKey
	>({
		queryKey: ['submissions', 'user', userId, queryObj],
		queryFn: () => fetchSubmissionsByUserId(userId, queryObj),
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		staleTime: Infinity,
		keepPreviousData: true,
		...options,
	});
}
