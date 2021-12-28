// vee-validate 表单验证
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'

Vue.use(VeeValidate)

VeeValidate.Validator.localize('zh_CN', {
    messages: {
        ...zh_CN.messages,
    },
    attributes: {
        phone: '手机号',
        password: '密码'
    }
})
