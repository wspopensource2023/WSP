"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  components: {},
  props: {
    profile: {}
  },
  data() {
    return {
      loading: false
    };
  },
  created() {
  },
  methods: {
    editing() {
      this.$emit("editing", {
        type: "profile.metadata",
        config: {},
        groupIndex: -1,
        moduleIndex: -1
      });
    },
    getAvatar() {
      var _a, _b;
      return (_b = (_a = this.profile) == null ? void 0 : _a.spec) == null ? void 0 : _b.avatar;
    },
    getTitle() {
      var _a, _b;
      return (_b = (_a = this.profile) == null ? void 0 : _a.spec) == null ? void 0 : _b.title;
    },
    getDescription() {
      var _a, _b;
      return (_b = (_a = this.profile) == null ? void 0 : _a.spec) == null ? void 0 : _b.description;
    },
    isLinkAvaliable() {
      var _a, _b;
      return (_b = (_a = this.profile) == null ? void 0 : _a.spec) == null ? void 0 : _b.slug;
    },
    getLink() {
      var _a, _b;
      if (this.isLinkAvaliable()) {
        return "xxxxxx.com/" + ((_b = (_a = this.profile) == null ? void 0 : _a.spec) == null ? void 0 : _b.slug);
      }
      return "点击设置个性域名";
    },
    clickLink() {
      if (!this.isLinkAvaliable()) {
        this.editing();
      }
    }
  }
};
if (!Array) {
  const _component_v_skeleton_loader = common_vendor.resolveComponent("v-skeleton-loader");
  _component_v_skeleton_loader();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.loading
  }, $data.loading ? {
    b: common_vendor.p({
      loading: $data.loading,
      height: "120",
      type: "avatar, list-item-two-line"
    })
  } : {}, {
    c: $options.getAvatar(),
    d: common_vendor.t($options.getTitle()),
    e: common_vendor.t($options.getLink()),
    f: common_vendor.t($options.getDescription()),
    g: !$data.loading,
    h: common_vendor.o((...args) => $options.editing && $options.editing(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/modules/Metadata/Zen.vue"]]);
wx.createComponent(Component);
