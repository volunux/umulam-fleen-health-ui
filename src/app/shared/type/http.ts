export type RequestMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH' | 'HEAD' | 'TRACE';


export type BaseRequest = {
  pathParams?: [string, any][],
  queryParams?: {[key: string] : any} | undefined,
  body?: any,
  method?: RequestMethod
}

