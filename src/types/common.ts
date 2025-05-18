type StatusCode = 'OK'
export interface IApiResponse<T = void, S extends number = 200> {
  code: S
  status: StatusCode
  message: string
  data: T
}
