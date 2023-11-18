"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    label: "",
    value: ""
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.label)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/base/ButtonBox.vue"]]);
wx.createComponent(Component);
