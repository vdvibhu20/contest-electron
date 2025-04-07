import IContent from './IContent'
import IUser from './IUser'
export default interface IContest {
	id: string;
	name: string;
	description: string;
	is_listed: boolean;
	start_time: string;
	end_time: string;
	contents: IContent[];
	contestWinner: IUser;
}
