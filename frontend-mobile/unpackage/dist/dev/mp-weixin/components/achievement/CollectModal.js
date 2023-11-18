"use strict";
const common_vendor = require("../../common/vendor.js");
const SPIcon = () => "../base/SPIcon.js";
const SBTImage = () => "./SBTImage.js";
const _sfc_main = {
  props: {
    achievement: {}
  },
  components: {
    SPIcon,
    Icon: common_vendor.Icon,
    SBTImage
  },
  data() {
  },
  methods: {
    show() {
      this.$refs.popup.open("center");
    },
    hide() {
      this.$refs.popup.close();
    }
  }
};
if (!Array) {
  const _component_SBTImage = common_vendor.resolveComponent("SBTImage");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_component_SBTImage + _easycom_uni_popup2)();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      image: $props.achievement.achievement_image
    }),
    b: common_vendor.t($props.achievement.achievement_name),
    c: common_vendor.t($props.achievement.achievement_summary),
    d: common_vendor.o((...args) => $options.hide && $options.hide(...args)),
    e: common_vendor.sr("popup", "1ad7cd6e-0"),
    f: common_vendor.p({
      ["mask-background-color"]: "rgb(0, 0, 0, 0.9)"
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/achievement/CollectModal.vue"]]);
wx.createComponent(Component);
