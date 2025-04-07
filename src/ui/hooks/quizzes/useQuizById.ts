import { useQuery } from 'react-query';
import createAxiosClient from '../../utils/axiosClient';
import IJsonApi from '../../types/IJsonApi';
import IQuiz from '../../types/IQuiz';
import serializer from '../../jsonapi-serializers'
import {  AxiosResponse } from 'axios';
// FIXME: fix type for queryKey
function fetchQuizById({ queryKey }: { queryKey: any }){
	const [_key, id, queryObj] = queryKey;

	const client = createAxiosClient();
	return client.get<IJsonApi<IQuiz>>(`/quizzes/${id}`, {
		params: queryObj,
	});
}

export default function useQuizById(
	id: string,
	queryObj: { [key: string]: any }
) {
	return useQuery(['quizzes', id, queryObj], fetchQuizById, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		staleTime: 0,

		//@ts-ignore
		select: (data: AxiosResponse<IJsonApi<IQuiz>>) => serializer.deserialize('quiz', data.data),
		keepPreviousData: true,
		// enabled: false, //FIXME: should be send by user
	});
}
