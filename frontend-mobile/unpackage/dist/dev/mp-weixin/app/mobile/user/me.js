"use strict";
const common_vendor = require("../../../common/vendor.js");
const store_storage = require("../../../store/storage.js");
const library_apis = require("../../../library/apis.js");
require("../../../library/consts.js");
const IconFont = () => "../../../components/base/IconFont.js";
const _sfc_main = {
  data() {
    return {
      me: {}
    };
  },
  computed: {
    accountId() {
      const storage = store_storage.useStorage();
      return storage.$state.accountId;
    },
    avatar() {
      var _a;
      return ((_a = this.me) == null ? void 0 : _a.avatar) || store_storage.getDefaultAvatar();
    },
    name() {
      var _a;
      return ((_a = this.me) == null ? void 0 : _a.name) || store_storage.getDefaultName();
    },
    description() {
      var _a;
      return ((_a = this.me) == null ? void 0 : _a.desc) || store_storage.getDefaultDescription();
    },
    banner() {
      var _a;
      return (_a = this.me) == null ? void 0 : _a.banner;
    }
  },
  async onShow() {
    await this.loadMe();
  },
  methods: {
    updateMe() {
      common_vendor.index.navigateTo({
        url: `/app/mobile/user/edit`
      });
    },
    async loadMe() {
      try {
        const res = await library_apis.apiService.Me(true);
        this.me = res;
      } catch (e) {
        this.me = {};
      }
    },
    logout() {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            const { clear } = store_storage.useStorage();
            clear();
            common_vendor.index.navigateTo({
              url: "/app/mobile/login"
            });
          }
        }
      });
    }
  },
  components: {
    IconFont
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $options.avatar,
    b: common_vendor.t($options.name),
    c: common_vendor.t($options.description),
    d: common_vendor.o((...args) => $options.updateMe && $options.updateMe(...args)),
    e: common_vendor.o((...args) => $options.updateMe && $options.updateMe(...args)),
    f: common_vendor.o((...args) => $options.logout && $options.logout(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/app/mobile/user/me.vue"]]);
wx.createPage(MiniProgramPage);
