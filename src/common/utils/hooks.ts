import { useCallback, useEffect, useMemo } from 'react'
import { useCommonStore } from '../store'
import { Escape } from '../store/Escape'

export interface UseFadeReturn {
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
  handleClose: () => void
}

/**
 * 根据Escape类定义的hook
 */
export const useFade: () => UseFadeReturn = () => {
  const { id, escapeStore } = useCommonStore()

  const currentMask = useMemo(
    () => (escapeStore as Escape).get(id),
    [escapeStore, id]
  )

  useEffect(() => {
    setTimeout(() => {
      ;(escapeStore as Escape).changeShow(currentMask, true)
    })
  }, [])

  const setOpen = useCallback(
    (isOpen: boolean) => {
      ;(escapeStore as Escape).changeShow(currentMask, isOpen)
    },
    [currentMask]
  )

  const handleClose = useCallback(() => {
    ;(escapeStore as Escape).close(id)
  }, [escapeStore, id])

  return {
    isOpen: currentMask.show,
    setOpen,
    handleClose,
  }
}
