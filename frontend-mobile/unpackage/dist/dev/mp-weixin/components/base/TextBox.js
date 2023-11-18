"use strict";
const library_util = require("../../library/util.js");
const common_vendor = require("../../common/vendor.js");
require("../../library/consts.js");
const _sfc_main = {
  props: {
    label: "",
    value: "",
    placeholder: ""
  },
  methods: {
    copy(data) {
      library_util.copyClipboard(data);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($props.label),
    b: common_vendor.t($props.value || $props.placeholder),
    c: $props.value
  }, $props.value ? {
    d: $props.value
  } : {}, {
    e: common_vendor.o(($event) => $options.copy($props.value))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/base/TextBox.vue"]]);
wx.createComponent(Component);
