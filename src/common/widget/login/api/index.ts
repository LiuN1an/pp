export interface mUserLogin {
  account: string
  pwd: string
  /**
   * 验证码
   */
  verify?: string
}

export interface iUser {
  account: string
  pwd: string
}
