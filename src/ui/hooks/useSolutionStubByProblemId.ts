import { useQuery, UseQueryOptions } from 'react-query';
import createAxiosClient from '../utils/axiosClient';
import IApiResponse from '../types/IApiResponse';
import TSolutionStub from '../types/TSolutionStub';

const client = createAxiosClient();

async function fetchSolutionStubByProblemId(problemId: number) {
	const jwt=localStorage.getItem("cb_auth");
	const response = await client.get<IApiResponse<TSolutionStub[]>>(
		`solution_stubs/problem/${problemId}`,
		{
            headers: {
                Authorization: `Jwt ${jwt}`,
            },
        }
	);

	return response.data.data;
}

type TQueryKey = ['solution-stubs', 'problem', number];

export default function useSolutionStubByProblemId(
	problemId: number,
	options: UseQueryOptions<
		TSolutionStub[],
		unknown,
		TSolutionStub[],
		TQueryKey
	> = {}
) {
	return useQuery<TSolutionStub[], unknown, TSolutionStub[], TQueryKey>({
		queryKey: ['solution-stubs', 'problem', problemId],
		queryFn: () => fetchSolutionStubByProblemId(problemId),
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		staleTime: Infinity,
		keepPreviousData: true,
		...options,
	});
}
