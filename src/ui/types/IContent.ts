import IContentTag from './IContentTag';
import IProblem from './Iproblem';
import IQuiz from './IQuiz';
import IUser from './IUser';

export default interface IContent {
	id: string;
	name: string;
	// FIXME: change to enum
	type: string;
	difficulty: 1 | 2 | 3;
	contentTags: IContentTag[];
	problem?: IProblem;
	quiz?: IQuiz;
	problemId?: string;
	createdBy?: IUser;
	isSolved?: boolean;
}
