import { TContent } from './TContent';
import TUser from './TUser';

export type TContest = {
  "id": string,
  "name": string,
  "description": string,
  "is_listed": boolean,
  "start_time": string,
  "end_time": string,
  "contestWinner": TUser
  "contents": TContent[]
  "exclusive": boolean
}