import IPaginationMeta from './IPaginationMeta';

export default interface IApiResponse<T> {
	meta: {
		pagination: IPaginationMeta;
	};
	type: string;
	data: T;
}
