## 1.7 
### canvas
1. canvas是html的一个双闭合标签 
2. 是个画布
3. 所有的绘制都只能通过js来进行操作
4. canvas的宽高只能写在标签内, 不能用css样式来声明

#### 创建canvas

```JavaScript
// 首先，找到 <canvas> 元素:
// HTML
<canvas width="600" height="600"></canvas>
//

var c=document.getElementById("myCanvas");
// 然后，创建 context 对象：

var ctx=c.getContext("2d");
// getContext("2d") 对象是内建的 HTML5 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。
```

#### canvas 坐标

canvas 是一个二维网格。
canvas 的左上角坐标为 (0,0)
上面的 fillRect 方法拥有参数 (0,0,150,75)。
意思是：在画布上绘制 150x75 的矩形，从左上角开始 (0,0)。

#### canvas 路径
在Canvas上画线，我们将使用以下两种方法：
ctx.moveTo(x,y) 定义线条开始坐标: 开始坐标只能有一个
ctx.lineTo(x,y) 定义线条结束坐标: 结束坐标可以有很多个
ctx.closePath() 将开始坐标与结束坐标连接
ctx.stroke() 结束绘制, 必须要有结束绘制的指令

```JavaScript
    let canvas = document.querySelector("canvas")
    let ctx = canvas.getContext('2d')
    ctx.moveTo(100, 100)
    ctx.lineTo(150, 150)
    ctx.lineTo(300, 200)
    ctx.closePath()
    ctx.stroke()
```

#### 颜色填充
设置图形填充的颜色

```JavaScript
    ctx.fillStyle = 'red'
    ctx.fill()
```