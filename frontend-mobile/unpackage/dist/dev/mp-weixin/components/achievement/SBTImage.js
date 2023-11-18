"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    size: "20rem",
    imageSize: "15rem",
    image: ""
  },
  methods: {
    getSBTContainerStyle() {
      return {
        "background-image": `url(${this.image})`,
        "background-size": "contain",
        "background-repeat": "no-repeat",
        "background-position": "50%"
      };
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: this.imageSize,
    b: this.imageSize,
    c: $props.image,
    d: this.size
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/achievement/SBTImage.vue"]]);
wx.createComponent(Component);
