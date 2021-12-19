import classnames from 'classnames'
import { observer } from 'mobx-react-lite'
import React, {
    FC,
    ReactElement,
    ReactNode,
    useCallback,
    useEffect
} from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { StoreProvider } from '../store'
import { Escape } from '../store/Escape'
import './cover.less'
import { useFade } from './hooks'

export interface EscapeProp {
  onClose: () => void
  id?: string
}

export interface Props {
  children: (props: EscapeProp) => ReactElement<any, any> | ReactNode
  store?: Escape
}

export const makeEscape = (props: Props) => {
  const { children, store } = props
  const escapeNode = document.createElement('div')
  document.body.appendChild(escapeNode)
  const onClose = () => {
    unmountComponentAtNode(escapeNode)
    if (document.body.contains(escapeNode)) {
      document.body.removeChild(escapeNode)
    }
  }
  const id = store?.add({ onClose })
  const Child = children({ onClose, id })
  render(<>{Child}</>, escapeNode)
}

export interface MaskRenderProps {
  onClose: () => void
}

export interface EscapMaskProps {
  render: FC
  isAllowMaskClose?: boolean
}

export const EscapeMask: FC<EscapMaskProps> = observer(
  ({ render: Render, isAllowMaskClose = false }) => {
    const { isOpen, handleClose } = useFade()

    const handleClick = useCallback(() => {
      handleClose()
    }, [handleClose])

    return (
      <>
        <div
          className={classnames('cover', isOpen ? 'show' : 'hidden')}
          onClick={isAllowMaskClose ? handleClick : null}
        />
        <Render />
      </>
    )
  }
)

export interface PopSwiperRenderProps {
  onClose: () => void
}

export interface EscapPopSwiperProps {
  render: FC
}

export const EscapePopSwiper: FC<EscapPopSwiperProps> = observer(
  ({ render: Render }) => {
    const { isOpen } = useFade()

    return (
      <div
        className={classnames('pop-swiper', isOpen ? 'show' : 'hidden')}
      >
        <Render />
      </div>
    )
  }
)

interface SnackBarProps {
  content: ReactNode
  timeout?: number
  color?: string
  isMobile?: boolean
}

const SnackBar: FC<SnackBarProps> = observer(
  ({ content, timeout = 1000, color = '#2e7d32', isMobile = false }) => {
    const { isOpen, setOpen, handleClose } = useFade()

    useEffect(() => {
      setTimeout(() => {
        setOpen(false)
        setTimeout(handleClose)
      }, timeout)
    }, [])

    return (
      <div
        className={classnames(
          'snack-container',
          isMobile ? 'mobile' : 'pc',
          isOpen
            ? isMobile
              ? 'mobile-show'
              : 'show'
            : isMobile
            ? 'mobile-hidden'
            : 'hidden'
        )}
        style={{ background: color }}
      >
        {content}
      </div>
    )
  }
)

export const createSnack = (props: {
  content: ReactNode
  store: Escape
  color?: string
  timeout?: number
  isMobile?: boolean
}) => {
  const { store } = props
  makeEscape({
    children: ({ id }) => {
      return (
        <StoreProvider value={{ id }}>
          <SnackBar {...props} />
        </StoreProvider>
      )
    },
    store: store,
  })
}
