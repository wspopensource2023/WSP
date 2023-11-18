"use strict";
const common_vendor = require("../../../../common/vendor.js");
const SPIcon = () => "../../../base/SPIcon.js";
const _sfc_main = {
  props: {
    name: "",
    image: "",
    description: "",
    participants: 0
  },
  components: {
    SPIcon
  },
  data() {
    return {};
  },
  mounted() {
  },
  methods: {
    getParticipants() {
      return this.participants || 0;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $props.image,
    b: $props.name,
    c: common_vendor.t($props.name),
    d: common_vendor.t($props.description),
    e: common_vendor.t($options.getParticipants())
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/modules/AchievementIssued/AchievementItem.vue"]]);
wx.createComponent(Component);
