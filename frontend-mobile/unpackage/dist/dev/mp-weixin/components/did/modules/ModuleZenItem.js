"use strict";
require("../../../library/apis.js");
const common_vendor = require("../../../common/vendor.js");
require("../../../store/storage.js");
require("../../../library/consts.js");
const SPIcon = () => "../../base/SPIcon.js";
const IconFont = () => "../../base/IconFont.js";
const _sfc_main = {
  props: {
    title: "",
    subtitle: "",
    icon: ""
  },
  components: {
    SPIcon,
    IconFont
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    getTitle() {
      return this.title;
    },
    getSubtitle() {
      return this.subtitle;
    },
    getIcon() {
      return this.icon;
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
      config: $options.getIcon()
    }),
    b: common_vendor.t($options.getTitle()),
    c: common_vendor.t($options.getSubtitle())
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/modules/ModuleZenItem.vue"]]);
wx.createComponent(Component);
