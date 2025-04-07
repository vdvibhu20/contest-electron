import { useMutation } from 'react-query';
import createAxiosClient from '../../utils/axiosClient';
import IApiResponse from '../../types/IApiResponse';
import TContestAttempt from '../../types/TContestAttempt';
import IJsonApi from '../../types/IJsonApi';

const client = createAxiosClient();

async function postSubmitContestAttempt(contest_attempt_id: string) {

  const response = await client.post<IApiResponse<IJsonApi<TContestAttempt>>>(`/contest-attempts/${contest_attempt_id}/submit`,
    {
      headers: {
        Authorization: `Jwt ${localStorage.getItem('cb_auth')}`,
      },
    }
  )
  return response.data
}
//@ts-ignore
export default function useSubmitContestAttempt(contest_attempt_id: string) {
  // console.log('contest_attempt_id',contest_attempt_id)
  return useMutation(postSubmitContestAttempt)
}