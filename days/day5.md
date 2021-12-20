## 12.19

### vuex 中的 getters

相当与是计算属性, 用处是让仓库 state 中的数据更加简洁, 简化数据

```JavaScript
    // vuex
    const getters = {
        goodsList(state) {
            return state.searchList.goodsList || []
        },
        attrsList(state) {
            return state.searchList.attrsList || []
        },
        trademarkList(state) {
            return state.searchList.trademarkList || []
        }
    }
```

```JavaScript
    // 组件中
    computed: {
        ...mapGetters(['goodsList', 'trademarkList', 'attrsList'])
    },
```

state 就是当前仓库的 state

### Object.assign

将 obj2,obj3 对象中的属性合并到 obj1 对象中

```JavaScript
    Object.assign(obj1,obj2,obj3)
```

### 页面自动刷新

#### 在 vue 项目开发时，运用 element-ui 或者 iView 组件的 Form 组件；当 Form 组件中只有一个 Input 组件时，鼠标聚焦输入框后，点击回车键，页面就会刷新。

例如以下代码：

```html
<form action="###" class="searchForm">
  <input
    type="text"
    id="autocomplete"
    class="input-error input-xxlarge"
    v-model.trim="keyword"
    @keyup.enter="goSearch"
    :placeholder="placeHolder"
  />
  <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">
    搜索
  </button>
</form>
```

解决方法:

<form>标签内 添加阻止默认事件

```html
<form action="###" class="searchForm" @submit.prevent>
  <input
    type="text"
    id="autocomplete"
    class="input-error input-xxlarge"
    v-model.trim="keyword"
    @keyup.enter="goSearch"
    :placeholder="placeHolder"
  />
  <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">
    搜索
  </button>
</form>
```

### 全局事件总线

#### 入口函数, 挂载$bus

```JavaScript
  beforeCreate() {
    Vue.prototype.$bus = this
  },
```

#### 触发方法

```JavaScript
  // 全局事件总线方式 清空header组件中的搜索关键字keyword
  this.$bus.$emit('clear')
```

#### 监听方法

```JavaScript
  mounted() {
    // 通过全局事件总线清空keyword
    this.$bus.$on("clear", () => this.keyword = '')
  },
```

## 12.20

### 数组去重

```JavaScript
  attrs.indexOf(attr) == -1 // 找不到的话 为-1, 找得到的话 为attr在attrs中的索引值
  if(attrs.indexOf(attr) == -1){
    // attrs中不包含attr元素, 可以进行push
    attrs.push(attr)
  }
```

### 数组查找元素

```JavaScript
  // 如果attrs数组包含了attr, 删除这个attr
  attrs.splice(attrs.indexOf(attr))
```

### 前端难点: 轮播图, 分页器, 日历
