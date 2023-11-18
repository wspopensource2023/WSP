"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    label: "",
    modelValue: "",
    placeholder: ""
  },
  computed: {},
  methods: {
    input(value) {
      this.$emit("update:modelValue", value);
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  _easycom_uni_easyinput();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.label),
    b: common_vendor.o($options.input),
    c: common_vendor.p({
      clearable: true,
      type: "text",
      value: $props.modelValue,
      placeholder: $props.placeholder
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/base/TextInput.vue"]]);
wx.createComponent(Component);
