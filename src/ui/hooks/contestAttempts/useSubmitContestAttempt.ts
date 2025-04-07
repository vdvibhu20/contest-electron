import { useMutation } from 'react-query';
// import createAxiosClient from '../../utils/axiosClient';
import IApiResponse from '../../types/IApiResponse';
import TContestAttempt from '../../types/TContestAttempt';
import IJsonApi from '../../types/IJsonApi';
import axios, { AxiosResponse } from 'axios';
// const client = createAxiosClient();

async function postSubmitContestAttempt(contest_attempt_id: string) {
  console.log('inside postSubmitContestAttempt', contest_attempt_id)
  const jwt = localStorage.getItem("cb_auth");
  const response: AxiosResponse<IApiResponse<IJsonApi<TContestAttempt>>> = await axios({
    method: 'post',
    url: `${import.meta.env.VITE_API_ENDPOINT}/contest-attempts/${contest_attempt_id}/submit`,
    headers: {
      Authorization: `Jwt ${jwt}`,
    },
  });
  // const response = await client.post<IApiResponse<IJsonApi<TContestAttempt>>>(`/contest-attempts/${contest_attempt_id}/submit`)
  return response.data
}
//@ts-ignore
export default function useSubmitContestAttempt(contest_attempt_id: string) {
  return useMutation(postSubmitContestAttempt)
}