import createAxiosClient from '../../utils/axiosClient';
import { useQuery } from 'react-query';
import IApiResponse from '../../types/IApiResponse';
import IContest from '../../types/IContest';
import { formatISO } from 'date-fns';

interface IData extends IContest {}

function fetchData({ queryKey }: { queryKey: any }) {
	const [_key1, _key2, queryObj] = queryKey;
	const client = createAxiosClient();
	return client.get<IApiResponse<IData[]>>(`/contests/`, {
		params: queryObj,
	});
}

export default function useContestsUpcomingData(queryObj: {
	[key: string]: any;
}) {
	queryObj['where'] = {
		...queryObj['where'],
		start_time: {
			$gt: formatISO(new Date()),
		},
		is_listed: true,
	};

	return useQuery(['contests', 'upcoming', { ...queryObj }], fetchData, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		staleTime: 0,
		select: (data) => data.data,
		keepPreviousData: true,
	});
}
