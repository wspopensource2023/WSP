"use strict";
const common_vendor = require("../../../../common/vendor.js");
const ModuleCreateModal = () => "../ModuleCreateModal.js";
const _sfc_main = {
  props: {
    readonly: false,
    profile: {},
    config: {},
    index: -1
  },
  components: {
    ModuleCreateModal
  },
  data() {
    return {
      currentConfig: null
    };
  },
  mounted() {
  },
  computed: {},
  methods: {
    editing(info) {
      this.$emit("editing", info);
    },
    deleteModule(group, index) {
      group.spec.children.splice(index, 1);
    },
    createModule() {
      this.$refs.ModuleCreateModal.show();
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
  const _component_ModuleCreateModal = common_vendor.resolveComponent("ModuleCreateModal");
  _component_ModuleCreateModal();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($options.getChildren(), (item, index, i0) => {
      return {
        a: "item-" + i0,
        b: common_vendor.r("item", {
          item,
          index,
          editable: true
        }, i0),
        c: item
      };
    }),
    b: common_vendor.o((...args) => $options.createModule && $options.createModule(...args)),
    c: common_vendor.sr("ModuleCreateModal", "64ea2705-0"),
    d: common_vendor.p({
      profile: $props.profile,
      config: $props.config
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/modules/Group/Zen.vue"]]);
wx.createComponent(Component);
