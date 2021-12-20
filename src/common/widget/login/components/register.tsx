import CloseSVG from '@assets/close.svg'
import { LoadingButton } from '@mui/lab'
import Input from '@mui/material/Input'
import { useFade } from '@utils/hooks'
import classnames from 'classnames'
import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { useRegister } from './hooks'
import './index.less'

export interface UserRegisterProps {
  /**
   * 对返回的请求进行判断，如果不符合预期则返回false
   * 默认的判断条件为code不为0
   */
  onProcessResponse?: (v: any) => boolean
  /**
   * 登录按钮点击时触发的函数，如果为空则走默认的url逻辑
   */
  onRegister?: (props: {
    account: string
    pwd: string
    verify?: string
  }) => void
}

export const UserResigter: FC<UserRegisterProps> = observer(
  ({ onRegister }) => {
    const { isOpen, handleClose } = useFade()

    const {
      username,
      pwd,
      confirmPwd,
      isLoading,
      handleChangeUserName,
      handleChangePwd,
      handleRegister,
      handleConfirmPwd,
    } = useRegister({ onRegister, handleClose })

    return (
      <div className={classnames('modal', isOpen ? 'show' : 'hidden')}>
        <div className='header'>
          <div className='title'>注册</div>
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
          <div className='pwd'>
            <div className='label'>确认密码</div>
            <Input
              className='input'
              placeholder='请输入密码'
              type='password'
              value={confirmPwd}
              onChange={handleConfirmPwd}
            />
          </div>
        </div>
        <div className='footer'>
          <LoadingButton
            loading={isLoading}
            variant='contained'
            className='btn'
            onClick={handleRegister}
          >
            立即注册
          </LoadingButton>
        </div>
      </div>
    )
  }
)

export const MobileUserRegister: FC<UserRegisterProps> = observer(
  ({ onRegister }) => {
    const { handleClose } = useFade()

    const {
      username,
      pwd,
      confirmPwd,
      isLoading,
      handleChangeUserName,
      handleChangePwd,
      handleRegister,
      handleConfirmPwd,
    } = useRegister({ onRegister, handleClose, isMobile: true })

    return (
      <div className='mobile-modal'>
        <div className='header'>
          <div className='title'>注册</div>
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

          <div className='pwd'>
            <div className='label'>确认密码</div>
            <Input
              className='input'
              placeholder='请输入密码'
              type='password'
              value={confirmPwd}
              onChange={handleConfirmPwd}
            />
          </div>
        </div>
        <div className='footer'>
          <LoadingButton
            loading={isLoading}
            variant='contained'
            className='btn'
            onClick={handleRegister}
          >
            立即注册
          </LoadingButton>
        </div>
      </div>
    )
  }
)
