import { TContentTag } from './TContentTag';

export type TContent = {
	id: string;
	name: string;
	type: string; //TODO: add enums here
	difficulty: 1 | 2 | 3;
	problemId: string;
	verified: boolean;
	createdAt: string;
	contentTags: TContentTag[];
	isSolved?: boolean;
};
