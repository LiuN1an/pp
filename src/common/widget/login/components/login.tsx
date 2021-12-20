import CloseSVG from '@assets/close.svg'
import LoadingButton from '@mui/lab/LoadingButton'
import Input from '@mui/material/Input'
import { useFade } from '@utils/hooks'
import classnames from 'classnames'
import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { useLogin } from './hooks'
import './index.less'

export interface UserLoginProps {
  /**
   * 对返回的请求进行判断，如果不符合预期则返回false
   * 默认的判断条件为code不为0
   */
  onProcessResponse?: (v: any) => boolean
  /**
   * 登录按钮点击时触发的函数，如果为空则走默认的url逻辑
   */
  onLogin?: (props: {
    username: string
    pwd: string
    verify?: string
  }) => void
  clickRegister?: () => void
  clickForget?: () => void
}

export const UserLogin: FC<UserLoginProps> = observer(
  ({ onLogin, clickRegister, clickForget }) => {
    const { isOpen, handleClose } = useFade()

    const {
      username,
      pwd,
      isLoading,
      handleChangeUserName,
      handleChangePwd,
      handleRegister,
      handleForget,
      handleLogin,
    } = useLogin({
      onLogin,
      handleClose,
      clickRegister,
      clickForget,
    })

    return (
      <div className={classnames('modal', isOpen ? 'show' : 'hidden')}>
        <div className='header'>
          <div className='title'>登录</div>
          <CloseSVG className='close-icon' onClick={handleClose} />
        </div>
        <div className='content'>
          <div className='account'>
            <div className='label'>用户名</div>
            <Input
              className='input'
              placeholder='请输入用户名'
              value={username}
              onChange={handleChangeUserName}
            />
          </div>
          <div className='pwd'>
            <div className='label'>密码</div>
            <Input
              className='input'
              placeholder='请输入密码'
              type='password'
              value={pwd}
              onChange={handleChangePwd}
            />
          </div>
        </div>
        <div className='footer'>
          <div className='options'>
            <span className='forget' onClick={handleForget}>
              忘记密码
            </span>
            <span className='register' onClick={handleRegister}>
              还没有账户?
            </span>
          </div>
          <LoadingButton
            loading={isLoading}
            variant='contained'
            className='btn'
            onClick={handleLogin}
          >
            立即登录
          </LoadingButton>
        </div>
      </div>
    )
  }
)

export const MobileUserLogin: FC<UserLoginProps> = observer(
  ({ onLogin, clickRegister, clickForget }) => {
    const { handleClose } = useFade()

    const {
      username,
      pwd,
      isLoading,
      handleLogin,
      handleChangeUserName,
      handleChangePwd,
      handleRegister,
      handleForget,
    } = useLogin({
      onLogin,
      handleClose,
      isMobile: true,
      clickRegister,
      clickForget,
    })

    return (
      <div className='mobile-modal'>
        <div className='header'>
          <div className='title'>登录</div>
          <CloseSVG className='close-icon' onClick={handleClose} />
        </div>
        <div className='content'>
          <div className='account'>
            <div className='label'>用户名</div>
            <Input
              className='input'
              placeholder='请输入用户名'
              value={username}
              onChange={handleChangeUserName}
            />
          </div>
          <div className='pwd'>
            <div className='label'>密码</div>
            <Input
              className='input'
              placeholder='请输入密码'
              type='password'
              value={pwd}
              onChange={handleChangePwd}
            />
          </div>
        </div>
        <div className='footer'>
          <div className='options'>
            <span className='forget' onClick={handleForget}>
              忘记密码
            </span>
            <span className='register' onClick={handleRegister}>
              还没有账户?
            </span>
          </div>
          <LoadingButton
            loading={isLoading}
            variant='contained'
            className='btn'
            onClick={handleLogin}
          >
            立即登录
          </LoadingButton>
        </div>
      </div>
    )
  }
)
