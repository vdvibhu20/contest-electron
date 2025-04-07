import { TContest } from './TContest';
import TUser from './TUser';

type TContestAttempt = {
	id: number | string;
	contest: Pick<TContest, 'id'>;
	user: Pick<TUser, 'id'>;
	'end-time': string;
	'start-time': string;
};

export default TContestAttempt;
