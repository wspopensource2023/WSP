"use strict";
require("../../library/apis.js");
const common_vendor = require("../../common/vendor.js");
require("../../store/storage.js");
require("../../library/consts.js");
const _sfc_main = {
  props: { data: {} },
  data() {
    console.log("data", this.data);
    return {};
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $props.data.campaign_image,
    b: $props.data.campaign_name,
    c: common_vendor.t($props.data.campaign_name),
    d: common_vendor.t($props.data.campaign_summary)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/achievement/CampaignItem.vue"]]);
wx.createComponent(Component);
