import { useQuery } from 'react-query';
import createAxiosClient from '../../utils/axiosClient';
import IApiResponse from '../../types/IApiResponse';
import { TContent } from '../../types/TContent';

async function fetchContentsForContest({ queryKey }: any) {
	const [_, id] = queryKey;
	const client = createAxiosClient();
	const response = await client.get<IApiResponse<TContent[]>>(`/contests/${id}/contents`);
	return response.data;
}

export default function useContentsForContest(
	id: string,
) {
	return useQuery(['contest-contents', id],fetchContentsForContest, {
		refetchOnMount: true,
		refetchOnWindowFocus: false,
		staleTime: 0,
		select: (data) => data.data,
		keepPreviousData: true,
		retry: false
	});
}
