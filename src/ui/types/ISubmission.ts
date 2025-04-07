import IContent from './IContent';
import ISubmissionsStatus from './ISubmissionStatus';

export default interface ISubmission {
	id: number;
	score: number;
	// FIXME: fix type
	judge_result: any;
	result: number;
	// FIXME: fix type
	solution: any;
	content: IContent;
	language: string;
	status: ISubmissionsStatus;
	createdAt: string;
	explanation?: string;
}
