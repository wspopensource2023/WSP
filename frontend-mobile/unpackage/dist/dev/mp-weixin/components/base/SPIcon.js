"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "spicon",
  props: {
    size: {
      type: String,
      default: () => {
        return "";
      }
    },
    config: {
      type: String,
      default: () => {
        return "";
      }
    }
  },
  mounted() {
  },
  methods: {
    isImageMode() {
      try {
        const protocol = new common_vendor.URL(this.config).protocol;
        return ["https:", "http:", "data:"].indexOf(protocol) !== -1;
      } catch {
        return false;
      }
    },
    getIconStyle() {
      if (this.isImageMode()) {
        return {
          "background-image": `url("${this.config}")`,
          "display": "inline-block",
          "background-repeat": "no-repeat",
          "background-position": "center",
          "background-size": "100%"
        };
      }
      return this.size ? {
        "width": this.size,
        "height": this.size
      } : "";
    },
    getIconClassName() {
      if (this.isImageMode()) {
        return "spicon";
      }
      const id = this.config;
      return `spicon spicon-${id}`;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.n($options.getIconClassName()),
    b: common_vendor.s($options.getIconStyle())
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/base/SPIcon.vue"]]);
wx.createComponent(Component);
