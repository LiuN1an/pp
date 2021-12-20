export type MockRequest = {
  url: string
  method: 'get' | 'post'
  response: Record<string, any>
}
