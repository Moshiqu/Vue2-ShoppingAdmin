<template>
  <div class="spec-preview">
    <img :src="skuImageList[currentImg] && skuImageList[currentImg].imgUrl" />
    <div class="event" @mousemove="moveHandler" ref="moveBoxRef"></div>
    <div class="big">
      <img :src="skuImageList[currentImg] && skuImageList[currentImg].imgUrl" :style="bigZoomStyle" />
    </div>
    <div class="mask" :style="maskStyle" ref="maskRef"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: {
    skuImageList: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      currentImg: 0, // 当前放大的图片的索引
      mask: {}, // mask相对于图片移动的距离
      times: 0, // 放大的倍率
    }
  },
  computed: {
    maskStyle() {
      const { x, y } = this.mask
      return {
        left: x + 'px',
        top: y + 'px'
      }
    },
    bigZoomStyle() {
      const { x, y } = this.mask
      return {
        left: -(x * this.times) + 'px',
        top: -(y * this.times) + 'px'
      }
    }
  },
  mounted() {
    this.$bus.$on('changeImg', index => this.currentImg = index)
  },
  methods: {
    moveHandler(e) {
      // mask遮罩层的宽高
      const maskWidth = this.$refs.maskRef.offsetWidth
      const maskHieght = this.$refs.maskRef.offsetHeight
      let x = 0, y = 0 // 偏移量

      // 偏移量为鼠标的偏移减去mask遮罩层偏移的一般
      x = e.offsetX - maskWidth / 2
      y = e.offsetY - maskHieght / 2

      // 图片的宽高
      const moveBoxWidth = this.$refs.moveBoxRef.offsetWidth
      const moveBoxHeight = this.$refs.moveBoxRef.offsetHeight

      const xScope = moveBoxWidth - maskWidth // x的最大偏移范围
      const yScope = moveBoxHeight - maskHieght // x的最大偏移范围

      // 放大的倍率
      this.times = parseInt(moveBoxWidth / maskWidth)

      x = x < 0 ? 0 : x
      x = x > xScope ? xScope : x

      y = y < 0 ? 0 : y
      y = y > yScope ? yScope : y

      this.mask = {
        x, y
      }
    }
  },
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>