"use strict";
const common_vendor = require("../../../../common/vendor.js");
const SPIcon = () => "../../../base/SPIcon.js";
const _sfc_main = {
  props: {
    config: {},
    profile: {}
  },
  components: {
    SPIcon
  },
  data() {
    return {};
  },
  methods: {
    getModuleStyle() {
      return this.profile.spec.style["module.css"] || {};
    },
    getIcon() {
      var _a, _b;
      return (_b = (_a = this.config) == null ? void 0 : _a.spec) == null ? void 0 : _b.icon;
    },
    getTitle() {
      var _a, _b;
      return (_b = (_a = this.config) == null ? void 0 : _a.spec) == null ? void 0 : _b.title;
    },
    getSubtitle() {
      var _a, _b;
      return (_b = (_a = this.config) == null ? void 0 : _a.spec) == null ? void 0 : _b.subtitle;
    }
  }
};
if (!Array) {
  const _component_SPIcon = common_vendor.resolveComponent("SPIcon");
  _component_SPIcon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      size: "",
      config: $options.getIcon()
    }),
    b: common_vendor.t($options.getTitle()),
    c: common_vendor.t($options.getSubtitle()),
    d: common_vendor.s($options.getModuleStyle())
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/modules/Weibo/View.vue"]]);
wx.createComponent(Component);
