"use strict";
const common_vendor = require("../../../common/vendor.js");
const SPIcon = () => "../../base/SPIcon.js";
const _sfc_main = {
  props: {
    groupIndex: -1,
    moduleIndex: -1,
    title: "",
    description: "",
    icon: ""
  },
  components: {
    SPIcon
  },
  methods: {
    deleteModule() {
      this.$emit("delete");
    }
  }
};
if (!Array) {
  const _component_SPIcon = common_vendor.resolveComponent("SPIcon");
  _component_SPIcon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      size: "1.3rem",
      config: $props.icon
    }),
    b: common_vendor.t($props.title),
    c: $props.moduleIndex >= 0
  }, $props.moduleIndex >= 0 ? {
    d: common_vendor.o((...args) => $options.deleteModule && $options.deleteModule(...args))
  } : {}, {
    e: common_vendor.t($props.description)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/modules/ModuleConfigHeader.vue"]]);
wx.createComponent(Component);
