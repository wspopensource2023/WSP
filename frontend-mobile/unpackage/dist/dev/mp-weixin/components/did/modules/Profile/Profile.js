"use strict";
const library_consts = require("../../../../library/consts.js");
const common_vendor = require("../../../../common/vendor.js");
const GruopView = () => "../Group/View.js";
const ModuleView = () => "../ModuleView.js";
const _sfc_main = {
  components: {
    GruopView,
    ModuleView
  },
  props: {
    width: String,
    height: String,
    profile: {}
  },
  methods: {
    clickAvatar() {
      this.$emit("clickAvatar");
    },
    getGroups() {
      var _a, _b;
      return (_b = (_a = this.profile) == null ? void 0 : _a.spec) == null ? void 0 : _b.children;
    },
    getDocumentStyle() {
      return {
        "width": this.width || "100%",
        "height": this.height || "100%"
      };
    },
    getBackgroundMode() {
      var _a, _b;
      try {
        return (_b = (_a = this.profile) == null ? void 0 : _a.spec) == null ? void 0 : _b.style[library_consts.PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_MODE];
      } catch {
        return "";
      }
    },
    isBackgroundMode(mode) {
      return this.getBackgroundMode() === mode && this.getBackgroundVideo();
    },
    getModulesStyle() {
      var _a, _b;
      return { "text-align": ((_b = (_a = this.profile) == null ? void 0 : _a.spec) == null ? void 0 : _b.style[library_consts.PROFILE_CONSTS.KEY_PROFILE_TEXT_ALIGN]) || library_consts.PROFILE_CONSTS.DEFAULT_PROFILE_TEXT_ALIGN };
    },
    getBackgroundImage() {
      var _a, _b;
      return this.getSafeNetworkResource((_b = (_a = this.profile) == null ? void 0 : _a.spec) == null ? void 0 : _b.style[library_consts.PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_IMAGE]);
    },
    getBackgroundColor() {
      var _a, _b;
      return (_b = (_a = this.profile) == null ? void 0 : _a.spec) == null ? void 0 : _b.style[library_consts.PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_COLOR];
    },
    getBackgroundVideo() {
      var _a, _b;
      return this.getSafeNetworkResource((_b = (_a = this.profile) == null ? void 0 : _a.spec) == null ? void 0 : _b.style[library_consts.PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_VIDEO]);
    },
    getSafeNetworkResource(value) {
      if (typeof value === "string" && value.indexOf("http") === 0) {
        return value;
      }
      return "";
    },
    getBackgroundStyle() {
      const style = {};
      const mode = this.getBackgroundMode();
      if (mode === "color") {
        style["background-color"] = this.getBackgroundColor();
      }
      return style;
    }
  }
};
if (!Array) {
  const _component_GruopView = common_vendor.resolveComponent("GruopView");
  _component_GruopView();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c, _d, _e, _f;
  return common_vendor.e({
    a: $options.getBackgroundMode() === "image"
  }, $options.getBackgroundMode() === "image" ? {
    b: $options.getBackgroundImage()
  } : {}, {
    c: common_vendor.s($options.getBackgroundStyle()),
    d: $options.isBackgroundMode("video")
  }, $options.isBackgroundMode("video") ? common_vendor.e({
    e: $options.getBackgroundVideo()
  }, $options.getBackgroundVideo() ? {
    f: $options.getBackgroundVideo()
  } : {}) : {}, {
    g: (_b = (_a = $props.profile) == null ? void 0 : _a.spec) == null ? void 0 : _b.avatar,
    h: common_vendor.o((...args) => $options.clickAvatar && $options.clickAvatar(...args)),
    i: common_vendor.t((_d = (_c = $props.profile) == null ? void 0 : _c.spec) == null ? void 0 : _d.title),
    j: common_vendor.t((_f = (_e = $props.profile) == null ? void 0 : _e.spec) == null ? void 0 : _f.description),
    k: common_vendor.f($options.getGroups(), (groupItem, index, i0) => {
      return {
        a: common_vendor.w((item, s1, i1) => {
          return {
            a: "f0dc8096-1-" + i0 + "-" + i1 + "," + ("f0dc8096-0-" + i0),
            b: common_vendor.p({
              profile: $props.profile,
              config: item.item
            }),
            c: i1,
            d: s1
          };
        }, {
          name: "item",
          path: "k[" + i0 + "].a",
          vueId: "f0dc8096-0-" + i0
        }),
        b: groupItem,
        c: "f0dc8096-0-" + i0,
        d: common_vendor.p({
          readonly: true,
          profile: $props.profile,
          index,
          config: groupItem
        })
      };
    }),
    l: common_vendor.s($options.getModulesStyle()),
    m: common_vendor.s($options.getDocumentStyle())
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/modules/Profile/Profile.vue"]]);
wx.createComponent(Component);
