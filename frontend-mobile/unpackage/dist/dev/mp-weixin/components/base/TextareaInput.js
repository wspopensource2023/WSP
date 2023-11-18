"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    label: "",
    modelValue: "",
    placeholder: ""
  },
  data() {
    return {
      tmp: ""
    };
  },
  methods: {
    back() {
      this.$refs.editModal.close();
    },
    showEditor() {
      this.tmp = this.modelValue;
      this.$refs.editModal.open("bottom");
    },
    comfirm() {
      this.$emit("update:modelValue", this.tmp);
      console.log("this.tmp", this.tmp, this.modelValue);
      this.$refs.editModal.close();
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_easyinput2 + _easycom_uni_popup2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.label),
    b: common_vendor.t($props.modelValue),
    c: common_vendor.o((...args) => $options.showEditor && $options.showEditor(...args)),
    d: common_vendor.t($props.label),
    e: common_vendor.o(($event) => $data.tmp = $event),
    f: common_vendor.p({
      clearable: true,
      type: "textarea",
      placeholder: $props.placeholder,
      modelValue: $data.tmp
    }),
    g: common_vendor.o((...args) => $options.back && $options.back(...args)),
    h: common_vendor.o((...args) => $options.comfirm && $options.comfirm(...args)),
    i: common_vendor.sr("editModal", "60f21b78-0")
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/base/TextareaInput.vue"]]);
wx.createComponent(Component);
