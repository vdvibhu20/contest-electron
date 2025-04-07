import { useQuery } from 'react-query';
import createAxiosClient from '../../utils/axiosClient';
// import IApiResponse from '../../types/IApiResponse';
import TContentAttempt from '../../types/TContentAttempt';
import IJsonApi from '../../types/IJsonApi';
import JSONApiSerializer from '../../jsonapi-serializers';
import { AxiosResponse } from 'axios';

const client = createAxiosClient();

async function fetchTopContentAttempt({ queryKey } : { queryKey: any}) {
  const [_key, content_id, contest_id] = queryKey;
  const response = await client.get<AxiosResponse<IJsonApi<TContentAttempt>>>(`/content-attempts/${content_id}/topAttempt?contest_id=${+contest_id}`)
  return response.data
}

export default function useTopContentAttempt(content_id: string, contest_id: string) {
  return useQuery(['current-attempt', content_id, contest_id], fetchTopContentAttempt,{
    refetchOnMount: false,
		refetchOnWindowFocus: false,
//@ts-ignore
    select: (data: AxiosResponse<IJsonApi<TContentAttempt>>):TContentAttempt => JSONApiSerializer.deserialize('content-attempt', data)
    // enabled: false
  })
}