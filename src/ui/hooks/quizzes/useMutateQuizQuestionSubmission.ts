import { useMutation } from 'react-query';
import createAxiosClient from '../../utils/axiosClient';
import IApiResponse from '../../types/IApiResponse';
import IJsonApi from '../../types/IJsonApi';
import JSOnApiSerializer from '../../jsonapi-serializers';
import TQuizQuestionSubmission from '../../types/TQuizQuestionSubmission';

const client = createAxiosClient();

async function saveQuizQuestionSubmission(quizQuestionSubmission: TQuizQuestionSubmission) {
  const payload = JSOnApiSerializer.serialize('quiz_question_submissions', quizQuestionSubmission)
  if (!Array.isArray(payload.data) && payload.data?.relationships) {
    if (payload.data.relationships['content-attempt']?.data) {
      const contentAttemptData = payload.data.relationships['content-attempt'].data;
      if (!Array.isArray(contentAttemptData) && contentAttemptData) {
        contentAttemptData.type = 'content-attempts';
      }
    }
  }
  if (!Array.isArray(payload.data) && payload.data?.id) {
    const response = await client.patch<IApiResponse<IJsonApi<TQuizQuestionSubmission>>>(`/quiz-question-submissions/${quizQuestionSubmission.id}`, payload)
    return response.data
  } else {
    const response = await client.post<IApiResponse<IJsonApi<TQuizQuestionSubmission>>>('/quiz-question-submissions', payload)
    return response.data
  }
}


export default function useSaveQuizQuestionSubmission() {
  return useMutation(saveQuizQuestionSubmission)
}