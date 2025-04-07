import { useMutation, useQueryClient } from 'react-query';
import createAxiosClient from '../../utils/axiosClient';
import IApiResponse from '../../types/IApiResponse';
import TContestAttempt from '../../types/TContestAttempt';
import IJsonApi from '../../types/IJsonApi';

const client = createAxiosClient();

async function postCurrentAttempt(contest_id: string) {
	const response = await client.post<IApiResponse<IJsonApi<TContestAttempt>>>(
		'/contest-attempts',
		{
			data: {
				type: 'contest-attempts',
				attributes: {},
				relationships: {
					contest: {
						data: {
							type: 'contests',
							id: contest_id,
						},
					},
				},
			},
		}
	);
	return response.data;
}

export default function useSaveContestAttempt(contest_id: string) {
	const queryClient = useQueryClient();

	return useMutation(postCurrentAttempt, {
		onSuccess: () => {
			queryClient.invalidateQueries(
				['contest-attempt', 'current-attempt', contest_id],
				{ exact: true }
			);
		},
	});
}
