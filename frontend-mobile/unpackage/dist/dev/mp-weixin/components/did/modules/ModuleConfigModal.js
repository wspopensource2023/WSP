"use strict";
const common_vendor = require("../../../common/vendor.js");
const library_consts = require("../../../library/consts.js");
const SPIcon = () => "../../base/SPIcon.js";
const IconFont = () => "../../base/IconFont.js";
const ModuleConfig = () => "./ModuleConfig.js";
const _sfc_main = {
  props: {
    config: {},
    profile: {},
    groupIndex: -1,
    moduleIndex: -1
  },
  components: {
    SPIcon,
    IconFont,
    ModuleConfig
  },
  data() {
    return {};
  },
  computed: {
    title() {
      const item = library_consts.getModuleByKind(this.config.kind);
      if (item) {
        return `编辑` + item.name + "模块";
      }
      return "编辑内容";
    }
  },
  methods: {
    show() {
      this.$refs.editModal.open("bottom");
    },
    confirm() {
      this.$refs.editModal.close();
    },
    onDelete() {
      this.back();
    },
    back() {
      this.$refs.editModal.close();
    }
  }
};
if (!Array) {
  const _component_ModuleConfig = common_vendor.resolveComponent("ModuleConfig");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_component_ModuleConfig + _easycom_uni_popup2)();
}
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($options.title),
    b: common_vendor.o($options.back),
    c: common_vendor.o($options.confirm),
    d: common_vendor.o($options.onDelete),
    e: common_vendor.p({
      profile: $props.profile,
      config: $props.config,
      groupIndex: $props.groupIndex,
      moduleIndex: $props.moduleIndex
    }),
    f: common_vendor.sr("editModal", "3a88d291-0")
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/modules/ModuleConfigModal.vue"]]);
wx.createComponent(Component);
