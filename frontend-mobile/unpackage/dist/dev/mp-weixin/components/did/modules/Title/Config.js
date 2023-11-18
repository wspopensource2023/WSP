"use strict";
const common_vendor = require("../../../../common/vendor.js");
const SPIcon = () => "../../../base/SPIcon.js";
const ModuleConfigHeader = () => "../ModuleConfigHeader.js";
const TextInput = () => "../../../base/TextInput.js";
const _sfc_main = {
  props: {
    moduleIndex: -1,
    groupIndex: -1,
    config: {}
  },
  components: {
    SPIcon,
    ModuleConfigHeader,
    TextInput
  },
  data() {
    return {};
  },
  methods: {
    create() {
    },
    deleteModule() {
      this.$emit("delete");
    },
    confirm() {
      this.$emit("confirm");
    },
    back() {
      this.$emit("back");
    }
  }
};
if (!Array) {
  const _component_ModuleConfigHeader = common_vendor.resolveComponent("ModuleConfigHeader");
  const _component_TextInput = common_vendor.resolveComponent("TextInput");
  (_component_ModuleConfigHeader + _component_TextInput)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.deleteModule),
    b: common_vendor.p({
      groupIndex: $props.groupIndex,
      moduleIndex: $props.moduleIndex,
      icon: "title",
      title: "标题",
      description: "添加一个标题，来对列表进行简单的分类"
    }),
    c: common_vendor.o(($event) => $props.config.spec.title = $event),
    d: common_vendor.p({
      label: "标题",
      placeholder: "请输入标题",
      modelValue: $props.config.spec.title
    }),
    e: common_vendor.o(($event) => $props.config.spec.subtitle = $event),
    f: common_vendor.p({
      label: "描述",
      placeholder: "请输入描述",
      modelValue: $props.config.spec.subtitle
    }),
    g: common_vendor.o((...args) => $options.back && $options.back(...args)),
    h: common_vendor.o((...args) => $options.confirm && $options.confirm(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/modules/Title/Config.vue"]]);
wx.createComponent(Component);
