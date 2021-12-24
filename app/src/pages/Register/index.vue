<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go">
          我有账号，去
          <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input
          type="text"
          placeholder="请输入你的手机号"
          v-model.trim="phoneNum"
          maxlength="11"
          @change="phoneNumChange"
        />
        <span class="error-msg">{{ phoneNumError }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model.number.trim="code" maxlength="6" />
        <button class="verify_btn" @click="getCode" v-if="timerNum == 61">获取验证码</button>
        <button class="verify_btn" disabled v-else>重新发送({{ timerNum }}S)</button>
        <span class="error-msg">{{ codeError }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          type="text"
          placeholder="请输入你的登录密码"
          @change="passwordCheck"
          v-model="password"
          minlength="8"
          maxlength="16"
        />
        <span class="error-msg">{{ passwordError }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          type="text"
          placeholder="请输入确认密码"
          @change="repasswordChange"
          v-model="repassword"
          minlength="8"
          maxlength="16"
        />
        <span class="error-msg">{{ repasswordError }}</span>
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" v-model="isCheckProtocol" />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ isCheckProtocolError }}</span>
      </div>
      <div class="btn">
        <button @click="register">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      phoneNum: '', // 手机号
      phoneNumError: '', // 手机号错误提示
      code: '', //验证码
      codeError: '', // 验证码错误信息
      timer: null, // 验证码的定时器
      timerNum: 61, // 验证码倒计时
      password: '', // 密码
      passwordError: "",// 密码错误信息
      repassword: '', // 校验密码
      repasswordError: "", // 校验密码错误信息,
      isCheckProtocol: false, // 协议是否勾选
      isCheckProtocolError: '', // 协议错误信息
    }
  },
  computed: {

  },
  watch: {
    phoneNum(nv) {
      this.phoneNumError = !nv ? '' : this.phoneNumError
    },
    password(nv) {
      this.passwordError = !nv ? '' : this.passwordError
    },
    repassword(nv, ov) {
      this.repasswordError = !nv ? '' : this.repasswordError
    },
    code(nv) {
      this.codeError = !nv ? '' : this.codeError
    },
    isCheckProtocol(nv) {
      this.isCheckProtocolError = nv ? '' : "请勾选协议"
    },

  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  },
  methods: {
    // 获取验证码
    async getCode() {
      // 验证码获取间隔是否小于一分钟
      // 定时器已存在
      if (this.timer || !this.phoneNumChange()) return

      // 验证手机号是否合规

      try {
        await this.$store.dispatch('getCode', this.phoneNum)
        // 发送验证码成功, 开启定时器, 倒计时
        if (!this.timer) {
          // 定时器不存在, 或已经被清除
          this.timer = setInterval(() => {
            if (this.timerNum > 0) {
              // 倒计时大于0
              this.timerNum--
            } else {
              // 倒计时等于或小于0, 清除定时器
              this.timerNum = 61
              clearInterval(this.timer)
              this.timer = null
            }
          }, 1000);
        }
      } catch (error) {
        alert(error.message)
      }
    },
    phoneNumChange() {
      if (!this.phoneNumCheckPattern()) {
        this.phoneNumError = '手机号码格式不正确, 请重新输入'
        return false
      }
      this.phoneNumError = ''
      return true
    },
    // 手机号判断
    phoneNumCheckPattern() {
      const pattern = /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
      const flag = pattern.test(this.phoneNum)
      return flag
    },
    // 密码判断
    passwordCheckPattern() {
      const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/
      const flag = pattern.test(this.password)
      return flag
    },
    // 确认密码框
    repasswordChange() {
      if (!this.password) {
        this.repasswordError = '请先输入密码'
        return
      }
      if (this.password != this.repassword) {
        this.repasswordError = '两次密码不同'
        return
      }
      this.repasswordError = ''
    },
    // 密码框
    passwordCheck() {
      if (this.passwordCheckPattern()) {
        this.passwordError = ''
      } else {
        this.passwordError = '密码格式不正确: 至少8-16个字符，至少1个大写字母，1个小写字母和1个数字'
      }
    },
    // 注册
    async register() {
      const { phoneNumError, passwordError, repasswordError, isCheckProtocol, phoneNum, password, code, repassword } = this
      if (!phoneNum) {
        this.phoneNumError = '请输入手机号'
      }
      if (!code) {
        this.codeError = '请输入验证码'
      }
      if (!password) {
        this.passwordError = '请输入密码'
      }
      if (!repassword) {
        this.repasswordError = '请再次输入密码'
      } else if (repassword != password) {
        this.repasswordError = '两次密码输入不一致'
      }
      if (!isCheckProtocol) {
        this.isCheckProtocolError = '请勾选协议'
      }

      if (!phoneNumError && !passwordError && !repasswordError && isCheckProtocol) {
        // 注册
        const sendData = {
          phone: phoneNum,
          password: password,
          code
        }
        try {
          await this.$store.dispatch('register', sendData)
          this.$router.push('/login')
        } catch (error) {
          switch (error.code) {
            case 223:
              alert(error.message)
              break;
            case 206:
              this.codeError = error.message
              break;

            default:
              alert(error.message)
              break;
          }
        }
      } else {
        return
      }
    }
  },
}
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .verify_btn {
        width: 100px;
        height: 38px;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>