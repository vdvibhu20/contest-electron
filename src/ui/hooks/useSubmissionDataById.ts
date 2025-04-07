import { useQuery, UseQueryOptions } from 'react-query';
import TSubmission from '../types/TSubmission';
import createAxiosClient from '../utils/axiosClient';

const client = createAxiosClient();

export type TSubmissionDataType = 'run' | 'submit';

export type TSubmissionDataByIdResponse<T extends TSubmissionDataType> = {
	meta: {};
	type: 'submission';
	data: TSubmission<T>;
};

type TQueryKey = ['submissions', string];

async function fetchSubmissionById(id: string) {
	const response = await client.get<
		TSubmissionDataByIdResponse<TSubmissionDataType>
	>(`/submissions/${id}`);

	return response.data;
}

export default function useSubmissionDataById(
	id: string,
	options: UseQueryOptions<
		TSubmissionDataByIdResponse<TSubmissionDataType>,
		unknown,
		TSubmissionDataByIdResponse<TSubmissionDataType>,
		TQueryKey
	> = {}
) {
	return useQuery<
		TSubmissionDataByIdResponse<TSubmissionDataType>,
		unknown,
		TSubmissionDataByIdResponse<TSubmissionDataType>,
		TQueryKey
	>({
		queryKey: ['submissions', id],
		queryFn: () => fetchSubmissionById(id),
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		staleTime: 0,
		...options,
	});
}
