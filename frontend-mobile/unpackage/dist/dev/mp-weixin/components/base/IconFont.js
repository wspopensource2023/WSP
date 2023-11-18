"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "IconFont",
  props: {
    name: {
      type: String,
      default: () => {
        return "";
      }
    },
    size: {
      type: String,
      default: () => {
        return "16px";
      }
    },
    width: {
      type: String,
      default: () => {
        return "16px";
      }
    },
    height: {
      type: String,
      default: () => {
        return "16px";
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    getIconClassName() {
      return `t-icon iconfont-${this.name}`;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $props.size,
    b: $props.width,
    c: $props.height,
    d: common_vendor.n($options.getIconClassName())
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/base/IconFont.vue"]]);
wx.createComponent(Component);
