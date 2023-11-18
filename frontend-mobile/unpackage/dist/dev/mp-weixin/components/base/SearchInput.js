"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    label: "",
    modelValue: "",
    placeholder: ""
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    input(value) {
      this.$emit("update:modelValue", value);
      this.$emit("input", value);
    },
    search() {
      if (this.modelValue) {
        this.$emit("search", this.modelValue);
      }
    },
    searchBtnClass() {
      let classname = "tw-ml-5 tw-text-white tw-whitespace-nowrap";
      if (!this.modelValue || !this.modelValue.length) {
        return classname + " tw-text-opacity-50 1111";
      }
      return classname;
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
    a: common_vendor.o($options.search),
    b: common_vendor.o($options.search),
    c: common_vendor.o($options.input),
    d: common_vendor.p({
      confirmType: "search",
      focus: true,
      clearable: true,
      type: "text",
      value: $props.modelValue,
      placeholder: $props.placeholder
    }),
    e: common_vendor.o((...args) => $options.search && $options.search(...args)),
    f: common_vendor.n($options.searchBtnClass())
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/base/SearchInput.vue"]]);
wx.createComponent(Component);
