"use strict";
require("../../library/apis.js");
const store_storage = require("../../store/storage.js");
const library_consts = require("../../library/consts.js");
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    profile: {}
  },
  data() {
    return {};
  },
  created() {
  },
  computed: {
    accountId() {
      const { state } = store_storage.useStorage();
      return state.accountId;
    },
    style: {
      get() {
        var _a, _b;
        return ((_b = (_a = this == null ? void 0 : this.profile) == null ? void 0 : _a.spec) == null ? void 0 : _b.style) || {};
      },
      set(value) {
        this.profile.spec.style = value;
      }
    }
  },
  methods: {
    // text align
    isTextAlign(value) {
      return this.getTextAlign() === value;
    },
    switchTextAlign(align) {
      this.style[library_consts.PROFILE_CONSTS.KEY_PROFILE_TEXT_ALIGN] = align;
    },
    getTextAlign() {
      return this.style[library_consts.PROFILE_CONSTS.KEY_PROFILE_TEXT_ALIGN] || library_consts.PROFILE_CONSTS.DEFAULT_PROFILE_TEXT_ALIGN;
    },
    getTextAlignActiveClass(value) {
      if (this.isTextAlign(value)) {
        return {
          "tw-border-white": true
        };
      }
      return {};
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.switchTextAlign("left")),
    b: common_vendor.n($options.getTextAlignActiveClass("left")),
    c: common_vendor.o(($event) => $options.switchTextAlign("center")),
    d: common_vendor.n($options.getTextAlignActiveClass("center")),
    e: common_vendor.o(($event) => $options.switchTextAlign("right")),
    f: common_vendor.n($options.getTextAlignActiveClass("right"))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/ThemeText.vue"]]);
wx.createComponent(Component);
