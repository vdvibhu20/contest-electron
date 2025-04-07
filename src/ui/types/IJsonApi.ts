export default interface IJsonApi<T> {
  id?: string,
  attributes: T,
  type: string,
  relationships?: { [key: string]: { data: IJsonApi<T>}}
}