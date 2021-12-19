import { StoreProvider, useCommonStore } from '@/common/store'
import { Escape } from '@/common/store/Escape'
import {
    createSnack,
    EscapeMask,
    EscapePopSwiper,
    makeEscape
} from '@utils/escape'
import { processResponse } from '@utils/request'
import React, { useCallback, useState } from 'react'
import { MobileUserRegister, UserResigter } from './register'

interface UseLoginReturn {
  account: string
  pwd: string
  handleChangeAccount: (e: React.ChangeEvent<HTMLInputElement>) => void
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
  url?: string
  isMobile?: boolean
}) => UseLoginReturn = ({
  isMobile = false,
  handleClose,
  onProcessResponse,
  onLogin,
  clickForget,
  clickRegister,
  url,
}) => {
  const { id: loginId, escapeStore } = useCommonStore()
  const [account, setAccount] = useState('')
  const [pwd, setPwd] = useState('')

  const handleChangeAccount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setAccount(value)
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
    if (onLogin) {
      try {
        await onLogin?.({
          account,
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
      }
    } else {
      if (url) {
        const response = await fetch(url, {
          method: 'post',
          body: JSON.stringify({
            account,
            pwd,
          }),
        })
        const v = await response.json()
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
          })
          handleClose()
        } else {
          createSnack({
            content: <span>登录失败，请检查</span>,
            store: escapeStore,
            color: '#d32f2f',
          })
        }
      }
    }
  }, [onLogin])

  const handleRegister = useCallback(() => {
    if (clickRegister) {
      clickRegister()
    } else {
      if (isMobile) {
        makeEscape({
          children: ({ id }) => {
            return (
              <StoreProvider value={{ id: id, loginId }}>
                <EscapePopSwiper render={MobileUserRegister} />
              </StoreProvider>
            )
          },
          store: escapeStore,
        })
      } else {
        makeEscape({
          children: ({ id }) => {
            return (
              <StoreProvider value={{ id: id, loginId }}>
                <EscapeMask render={UserResigter} />
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
    account,
    pwd,
    handleChangeAccount,
    handleChangePwd,
    handleLogin,
    handleRegister,
    handleForget,
  }
}

interface UseRegisterReturn {
  account: string
  pwd: string
  confirmPwd: string
  handleChangeAccount: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleChangePwd: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleConfirmPwd: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleRegister: () => void
}

export const useRegister: (props: {
  handleClose?: () => void
  onProcessResponse?: (v: any) => boolean
  onRegister?: (prop: any) => void
  url?: string
}) => UseRegisterReturn = ({
  onRegister,
  handleClose,
  url,
  onProcessResponse,
}) => {
  const { escapeStore, loginId } = useCommonStore()
  const [account, setAccount] = useState('')
  const [pwd, setPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')

  const handleChangeAccount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setAccount(value)
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
    handleClose()
    ;(escapeStore as Escape).close(loginId)
    if (onRegister) {
      try {
        await onRegister?.({
          account,
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
      }
    } else {
      if (url) {
        const response = await fetch(url, {
          method: 'post',
          body: JSON.stringify({
            account,
            pwd,
          }),
        })
        const v = await response.json()
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
          })
          handleClose()
        } else {
          createSnack({
            content: <span>登录失败，请检查</span>,
            store: escapeStore,
            color: '#d32f2f',
          })
        }
      }
    }
  }, [])

  return {
    account,
    pwd,
    confirmPwd,
    handleChangeAccount,
    handleChangePwd,
    handleConfirmPwd,
    handleRegister,
  }
}
