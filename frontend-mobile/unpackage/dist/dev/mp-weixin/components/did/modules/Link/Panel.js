"use strict";
const library_util = require("../../../../library/util.js");
const common_vendor = require("../../../../common/vendor.js");
require("../../../../library/consts.js");
const SPIcon = () => "../../../base/SPIcon.js";
const IconFont = () => "../../../base/IconFont.js";
const TextBox = () => "../../../base/TextBox.js";
const ButtonBox = () => "../../../base/ButtonBox.js";
const TextareaBox = () => "../../../base/TextareaBox.js";
const _sfc_main = {
  props: {
    config: {},
    profile: {}
  },
  components: {
    SPIcon,
    IconFont,
    TextBox,
    ButtonBox,
    TextareaBox
  },
  data() {
    return {};
  },
  methods: {
    copy(data) {
      library_util.copyClipboard(data);
      this.$refs.toast.show(`${data} 已经复制到剪切板`);
    },
    open(url) {
      library_util.openLink(url);
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
  const _component_TextBox = common_vendor.resolveComponent("TextBox");
  const _component_ButtonBox = common_vendor.resolveComponent("ButtonBox");
  (_component_SPIcon + _component_TextBox + _component_ButtonBox)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      config: $options.getIcon()
    }),
    b: common_vendor.t($options.getTitle() || "暂无标题"),
    c: common_vendor.t($options.getSubtitle() || "暂无描述"),
    d: common_vendor.p({
      label: "链接",
      placeholder: "暂未录入链接",
      value: $props.config.spec.url
    }),
    e: common_vendor.o(($event) => $options.open($props.config.spec.url)),
    f: common_vendor.p({
      label: "在浏览器中访问"
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/modules/Link/Panel.vue"]]);
wx.createComponent(Component);
