"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: { data: {} },
  data() {
    console.log("achievement", this.data);
    return {};
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $props.data.campaign_image,
    b: $props.data.campaign_image,
    c: common_vendor.t($props.data.campaign_name),
    d: common_vendor.t($props.data.campaign_summary)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/achievement/AchievementItem.vue"]]);
wx.createComponent(Component);
