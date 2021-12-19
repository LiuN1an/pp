import React, { FC, useContext } from 'react'
import { Escape } from './Escape'
import { User } from './User'

interface CommonContext {
  userStore: User
  escapeStore: Escape
}

const context: CommonContext = {
  userStore: new User(),
  escapeStore: new Escape(),
}

export const Store = React.createContext(context)

export const useCommonStore = () => {
  return useContext(Store) as Record<string, any>
}

interface StoreProviderProps {
  value?: Record<string, any>
}

export const StoreProvider: FC<StoreProviderProps> = ({
  value = {},
  children,
}) => {
  return (
    <Store.Provider value={{ ...value, ...context }}>
      {children}
    </Store.Provider>
  )
}
