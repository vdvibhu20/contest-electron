import { useQuery } from 'react-query';
import createAxiosClient from '../../utils/axiosClient';
import IJsonApi from '../../types/IJsonApi';
import IQuizQuestion from '../../types/IQuizQuestionChoice';
import serializer from '../../jsonapi-serializers'
import {  AxiosResponse } from 'axios';

// FIXME: fix type for queryKey
function fetchQuizQuestionById({ queryKey }: { queryKey: any }){
	const [_key, id] = queryKey;

	const client = createAxiosClient();
	return client.get<IJsonApi<IQuizQuestion>>(`/quiz-questions/${id}`);
}

export default function useQuizById(
	id: string,
) {
	return useQuery(['quiz-questions', id], fetchQuizQuestionById, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		staleTime: 0,

		//@ts-ignore
		select: (data: AxiosResponse<IJsonApi<IQuizQuestion>>) => serializer.deserialize('quiz-question', data.data),
		keepPreviousData: true,
		// enabled: false, //FIXME: should be send by user
	});
}
