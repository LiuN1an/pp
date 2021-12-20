import axios, { AxiosRequestConfig } from 'axios'

export const request = async (props: AxiosRequestConfig) => {
  console.log('request - props: ', props)

  const result = await axios(props)

  console.log('request - result: ', result)

  if (result.status === 200) {
    return result.data
  } else {
    return {
      code: result.status,
      msg: result.statusText,
    }
  }
}

export const processResponse = (v: any): boolean => {
  if (v.code !== 0) {
    return false
  }
  return true
}
