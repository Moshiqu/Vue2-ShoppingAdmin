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
