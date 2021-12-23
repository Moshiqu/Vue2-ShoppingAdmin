## 12.14

### 函数的防抖与节流

安装 lodash

#### 节流: 在规定的间隔时间范围内不会重复触发回调, 只有大于这个时间间隔才会触发回调, 把频繁触发变为少量触发

```JavaScript
import throttle from 'lodash/throttle'

methods:{
    // 需要节流的函数用throttle包裹, 包裹的代码里有this, 最好用function声明函数
    changeCurrentIndex: throttle(function (index) {
        this.currentIndex = index
    }, 50),
}
```

#### 防抖: 前面的所有的触发都被取消, 最后一次执行在规定的时间之后才会触发, 也就是说如果连续快速的触发, 只会执行一次
