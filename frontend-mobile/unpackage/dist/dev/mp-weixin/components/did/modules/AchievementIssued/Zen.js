"use strict";
const common_vendor = require("../../../../common/vendor.js");
const ModuleZenItem = () => "../ModuleZenItem.js";
const _sfc_main = {
  props: {
    config: {},
    profile: {}
  },
  components: {
    ModuleZenItem
  },
  data() {
    return {};
  },
  methods: {
    getIcon() {
      return "achievement-issued";
    },
    getTitle() {
      return "发行成就";
    },
    getSubtitle() {
      return "Achievements Issued";
    }
  }
};
if (!Array) {
  const _component_ModuleZenItem = common_vendor.resolveComponent("ModuleZenItem");
  _component_ModuleZenItem();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      icon: $options.getIcon(),
      title: $options.getTitle(),
      subtitle: $options.getSubtitle()
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/modules/AchievementIssued/Zen.vue"]]);
wx.createComponent(Component);
