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
    accountId() {
      const storage = store_storage.useStorage();
      return storage.$state.accountId;
    },
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
  onShow() {
    if (this.accountId) {
      common_vendor.index.switchTab({
        url: "/app/mobile/achievement/list"
      });
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
    jumpVisit() {
      common_vendor.index.switchTab({
        url: "/app/mobile/achievement/list"
      });
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
      common_vendor.index.switchTab({
        url: "/app/mobile/achievement/list"
      });
    }
  }
};
if (!Array) {
  const _component_IconFont = common_vendor.resolveComponent("IconFont");
  _component_IconFont();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $options.isPage("phone")
  }, $options.isPage("phone") ? common_vendor.e({
    b: $data.isWechat
  }, $data.isWechat ? {
    c: common_vendor.o((...args) => $options.loginByWeixinPhone && $options.loginByWeixinPhone(...args)),
    d: common_vendor.o((...args) => $options.jumpVisit && $options.jumpVisit(...args))
  } : {}, {
    e: !$data.isWechat
  }, !$data.isWechat ? {
    f: $data.phone,
    g: common_vendor.o(($event) => $data.phone = $event.detail.value),
    h: common_vendor.t($options.codeButtonText),
    i: $options.codeButtonDisabled,
    j: common_vendor.o((...args) => $options.getCode && $options.getCode(...args)),
    k: common_vendor.o((...args) => $options.jumpVisit && $options.jumpVisit(...args))
  } : {}) : {}, {
    l: $options.isPage("code")
  }, $options.isPage("code") ? {
    m: common_vendor.p({
      size: "2rem",
      name: "jiantou-zuo"
    }),
    n: common_vendor.o(($event) => $options.switchPage("phone")),
    o: common_vendor.t($data.phone),
    p: $data.code,
    q: common_vendor.o(($event) => $data.code = $event.detail.value),
    r: $options.loginButtonDisabled,
    s: common_vendor.o((...args) => $options.login && $options.login(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/app/mobile/login.vue"]]);
wx.createPage(MiniProgramPage);
