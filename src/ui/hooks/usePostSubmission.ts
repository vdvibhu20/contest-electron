import { useMutation } from 'react-query';
import createAxiosClient from '../utils/axiosClient';

const client = createAxiosClient();

export type TPostSubmissionPayloadType = 'run' | 'submit';

export type TPostSubmissionPayload<T extends TPostSubmissionPayloadType> = {
	type: T;
	data: {
		content_id: string;
		language: string;
		source: string;
	} & (T extends 'run' ? { input: string } : { contest_id: string });
};

export type TPostSubmissionResponse = {
	submissionId: number;
};

async function postSubmission<T extends TPostSubmissionPayloadType>(
	payload: TPostSubmissionPayload<T>
) {
	const response = await client.post<TPostSubmissionResponse>(
		`/submissions/${payload.type}`,
		{ ...payload.data }
	);
	return response.data;
}
//@ts-ignore
export default function usePostSubmission<T>() {
	return useMutation<
		TPostSubmissionResponse,
		unknown,
		TPostSubmissionPayload<TPostSubmissionPayloadType>
	>({
		mutationFn: (payload) => postSubmission(payload),
	});
}
