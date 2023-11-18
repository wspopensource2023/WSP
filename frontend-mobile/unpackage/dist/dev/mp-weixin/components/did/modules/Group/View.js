"use strict";
const common_vendor = require("../../../../common/vendor.js");
const ModuleView = () => "../ModuleView.js";
const ModulePanelModal = () => "../ModulePanelModal.js";
const _sfc_main = {
  props: {
    readonly: false,
    profile: {},
    config: {},
    index: -1
  },
  data() {
    return {
      currentConfig: null
    };
  },
  components: {
    ModuleView,
    ModulePanelModal
  },
  mounted() {
  },
  computed: {},
  methods: {
    showModulePanel(item) {
      if (item.kind === "Title") {
        return;
      }
      this.currentConfig = item;
      this.$refs.ModulePanelModal.show(this.currentConfig);
    },
    match(item, kind) {
      var _a;
      return ((_a = item.kind) == null ? void 0 : _a.toLowerCase()) === (kind == null ? void 0 : kind.toLowerCase());
    },
    getChildren() {
      var _a, _b;
      return (_b = (_a = this.config) == null ? void 0 : _a.spec) == null ? void 0 : _b.children;
    }
  }
};
if (!Array) {
  const _component_ModuleView = common_vendor.resolveComponent("ModuleView");
  const _component_ModulePanelModal = common_vendor.resolveComponent("ModulePanelModal");
  (_component_ModuleView + _component_ModulePanelModal)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($options.getChildren(), (item, index, i0) => {
      return {
        a: "347821a2-0-" + i0,
        b: common_vendor.p({
          profile: $props.profile,
          config: item
        }),
        c: item,
        d: common_vendor.o(($event) => $options.showModulePanel(item), item)
      };
    }),
    b: common_vendor.sr("ModulePanelModal", "60f754b3-0"),
    c: common_vendor.p({
      profile: $props.profile
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/modules/Group/View.vue"]]);
wx.createComponent(Component);
