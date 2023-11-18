"use strict";
const common_vendor = require("../../../../common/vendor.js");
const SPIcon = () => "../../../base/SPIcon.js";
const _sfc_main = {
  props: {
    config: {}
  },
  components: {
    SPIcon
  },
  data() {
    return {};
  },
  methods: {
    create() {
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.config.spec.title || "暂无标题"),
    b: common_vendor.t($props.config.spec.subtitle),
    c: common_vendor.t($props.config.spec.content || "暂无内容")
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/modules/Story/Panel.vue"]]);
wx.createComponent(Component);
