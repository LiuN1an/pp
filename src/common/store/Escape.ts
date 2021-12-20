import {
    action,
    computed,
    makeAutoObservable,
    observable
} from 'mobx'

/**
 * 管理逃逸的类
 * 1、负责给每次逃逸分配一个id，并注册onClose方法
 * 2、处理逃逸对象的生命周期，add，close，destory，close特值关闭动画这一段
 */

export interface EscapeAddFuncProps {
  /**
   * 销毁节点的函数
   */
  onClose: () => void
}

export interface EscapeItem {
  id: string
  onClose: () => void
  show: boolean
}

export class Escape {
  @observable.deep public stack: EscapeItem[] = []

  constructor() {
    makeAutoObservable(this)
  }

  @computed public top() {
    return this.stack.length > 0
      ? this.stack[this.stack.length - 1]
      : undefined
  }

  @action public get(id: string) {
    return this.stack.find((v) => v.id === id)
  }

  @action public changeShow(
    itemOrId: EscapeItem | string,
    status: boolean
  ) {
    if (typeof itemOrId === 'string') {
      const find = this.stack.find((v) => v.id === itemOrId)
      if (find) {
        find.show = status
      }
    } else {
      itemOrId.show = status
    }
  }

  @action public add(prop: EscapeAddFuncProps) {
    const { onClose } = prop
    const newId = Math.random().toString(16)
    this.stack.push({
      id: newId,
      onClose,
      show: false,
    })
    return newId
  }

  @action public destory(itemOrId: EscapeItem | string | undefined) {
    if (!itemOrId) return
    let findIndex = -1
    if (typeof itemOrId === 'string') {
      findIndex = this.stack.findIndex((v) => v.id === itemOrId)
    } else {
      findIndex = this.stack.findIndex((v) => v.id === itemOrId.id)
    }
    if (findIndex >= 0) {
      this.stack.splice(findIndex, 1)
    } else {
      console.error('Can not find item in stack - item: ', itemOrId)
    }
  }

  @action public close(
    itemOrId: EscapeItem | string,
    animateTimeout = 300
  ) {
    let item: EscapeItem | undefined
    if (typeof itemOrId === 'string') {
      item = this.stack.find((v) => v.id === itemOrId)
    } else {
      item = itemOrId
    }

    if (item) {
      item.show = false
      setTimeout(() => {
        // 执行dom节点销毁
        item?.onClose()
        // stack移除该节点
        this.destory(item)
      }, animateTimeout)
    }
  }
}
