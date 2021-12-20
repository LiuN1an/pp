import { MockRequest } from './type'

export const requestLogin: MockRequest = {
  url: 'login',
  method: 'post',
  response: {
    code: 0,
    msg: '',
    data: {
      token: '',
    },
  },
}

export const requestRegister: MockRequest = {
  url: 'register',
  method: 'post',
  response: {
    code: 10,
    msg: '',
    data: {
      token: '',
    },
  },
}
