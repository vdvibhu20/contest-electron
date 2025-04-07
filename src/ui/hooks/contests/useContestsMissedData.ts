import createAxiosClient from '../../utils/axiosClient';
import { useQuery, UseQueryOptions } from 'react-query';
import IApiResponse from '../../types/IApiResponse';
import IContest from '../../types/IContest';

interface IData extends IContest {}

const client = createAxiosClient();

async function fetchData(
	userId: string,
	queryObj: {
		[key: string]: unknown;
	}
) {
	const response = await client.get<IApiResponse<IData[]>>(
		`/contests/missed/${userId}`,
		{
			params: queryObj,
		}
	);

	return response.data;
}

type TQueryKey = ['contests', 'missed', string, ...unknown[]];

export default function useContestsMissedData(
	userId: string,
	queryObj: {
		[key: string]: any;
	} = {},
	options: UseQueryOptions<
		IApiResponse<IData[]>,
		unknown,
		IApiResponse<IData[]>,
		TQueryKey
	> = {}
) {
	return useQuery<
		IApiResponse<IData[]>,
		unknown,
		IApiResponse<IData[]>,
		TQueryKey
	>({
		queryKey: ['contests', 'missed', userId, { ...queryObj }],
		queryFn: () => fetchData(userId, queryObj),
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		staleTime: Infinity,
		keepPreviousData: true,
		...options,
	});
}
