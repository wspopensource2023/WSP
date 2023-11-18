"use strict";
const library_consts = require("../../library/consts.js");
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    value: "",
    default: library_consts.PROFILE_CONSTS.DEFAULT_ACCOUNT_BANNER
  },
  methods: {
    getImage() {
      return this.value || this.default;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: `url(${$options.getImage()})`
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/base/BannerView.vue"]]);
wx.createComponent(Component);
