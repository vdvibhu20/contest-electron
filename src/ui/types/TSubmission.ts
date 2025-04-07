export type TSubmissionType = 'run' | 'submit';

type TSubmission<T extends TSubmissionType> = {
	id: number;
	score: number;
	judge_result?: {
		id: number;
		code: number;
		time: number;
		stderr: string;
		stdout: string;
		scenario: T;
	} & (T extends 'submit'
		? {
				testcases: {
					id: number;
					time: string;
					score: number;
					result: string;
					stderr: string;
				}[];
		  }
		: {});
	result: number;
	solution: {
		source: string;
	};
	language: string;
	status: string;
	createdAt: string;
};

export default TSubmission;
