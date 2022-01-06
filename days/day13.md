# 后台管理

swagger：
http://39.98.123.211:8170/swagger-ui.html
http://39.98.123.211:8216/swagger-ui.html

## 12.29

### mock 的接口替换为真实接口

需要配置跨域

### 一个对象赋值给另一个对象

一个对象赋值给另一个对象, 这种情况需要注意:
不能直接使 this.tradeMarkForm = tradeMark
因为 this.tradeMarkForm 和 tradeMark 都是对象, 直接赋值的话会使两个变量指向同一个地址
this.tradeMarkForm,tradeMark 对象内都是简单类型的数据, 可以使用浅拷贝

```JavaScript
    this.tradeMarkForm = { ...tradeMark }
```

## 12.30

## 1.3

### 深拷贝

#### 先将复杂的对象转为字符串, 再将字符串转为对象

```JavaScript
    this.attrInfo = JSON.parse(JSON.stringify(attr));
```

#### 引用 lodash

### Vue.$set

Vue.set( target, propertyName/index, value )

Vue 无法探测普通的新增 property (比如 this.myObject.newProperty = 'hi')
Vue 只能检测到数组的修改和替换, 无法检测到新增

```JavaScript

    this.attrInfo.attrValueList.forEach((item) => {
    //   item.flag = false; // 这里新增的flag不是响应式布局
        this.$set(item, "flag", false);
    });
```

### 重绘 重排

点击 span 的时候, 切换为 input 变为编辑模式, 但是需要注意, 对于浏览器而言, 页面的重绘和重排都是耗时间的
点击 span 的时候, 重绘重排一个 input 他是需要耗费事件的, 所以不可能一点击 span 就立马获取到 ref

```JavaScript
    this.$nextTick(() => {
      this.$refs[index].focus();
    });
```

## 1.4

## 1.5

### 清理数据, 使data中的数据恢复为最初的样子(初始化时的版本)
```JavaScript
    // Object.assign() ES6中 合并对象的方法
    // 组件实例 this._data, 可以操作data当中响应式数据
    // this.$options可以获取配置对象, 配置对象的data函数执行, 返回响应式数据
    Object.assign(this._data, this.$options.data())
```

### 对象新增键值对
```JavaScript
    // this.spuInfo.spuImageList 为一个全是对象的数组
    // Array.map() 映射
    // 使this.spuInfo.spuImageList数组中的所有对象新增imgName, 并且imgName的值为对象中的name的值
    this.spuInfo.spuImageList = this.spuImageList.map(item => {
        return {
            imgName: item.name,
            imgUrl: (item.response && item.response.data) || item.url
        }
    })
```

## 1.6

### 深度选择器

#### scoped属性的作用 ---------加上scoped的作用是只是对于当前的组件有用(样式)
对于某一个组件, 如果style添加上scoped的属性, 给当前子组件的结构中都添加上一个data-v-xxxx自定义属性
会发现vue是通过属性选择器,给需要添加的元素添加上样式
h3[data-v-7ba5bd90]

#### 子组件的根标签(用于父组件当中自定义属性:一样的), 如果自组建的根节点, 和父组件中书写的样式相同, 也会添加上相应的样式

#### 如果父组件的样式(scoped), 而且还想影响到子组件的样式, 需要使用深度选择器
深度选择器可以实现样式穿透
##### 原生CSS  >>>

##### less /deep/

##### scss ::v-deep