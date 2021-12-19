import { action, makeAutoObservable, observable } from 'mobx'

export class User {
  @observable public isLogin = false

  constructor() {
    makeAutoObservable(this)
  }

  @action public hasLogin() {
    this.isLogin = true
  }
}
