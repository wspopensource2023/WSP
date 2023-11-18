"use strict";
const common_vendor = require("../../../common/vendor.js");
const library_consts = require("../../../library/consts.js");
const SPIcon = () => "../../base/SPIcon.js";
const IconFont = () => "../../base/IconFont.js";
const ModuleConfig = () => "./ModuleConfig.js";
const _sfc_main = {
  props: {
    config: {}
  },
  components: {
    SPIcon,
    IconFont,
    ModuleConfig
  },
  data() {
    return {
      tab: "list",
      createdConfig: null,
      selectedItem: null,
      appModules: [
        "Title",
        "Link",
        "Story",
        "AchievementCollected",
        "AchievementIssued",
        "Bilibili",
        "XiaoHongShu",
        "Weibo",
        "ZhiHu"
      ]
    };
  },
  computed: {
    appModulesConfigs() {
      return common_vendor._.filter(this.getModulesConfigs(), (item) => {
        return this.appModules.includes(item.kind);
      });
    },
    title() {
      if (this.selectedItem) {
        return `创建` + this.selectedItem.name + "模块";
      }
      return "添加内容";
    }
  },
  methods: {
    show() {
      this.$refs.editModal.open("bottom");
      this.selectedItem = null;
    },
    back() {
      if (this.tab === "edit") {
        this.switchTab("list");
        this.selectedItem = null;
      } else {
        this.$refs.editModal.close();
      }
    },
    isTab(tab) {
      return this.tab === tab;
    },
    switchTab(tab) {
      if (this.tab === tab)
        return;
      this.tab = tab;
    },
    confirm() {
      console.log(">>> module create confirm");
      this.config.spec.children.push(this.createdConfig);
      this.$refs.editModal.close();
      this.switchTab("list");
    },
    createModule(item) {
      this.selectedItem = item;
      const moduleConfig = library_consts.getModuleByKind(item.kind);
      const config = common_vendor._.cloneDeep(moduleConfig.default);
      this.createdConfig = config;
      this.switchTab("edit");
    },
    getModulesConfigs() {
      return library_consts.MODULE_CONFIGS;
    }
  }
};
if (!Array) {
  const _component_SPIcon = common_vendor.resolveComponent("SPIcon");
  const _component_ModuleConfig = common_vendor.resolveComponent("ModuleConfig");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_component_SPIcon + _component_ModuleConfig + _easycom_uni_popup2)();
}
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($options.title),
    b: $options.isTab("list")
  }, $options.isTab("list") ? {
    c: common_vendor.o((...args) => $options.back && $options.back(...args))
  } : {}, {
    d: common_vendor.f($options.appModulesConfigs, (item, k0, i0) => {
      return {
        a: "5760f3d2-1-" + i0 + ",5760f3d2-0",
        b: common_vendor.p({
          config: item.icon
        }),
        c: common_vendor.t(item.name),
        d: common_vendor.t(item.description),
        e: common_vendor.o(($event) => $options.createModule(item), item.kind),
        f: item.kind
      };
    }),
    e: $options.isTab("list"),
    f: common_vendor.o($options.confirm),
    g: common_vendor.o($options.back),
    h: common_vendor.p({
      profile: _ctx.profile,
      config: $data.createdConfig,
      groupIndex: _ctx.groupIndex,
      moduleIndex: -1
    }),
    i: $options.isTab("edit"),
    j: common_vendor.sr("editModal", "5760f3d2-0")
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/modules/ModuleCreateModal.vue"]]);
wx.createComponent(Component);
