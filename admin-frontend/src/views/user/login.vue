<template>
  <div class="app-container" style="display: flex">
    <div
      style="
                width: 500px;
                display: inline-block;
                margin: 0 auto;
                margin-top: 100px;
            "
    >
      <div style="margin-bottom: 10px">
        <el-input v-model="phone" maxlength="40" placeholder="手机号" />
      </div>
      <div
        style="
                    margin-bottom: 10px;
                    display: flex;
                    justify-content: space-between;
                "
      >
        <div style="width: 100%; margin-right: 10px">
          <el-input
            v-model="code"
            maxlength="40"
            placeholder="验证码"
          />
        </div>
        <div style="width: 150px">
          <el-button
            type="primary"
            :disabled="codeButtonDisabled"
            style="width: 100%; text-align: center"
            @click="getCode"
          >
            {{ codeButtonText }}
          </el-button>
        </div>
      </div>
      <div style="margin-bottom: 10px; width: 100%">
        <el-button
          :disabled="loginButtonDisabled"
          style="width: 100%"
          type="primary"
          @click="login"
        >登录
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { userLogin } from '@/api/user'
export default {
  data() {
    const redirectUri = this.$route.query.redirectUri || ''
    return {
      phone: '',
      code: '',
      nextSMSCodeDuration: 0,
      ticker: null,
      redirectUri: redirectUri
    }
  },
  computed: {
    currentTimestamp() {
      return Math.round(new Date().getTime() / 1000)
    },
    codeButtonText() {
      if (this.nextSMSCodeDuration > 0) {
        return `下次获取时间${this.nextSMSCodeDuration}s`
      }
      return '获取验证码'
    },
    codeButtonDisabled() {
      if (this.phone.length !== 11) {
        return true
      }
      return this.nextSMSCodeDuration > 0
    },
    loginButtonDisabled() {
      if (this.code.length !== 6) {
        return true
      }
      return false
    }
  },
  created() {
    this.ticker = setInterval(() => {
      if (this.nextSMSCodeDuration > 0) {
        this.nextSMSCodeDuration--
      }
    }, 1000)
  },
  destroyed() {
    clearInterval(this.ticker)
  },
  methods: {
    async getCode() {
      this.nextSMSCodeDuration = 3
      const res = await apiService.SendSMSCode(this.phone)
      console.log('res', res)
    },
    async login() {
      const res = await userLogin({
        phone: this.phone,
        sms_code: this.code
      })
      const accessToken = res.data.access_token
      localStorage.setItem('admin.jwt', accessToken)
      if (this.redirectUri) {
        window.location = this.redirectUri
      } else {
        this.$router.push({ path: '/dashboard' })
      }
    }
  }
}
</script>
