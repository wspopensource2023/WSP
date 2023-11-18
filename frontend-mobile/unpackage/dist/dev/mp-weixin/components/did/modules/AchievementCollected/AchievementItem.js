"use strict";
const common_vendor = require("../../../../common/vendor.js");
const SPIcon = () => "../../../base/SPIcon.js";
const _sfc_main = {
  props: {
    name: "",
    image: "",
    issuer: {},
    verified: false
  },
  components: {
    SPIcon
  },
  data() {
    return {};
  },
  mounted() {
  },
  methods: {}
};
if (!Array) {
  const _component_SPIcon = common_vendor.resolveComponent("SPIcon");
  _component_SPIcon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.image,
    b: $props.name,
    c: common_vendor.t($props.name || "未命名成就"),
    d: $props.verified
  }, $props.verified ? {
    e: common_vendor.p({
      size: "1rem",
      config: "verified"
    })
  } : {}, {
    f: $props.issuer.avatar,
    g: common_vendor.t($props.issuer.name || "未知发行方")
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/modules/AchievementCollected/AchievementItem.vue"]]);
wx.createComponent(Component);
