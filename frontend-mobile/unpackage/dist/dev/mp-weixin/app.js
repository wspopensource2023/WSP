"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
require("./store/storage.js");
require("./library/apis.js");
require("./library/consts.js");
if (!Math) {
  "./app/mobile/login.js";
  "./app/mobile/achievement/banner.js";
  "./app/mobile/did/banner.js";
  "./app/mobile/user/me.js";
  "./app/mobile/user/edit.js";
  "./app/mobile/achievement/detail.js";
  "./app/mobile/achievement/issuer.js";
  "./app/mobile/achievement/list.js";
  "./app/mobile/did/list.js";
  "./app/mobile/did/edit.js";
  "./app/mobile/did/detail.js";
}
const _sfc_main = {
  onLaunch: async function() {
    common_vendor.index.loadFontFace({
      family: "SourceHanSansCN-Normal",
      source: 'url("https://static.xxxxxx.com/a961763dcf9872d6ffc7ce14d8169c652413cc7f9c54ef8e0db619fd8fe191d3")',
      success() {
        console.log("success");
      },
      fail(err) {
        console.log("fail", err);
      }
    });
  },
  onShow: function() {
  },
  onHide: function() {
  },
  onPageNotFound() {
    console.log("page not found!!!");
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/App.vue"]]);
const pinia = common_vendor.createPinia();
pinia.use(common_vendor.index$1);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  console.log("createSSRApp", app);
  app.use(pinia);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
