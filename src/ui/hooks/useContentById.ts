import { UseQueryOptions, useQuery } from 'react-query';
import createAxiosClient from '../utils/axiosClient';
import IApiResponse from '../types/IApiResponse';
import IContent from '../types/IContent';

async function queryFn({ queryKey }: { queryKey: any }) {
	const [_, id, params] = queryKey;
	const client = createAxiosClient();
	const response = await client.get<IApiResponse<IContent>>(`/contents/${id}`, {
		params,
	});
	return response.data.data;
}

export default function useContentById(
	id: string,
	params: { [key: string]: any } = {},
	options: UseQueryOptions<IContent, unknown, IContent> = {}
) {
	return useQuery({
		queryKey: ['contents', id, params],
		queryFn,
		...options,
	});
}
