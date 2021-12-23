import {
    createSnack,
    EscapeMask,
    EscapePopSwiper,
    makeEscape
} from '@utils/escape'
import { MobileUserLogin, UserLogin } from '@widget'
import { observer } from 'mobx-react-lite'
import React, { useCallback } from 'react'
import { isMobile } from 'react-device-detect'
import { requestLogin, requestRegister } from '../api'
import { getUrl } from '../mock'
import { StoreProvider, useCommonStore } from '../store'
import './index.less'

export const Login = observer(() => {
  const { escapeStore, userStore } = useCommonStore()

  const handleQuit = useCallback(() => {
    userStore.quitLogin()
    createSnack({
      content: <span>退出登录</span>,
      store: escapeStore,
      color: '#27699b',
      isMobile,
    })
  }, [])

  const handleClick = useCallback(() => {
    makeEscape({
      children: ({ id }) => {
        return isMobile ? (
          <StoreProvider
            value={{
              id,
              loginUrl: getUrl(requestLogin.url),
              registerUrl: getUrl(requestRegister.url),
            }}
          >
            <EscapePopSwiper render={<MobileUserLogin />} />
          </StoreProvider>
        ) : (
          <StoreProvider
            value={{
              id,
              loginUrl: getUrl(requestLogin.url),
              registerUrl: getUrl(requestRegister.url),
            }}
          >
            <EscapeMask render={<UserLogin />} />
          </StoreProvider>
        )
      },
      store: escapeStore,
    })
  }, [])

  return (
    <div className='wrapper'>
      {userStore.isLogin ? (
        <div onClick={handleQuit}>quit</div>
      ) : (
        <div className='ok' onClick={handleClick}>
          start login
        </div>
      )}
    </div>
  )
})
