export interface ResponseHandle<T>{
  code: number,
  message: string,
  result: T
}


export interface ResponseWithMockJS<T> {
  path: string,
  method: 'get' | 'post' | 'GET' | 'POST',
  handle: () => ResponseHandle<T>
}
