export type BaseRequest = {
  pathParams: [string, any][],
  queryParams: {[key: string] : any},
  body: any,
  method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH' | 'HEAD' | 'TRACE'
}
