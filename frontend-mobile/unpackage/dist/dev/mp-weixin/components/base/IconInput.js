"use strict";
const common_vendor = require("../../common/vendor.js");
const SPIcon = () => "./SPIcon.js";
const IconSelectorModal = () => "./IconSelectorModal.js";
const _sfc_main = {
  props: {
    modelValue: ""
  },
  components: {
    SPIcon,
    IconSelectorModal
  },
  methods: {
    showModal() {
      this.$refs.IconSelectorModal.show(this.modelValue);
    },
    onIconSelected(value) {
      console.log("onIconSelected", value);
      this.$emit("update:modelValue", value);
    }
  }
};
if (!Array) {
  const _component_SPIcon = common_vendor.resolveComponent("SPIcon");
  const _component_IconSelectorModal = common_vendor.resolveComponent("IconSelectorModal");
  (_component_SPIcon + _component_IconSelectorModal)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.modelValue
  }, $props.modelValue ? {
    b: common_vendor.p({
      config: $props.modelValue
    })
  } : {}, {
    c: !$props.modelValue
  }, !$props.modelValue ? {} : {}, {
    d: common_vendor.o(($event) => $options.showModal(_ctx.value)),
    e: common_vendor.sr("IconSelectorModal", "3942a519-1"),
    f: common_vendor.o($options.onIconSelected)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/base/IconInput.vue"]]);
wx.createComponent(Component);
