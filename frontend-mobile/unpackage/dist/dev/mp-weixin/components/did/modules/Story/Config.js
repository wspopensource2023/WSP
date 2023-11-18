"use strict";
const common_vendor = require("../../../../common/vendor.js");
const SPIcon = () => "../../../base/SPIcon.js";
const ModuleConfigHeader = () => "../ModuleConfigHeader.js";
const TextInput = () => "../../../base/TextInput.js";
const TextareaInput = () => "../../../base/TextareaInput.js";
const IconInput = () => "../../../base/IconInput.js";
const _sfc_main = {
  props: {
    moduleIndex: -1,
    groupIndex: -1,
    config: {}
  },
  components: {
    SPIcon,
    ModuleConfigHeader,
    TextInput,
    TextareaInput,
    IconInput
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
  const _component_TextareaInput = common_vendor.resolveComponent("TextareaInput");
  const _component_IconInput = common_vendor.resolveComponent("IconInput");
  (_component_ModuleConfigHeader + _component_TextInput + _component_TextareaInput + _component_IconInput)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.deleteModule),
    b: common_vendor.p({
      groupIndex: $props.groupIndex,
      moduleIndex: $props.moduleIndex,
      icon: "story",
      title: "故事",
      description: "发布一篇文章，展示自己的故事、想法和经验。"
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
    g: common_vendor.o(($event) => $props.config.spec.content = $event),
    h: common_vendor.p({
      label: "正文",
      placeholder: "请输入正文",
      modelValue: $props.config.spec.content
    }),
    i: common_vendor.o(($event) => $props.config.spec.icon = $event),
    j: common_vendor.p({
      modelValue: $props.config.spec.icon
    }),
    k: common_vendor.o((...args) => $options.back && $options.back(...args)),
    l: common_vendor.o((...args) => $options.confirm && $options.confirm(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/modules/Story/Config.vue"]]);
wx.createComponent(Component);
