import { requestLogin, requestRegister } from '@/common/api'
import { StoreProvider, useCommonStore } from '@/common/store'
import { Escape } from '@/common/store/Escape'
import {
    createSnack,
    EscapeMask,
    EscapePopSwiper,
    makeEscape
} from '@utils/escape'
import { processResponse, request } from '@utils/request'
import React, { useCallback, useState } from 'react'
import { MobileUserRegister, UserResigter } from './register'

interface UseLoginReturn {
  username: string
  pwd: string
  isLoading: boolean
  handleChangeUserName: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleChangePwd: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleLogin: () => void
  handleRegister: () => void
  handleForget: () => void
}

export const useLogin: (props: {
  handleClose?: () => void
  onProcessResponse?: (v: any) => boolean
  onLogin?: (prop: any) => void
  clickForget?: () => void
  clickRegister?: () => void
  isMobile?: boolean
}) => UseLoginReturn = ({
  isMobile = false,
  handleClose,
  onProcessResponse,
  onLogin,
  clickForget,
  clickRegister,
}) => {
  const { id: loginId, escapeStore, loginUrl, ...rest } = useCommonStore()
  const [isLoading, setLoading] = useState(false)
  const [username, setusername] = useState('')
  const [pwd, setPwd] = useState('')

  const handleChangeUserName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setusername(value)
    },
    []
  )

  const handleChangePwd = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setPwd(value)
    },
    []
  )

  const handleLogin = useCallback(async () => {
    setLoading(true)
    if (onLogin) {
      try {
        await onLogin?.({
          username,
          pwd,
        })
        createSnack({
          content: <span>登录成功</span>,
          store: escapeStore,
          isMobile,
        })
        handleClose()
      } catch (e) {
        createSnack({
          content: <span>登录失败，请检查</span>,
          store: escapeStore,
          color: '#d32f2f',
          isMobile,
        })
      } finally {
        setLoading(false)
      }
    } else {
      if (loginUrl) {
        const v = await request({
          url: loginUrl,
          method: requestLogin.method,
          data: {
            username,
            pwd,
          },
        })

        let result = null
        if (onProcessResponse) {
          result = onProcessResponse(v)
        } else {
          result = processResponse(v)
        }
        if (result) {
          createSnack({
            content: <span>登录成功</span>,
            store: escapeStore,
            isMobile,
          })
          handleClose()
        } else {
          createSnack({
            content: <span>登录失败，请检查</span>,
            store: escapeStore,
            color: '#d32f2f',
            isMobile,
          })
        }
        setLoading(false)
      }
    }
  }, [])

  const handleRegister = useCallback(() => {
    if (clickRegister) {
      clickRegister()
    } else {
      if (isMobile) {
        makeEscape({
          children: ({ id }) => {
            return (
              <StoreProvider value={{ id, loginId, ...rest }}>
                <EscapePopSwiper render={<MobileUserRegister />} />
              </StoreProvider>
            )
          },
          store: escapeStore,
        })
      } else {
        makeEscape({
          children: ({ id }) => {
            return (
              <StoreProvider value={{ id, loginId, ...rest }}>
                <EscapeMask render={<UserResigter />} />
              </StoreProvider>
            )
          },
          store: escapeStore,
        })
      }
    }
  }, [])

  const handleForget = useCallback(() => {
    if (clickForget) {
      clickForget()
    } else {
      //   if (isMobile) {
      //   } else {
      //   }
      createSnack({
        content: <span>暂不支持该功能</span>,
        store: escapeStore,
        color: '#d32f2f',
        isMobile,
      })
    }
  }, [])

  return {
    username,
    pwd,
    isLoading,
    handleChangeUserName,
    handleChangePwd,
    handleLogin,
    handleRegister,
    handleForget,
  }
}

interface UseRegisterReturn {
  username: string
  pwd: string
  confirmPwd: string
  isLoading: boolean
  handleChangeUserName: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleChangePwd: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleConfirmPwd: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleRegister: () => void
}

export const useRegister: (props: {
  handleClose?: () => void
  onProcessResponse?: (v: any) => boolean
  onRegister?: (prop: any) => void
  isMobile?: boolean
}) => UseRegisterReturn = ({
  onRegister,
  handleClose,
  onProcessResponse,
  isMobile = false,
}) => {
  const { escapeStore, loginId, registerUrl } = useCommonStore()
  const [isLoading, setLoading] = useState(false)
  const [username, setUserName] = useState('')
  const [pwd, setPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')

  const handleChangeUserName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setUserName(value)
    },
    []
  )

  const handleChangePwd = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setPwd(value)
    },
    []
  )

  const handleConfirmPwd = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setConfirmPwd(value)
    },
    []
  )

  const handleRegister = useCallback(async () => {
    setLoading(true)
    if (onRegister) {
      try {
        await onRegister?.({
          username,
          pwd,
        })
        createSnack({ content: <span>登录成功</span>, store: escapeStore })
        handleClose()
        ;(escapeStore as Escape).close(loginId)
      } catch (e) {
        createSnack({
          content: <span>登录失败，请检查</span>,
          store: escapeStore,
          color: '#d32f2f',
        })
      } finally {
        setLoading(false)
      }
    } else {
      if (registerUrl) {
        const v = await request({
          url: registerUrl,
          method: requestRegister.method,
          data: {
            username,
            pwd,
            confirmPwd,
          },
        })
        let result = null
        if (onProcessResponse) {
          result = onProcessResponse(v)
        } else {
          result = processResponse(v)
        }
        if (result) {
          createSnack({
            content: <span>注册成功</span>,
            store: escapeStore,
            isMobile,
          })
          handleClose()
          ;(escapeStore as Escape).close(loginId)
        } else {
          createSnack({
            content: <span>注册失败，请检查</span>,
            store: escapeStore,
            color: '#d32f2f',
            isMobile,
          })
        }
        setLoading(false)
      }
    }
  }, [])

  return {
    username,
    pwd,
    confirmPwd,
    isLoading,
    handleChangeUserName,
    handleChangePwd,
    handleConfirmPwd,
    handleRegister,
  }
}
