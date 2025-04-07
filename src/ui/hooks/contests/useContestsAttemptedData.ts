import createAxiosClient from '../../utils/axiosClient';
import { useQuery, UseQueryOptions } from 'react-query';
import IApiResponse from '../../types/IApiResponse';
import IContest from '../../types/IContest';
import IUser from '../../types/IUser';

interface IData extends IContest {
	contestWinner: IUser;
	userRank: string;
}

const client = createAxiosClient();

async function fetchData(
	userId: string,
	queryObj: {
		[key: string]: unknown;
	}
) {
	const response = await client.get<IApiResponse<IData[]>>(
		`/contests/attempted/${userId}`,
		{
			params: queryObj,
		}
	);

	return response.data;
}

type TQueryKey = ['contests', 'attempted', string, ...unknown[]];

export default function useContestsAttemptedData(
	userId: string,
	queryObj: {
		[key: string]: unknown;
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
		queryKey: ['contests', 'attempted', userId, { ...queryObj }],
		queryFn: () => fetchData(userId, queryObj),
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		staleTime: Infinity,
		keepPreviousData: true,
		...options,
	});
}
