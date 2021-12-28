## 组件通信方式

### props

适用场景: 父子组件通信
注意事项:
如果父组件给子组件传递数据(函数), 本质其实是子组件给父组件传递数据
如果父组件给子组件传递的数据(非函数), 本质是父组件给子组件传递数据
书写方式: 3 种
['todoList'],{type:Array},{type:Array,default:[]}
小提示: 路由的 props
书写形式: 布尔值, 对象, 函数形式

### 自定义事件

适用场景: 子组件给父组件通信
$on, $emit

```JavaScript
    // 子组件
    this.$emit('test', param)
    // 父组件
    @test='test($event, otherParams…)'
```

### 全局事件总线

适用场景: 万能

Vue.prototype.$bus = bus

### pubsub-js, 在 react 中使用较多(发布, 订阅), vue 中几乎不使用

适用场景: 万能

### Vuex

适用场景: 万能

### 插槽

适用于父子组件通信(一般结构)
默认插槽
具名插槽
作用域插槽

## 事件(event)注意事项

事件:

1. 系统事件(click, 双击, 鼠标系列等等)
2. 自定义事件

事件源, 事件类型, 事件回调

1. 原生 DOM---button 可以绑定系统事件---click 单击事件等等

```html
<button @click="handler">原生按钮</button>
```

2. 组件标签--- Event 可以绑定系统事件---(不起作用, 因为属于自定义事件)

// 不起作用
<Event1 @click="handler">子组件</Event1>

// 添加.native 修饰符可以起作用 .native, 将自定义事件变为原生事件, (其实是给子组件的更节点添加了点击事件, 利用事件委派)
<Event1 @click.native="handler">子组件</Event1>

## v-model

v-model 是 vue 框架中的指令, 主要结合表单元素使用(input, 复选框, 单选框, 等等)
主要作用是收集表单数据

## 属性修饰符 .sync

可以实现父子组件数据的同步, 相当于给子组件传了一个 props 为 money, 以及一个自定义事件"update:money"

父组件内: <Child :money.sync='money'>
子组件内: <button @click="$emit('update:money',money-100)">使用</button>

## $attrs, $listeners

组件实例的属性, 可以获取父组件给子组件传递的 props 和自定义事件

## $children, $parent

### $children 是组件实例的属性, 可以获取到所有的子组件实例

    this.$children.forEach(item=>{
        item.money-=200
    })

### $parent 是组件实例的属性, 可以获取到当前子组件的父组件

    this.$parent.money +=50

## 混入 mixin

如果项目当中出现很多结构类似功能, 可以考虑组件服用
如果项目当中很多组件 js 业务逻辑相似, 想到 mixin. 【可以把多个组件 js 相同部分抽离出来, 使用 mixins】

## 插槽

可以实现父子组件通信, 通信的是结构
