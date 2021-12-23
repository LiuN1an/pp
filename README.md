### 这是一个管理通用组件的库

#### Escape

这个类利用了mobx的机制，逃逸节点只需要在添加的时候注册关闭函数就可以在享受在提供escapeStore的Context下的节点的展示隐藏的状态联动，
不需要手动在组件之间传递多层props即可灵活控制多个有打开顺序关系的逃逸节点的关闭功能

目前已实现的
- 通过实现Escape类来统一管理一切react-dom的逃逸节点的生命周期
- 定制官方遮盖罩组件，popSwiper组件以及Snack组件
- 调用时需要配合useFade的hook来获取动画特效的open变量以及关闭动画的函数
- 特定组件需要在Provider中指定所需的值，比如url，id等

#### 组件类目

- 登录注册弹框及其机制，提供userStore来记录登录状态，注意使用时不要在context覆盖userStore的命名
- TODO： 分类+瀑布流，需要考虑形式
