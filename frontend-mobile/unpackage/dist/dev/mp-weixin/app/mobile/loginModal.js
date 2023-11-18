"use strict";
const common_vendor = require("../../common/vendor.js");
const library_apis = require("../../library/apis.js");
const store_storage = require("../../store/storage.js");
require("../../library/consts.js");
const IconFont = () => "../../components/base/IconFont.js";
const _sfc_main = {
  components: {
    IconFont,
    Icon: common_vendor.Icon
  },
  data() {
    return {
      isWechat: true,
      page: "phone",
      phone: "",
      code: "",
      nextSMSCodeDuration: 0,
      ticker: null
    };
  },
  computed: {
    currentTimestamp() {
      return Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3);
    },
    codeButtonText() {
      if (this.nextSMSCodeDuration > 0) {
        return `下次获取时间 ${this.nextSMSCodeDuration} s`;
      }
      return "获取验证码";
    },
    codeButtonDisabled() {
      if (this.phone.length !== 11) {
        return true;
      }
      return this.nextSMSCodeDuration > 0;
    },
    loginButtonDisabled() {
      if (this.code.length !== 6) {
        return true;
      }
      return false;
    }
  },
  created() {
    this.ticker = setInterval(() => {
      if (this.nextSMSCodeDuration > 0) {
        this.nextSMSCodeDuration--;
      }
    }, 1e3);
  },
  destroyed() {
    clearInterval(this.ticker);
  },
  methods: {
    show() {
      this.$refs.moduleConfig.open("bottom");
    },
    hide() {
      this.$refs.moduleConfig.close();
    },
    isPage(page) {
      return this.page === page;
    },
    switchPage(page) {
      this.page = page;
    },
    async getCode() {
      await library_apis.apiService.SendSMSCode(this.phone);
      this.nextSMSCodeDuration = 10;
      this.switchPage("code");
    },
    async login() {
      const res = await library_apis.apiService.Login(this.phone, this.code);
      this.comsumeLoginRes(res);
    },
    async loginByWeixinPhone(e) {
      const res = await library_apis.apiService.LoginByWeixinPhone(e.detail.code);
      this.comsumeLoginRes(res);
    },
    comsumeLoginRes(res) {
      const {
        commitJWT
      } = store_storage.useStorage();
      const {
        commitMe
      } = store_storage.useStorage();
      commitJWT(res.access_token);
      commitMe(res);
      this.hide();
    }
  }
};
if (!Array) {
  const _component_IconFont = common_vendor.resolveComponent("IconFont");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_component_IconFont + _easycom_uni_popup2)();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.hide && $options.hide(...args)),
    b: $options.isPage("phone")
  }, $options.isPage("phone") ? common_vendor.e({
    c: $data.isWechat
  }, $data.isWechat ? {
    d: common_vendor.o((...args) => $options.loginByWeixinPhone && $options.loginByWeixinPhone(...args))
  } : {}, {
    e: !$data.isWechat
  }, !$data.isWechat ? {
    f: $data.phone,
    g: common_vendor.o(($event) => $data.phone = $event.detail.value),
    h: common_vendor.t($options.codeButtonText),
    i: $options.codeButtonDisabled,
    j: common_vendor.o((...args) => $options.getCode && $options.getCode(...args))
  } : {}) : {}, {
    k: $options.isPage("code")
  }, $options.isPage("code") ? {
    l: common_vendor.o(($event) => $options.switchPage("phone")),
    m: common_vendor.p({
      size: "1rem",
      name: "jiantou-zuo"
    }),
    n: common_vendor.t($data.phone),
    o: $data.code,
    p: common_vendor.o(($event) => $data.code = $event.detail.value),
    q: $options.loginButtonDisabled,
    r: common_vendor.o((...args) => $options.login && $options.login(...args))
  } : {}, {
    s: common_vendor.sr("moduleConfig", "36559ef0-0")
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/app/mobile/loginModal.vue"]]);
wx.createComponent(Component);
