import { UseQueryOptions, useQuery } from 'react-query';
import createAxiosClient from '../../utils/axiosClient';
import IApiResponse from '../../types/IApiResponse';
import { TContest } from '../../types/TContest';

async function queryFn({ queryKey }: any) {
	const [_, id, params] = queryKey;
	const client = createAxiosClient();
	const response = await client.get<IApiResponse<TContest>>(`/contests/${id}`, {
		params,
	});
	return response.data.data;
}

export default function useContestById(
	id: string,
	params: { [key: string]: any } = {},
	options: UseQueryOptions<TContest, unknown, TContest> = {}
) {
	return useQuery({
		queryKey: ['contents', id, params],
		queryFn,
		...options
	});
}
