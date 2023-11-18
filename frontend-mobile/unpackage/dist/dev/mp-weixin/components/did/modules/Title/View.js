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
    getTitle() {
      var _a, _b;
      return (_b = (_a = this.config) == null ? void 0 : _a.spec) == null ? void 0 : _b.title;
    },
    getSubTitle() {
      var _a, _b;
      return (_b = (_a = this.config) == null ? void 0 : _a.spec) == null ? void 0 : _b.subtitle;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $options.getTitle()
  }, $options.getTitle() ? {
    b: common_vendor.t($options.getTitle())
  } : {}, {
    c: $options.getSubTitle()
  }, $options.getSubTitle() ? {
    d: common_vendor.t($options.getSubTitle())
  } : {}, {
    e: common_vendor.s($options.getModuleStyle())
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/modules/Title/View.vue"]]);
wx.createComponent(Component);
