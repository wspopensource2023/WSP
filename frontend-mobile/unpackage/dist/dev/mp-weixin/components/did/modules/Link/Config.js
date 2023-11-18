"use strict";
const common_vendor = require("../../../../common/vendor.js");
const SPIcon = () => "../../../base/SPIcon.js";
const ModuleConfigHeader = () => "../ModuleConfigHeader.js";
const IconInput = () => "../../../base/IconInput.js";
const TextInput = () => "../../../base/TextInput.js";
const _sfc_main = {
  props: {
    moduleIndex: -1,
    groupIndex: -1,
    config: {}
  },
  components: {
    IconInput,
    TextInput,
    SPIcon,
    ModuleConfigHeader
  },
  data() {
    return {};
  },
  methods: {
    create() {
    },
    confirm() {
      this.$emit("confirm");
    },
    back() {
      this.$emit("back");
    },
    deleteModule() {
      this.$emit("delete");
    }
  }
};
if (!Array) {
  const _component_ModuleConfigHeader = common_vendor.resolveComponent("ModuleConfigHeader");
  const _component_IconInput = common_vendor.resolveComponent("IconInput");
  const _component_TextInput = common_vendor.resolveComponent("TextInput");
  (_component_ModuleConfigHeader + _component_IconInput + _component_TextInput)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.deleteModule),
    b: common_vendor.p({
      groupIndex: $props.groupIndex,
      moduleIndex: $props.moduleIndex,
      title: "链接",
      description: "添加一个链接，让访问者可以直接点击进入你想要分享的网页或者社交媒体页面。",
      icon: "link"
    }),
    c: common_vendor.o(($event) => $props.config.spec.icon = $event),
    d: common_vendor.p({
      modelValue: $props.config.spec.icon
    }),
    e: common_vendor.o(($event) => $props.config.spec.title = $event),
    f: common_vendor.p({
      label: "标题",
      placeholder: "请输入标题",
      modelValue: $props.config.spec.title
    }),
    g: common_vendor.o(($event) => $props.config.spec.subtitle = $event),
    h: common_vendor.p({
      label: "描述",
      placeholder: "请输入描述",
      modelValue: $props.config.spec.subtitle
    }),
    i: common_vendor.o(($event) => $props.config.spec.url = $event),
    j: common_vendor.p({
      label: "跳转链接",
      placeholder: "请输入跳转链接",
      modelValue: $props.config.spec.url
    }),
    k: common_vendor.o((...args) => $options.back && $options.back(...args)),
    l: common_vendor.o((...args) => $options.confirm && $options.confirm(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/modules/Link/Config.vue"]]);
wx.createComponent(Component);
