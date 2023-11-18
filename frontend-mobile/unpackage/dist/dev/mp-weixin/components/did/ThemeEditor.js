"use strict";
require("../../library/apis.js");
const store_storage = require("../../store/storage.js");
const common_vendor = require("../../common/vendor.js");
require("../../library/consts.js");
const ThemeText = () => "./ThemeText.js";
const ThemeBackground = () => "./ThemeBackground.js";
const _sfc_main = {
  props: {
    profile: {}
  },
  components: {
    ThemeText,
    ThemeBackground
  },
  data() {
    return {
      tab: "background"
    };
  },
  created() {
  },
  computed: {
    accountId() {
      const { state } = store_storage.useStorage();
      return state.accountId;
    }
  },
  methods: {
    editing(info) {
      this.$emit("editing", info);
    },
    isTab(tab) {
      return this.tab === tab;
    },
    getTabStyle(tab) {
      if (this.isTab(tab)) {
        return {
          "opacity": 1
        };
      }
      return {};
    },
    switchTab(tab) {
      this.tab = tab;
    }
  }
};
if (!Array) {
  const _component_ThemeBackground = common_vendor.resolveComponent("ThemeBackground");
  const _component_ThemeText = common_vendor.resolveComponent("ThemeText");
  (_component_ThemeBackground + _component_ThemeText)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => $options.editing({})),
    b: $options.isTab("background")
  }, $options.isTab("background") ? {
    c: common_vendor.p({
      profile: $props.profile
    })
  } : {}, {
    d: $options.isTab("text")
  }, $options.isTab("text") ? {
    e: common_vendor.p({
      profile: $props.profile
    })
  } : {}, {
    f: common_vendor.s($options.getTabStyle("background")),
    g: common_vendor.o(($event) => $options.switchTab("background")),
    h: common_vendor.s($options.getTabStyle("text")),
    i: common_vendor.o(($event) => $options.switchTab("text"))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/ThemeEditor.vue"]]);
wx.createComponent(Component);
