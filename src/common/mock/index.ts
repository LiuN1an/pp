import Mock from 'mockjs'
import { requestLogin, requestRegister } from '../api/index'

export const domain = 'http://www.test.com/api/'

export const getUrl = (url: string) => {
  return domain + url
}

Mock.setup({
  timeout: 1000,
})

Mock.mock(
  getUrl(requestLogin.url),
  requestLogin.method,
  requestLogin.response
)

Mock.mock(
  getUrl(requestRegister.url),
  requestRegister.method,
  requestRegister.response
)
