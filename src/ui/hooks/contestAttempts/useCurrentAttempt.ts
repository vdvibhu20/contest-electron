import { UseQueryOptions, useQuery } from 'react-query';
import createAxiosClient from '../../utils/axiosClient';
import TContestAttempt from '../../types/TContestAttempt';
import IApiResponse from '../../types/IApiResponse';
// import axios, { AxiosResponse } from 'axios';

const client = createAxiosClient();

type Data = {
	attributes: Pick<TContestAttempt, 'id' | 'end-time' | 'start-time'>;
	relationships: {
		contest: {
			data: {
				id: string;
			};
		};
		user: {
			data: {
				id: string | number;
			};
		};
	};
};

async function queryFn({ queryKey }: { queryKey: any }) {
	//@ts-ignore
	// console.log('queryKey', queryKey)
	// const [_, contest_id] = queryKey;
	const contest_id=queryKey[2]
	console.log('inside current',contest_id)
	const jwt=localStorage.getItem('cb_auth')
	const contestId=localStorage.getItem('contestId')
	// const response = await client.get<IApiResponse<Data | null>>(
	// 	`/contest-attempts/current-attempt?contest_id=${contestId}`
	// ); 
	// const contestId=localStorage.getItem('contestId')
	// console.log('jwt',jwt,contestId)
	const response = await client.get<IApiResponse<Data | null>>(
        `/contest-attempts/current-attempt?contest_id=${contestId}`,
        {
            headers: {
                Authorization: `Jwt ${jwt}`,
            },
        }
    );
    console.log('res',response)
	if (response.data.data === null) return response.data.data;
	return {
		...response.data.data.attributes,
		contest: response.data.data.relationships.contest.data,
		user: response.data.data.relationships.user.data,
	} as TContestAttempt;
}

export default function useCurrentContestAttempt(
	contest_id: string,
	options: UseQueryOptions<
		TContestAttempt | null,
		unknown,
		TContestAttempt | null
	> = {}
) {
	return useQuery({
		queryKey: ['contest-attempt', 'current-attempt', contest_id],
		queryFn,
		...options,
	});
}
