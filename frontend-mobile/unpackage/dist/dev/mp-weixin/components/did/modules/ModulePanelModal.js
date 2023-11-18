"use strict";
const common_vendor = require("../../../common/vendor.js");
const ModulePanel = () => "./ModulePanel.js";
const _sfc_main = {
  components: {
    ModulePanel
  },
  props: {
    profile: {}
  },
  data() {
    return {
      config: {}
    };
  },
  methods: {
    show(item) {
      console.log("show", item);
      this.config = item;
      this.$refs.modal.open("bottom");
    },
    hide() {
      this.$refs.modal.close();
    }
  }
};
if (!Array) {
  const _component_ModulePanel = common_vendor.resolveComponent("ModulePanel");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_component_ModulePanel + _easycom_uni_popup2)();
}
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.hide && $options.hide(...args)),
    b: common_vendor.p({
      profile: $props.profile,
      config: $data.config
    }),
    c: common_vendor.sr("modal", "d67f931a-0")
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/modules/ModulePanelModal.vue"]]);
wx.createComponent(Component);
