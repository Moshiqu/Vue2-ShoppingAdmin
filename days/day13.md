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
