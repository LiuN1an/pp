import { EscapeMask, EscapePopSwiper, makeEscape } from '@utils/escape'
import { MobileUserLogin, UserLogin } from '@widget'
import React, { useCallback } from 'react'
import { isMobile } from 'react-device-detect'
import './app.less'
import { StoreProvider, useCommonStore } from './common/store'

export const App = () => {
  const { escapeStore } = useCommonStore()
  const handleClick = useCallback(() => {
    makeEscape({
      children: ({ id }) => {
        return isMobile ? (
          <StoreProvider value={{ id }}>
            <EscapePopSwiper render={MobileUserLogin} />
          </StoreProvider>
        ) : (
          <StoreProvider value={{ id }}>
            <EscapeMask render={UserLogin} />
          </StoreProvider>
        )
      },
      store: escapeStore,
    })
  }, [])

  return (
    <div className='wrapper'>
      <div className='ok' onClick={handleClick}>
        试试
      </div>
    </div>
  )
}
