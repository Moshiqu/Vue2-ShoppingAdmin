## 12.14

### 函数的防抖与节流

#### 节流: 在规定的间隔时间范围内不会重复触发回调, 只有大于这个时间间隔才会触发回调, 把频繁触发变为少量触发
#### 防抖: 前面的所有的触发都被取消, 最后一次执行在规定的时间之后才会触发, 也就是说如果连续快速的触发, 只会执行一次