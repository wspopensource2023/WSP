"use strict";
const common_vendor = require("../../../../common/vendor.js");
const library_apis = require("../../../../library/apis.js");
require("../../../../store/storage.js");
require("../../../../library/consts.js");
const SPIcon = () => "../../../base/SPIcon.js";
const ModuleConfigHeader = () => "../ModuleConfigHeader.js";
const TextInput = () => "../../../base/TextInput.js";
const IconInput = () => "../../../base/IconInput.js";
const _sfc_main = {
  props: {
    moduleIndex: -1,
    groupIndex: -1,
    config: {}
  },
  components: {
    SPIcon,
    ModuleConfigHeader,
    TextInput,
    IconInput
  },
  data() {
    return {
      tab: "simple",
      lastUID: ""
    };
  },
  computed: {
    uid() {
      var _a, _b;
      return ((_b = (_a = this == null ? void 0 : this.config) == null ? void 0 : _a.spec) == null ? void 0 : _b.uid) || "";
    },
    aigcButtonDisabled() {
      var _a, _b;
      if (!((_b = (_a = this == null ? void 0 : this.config) == null ? void 0 : _a.spec) == null ? void 0 : _b.uid)) {
        return true;
      }
      return this.lastUID === this.config.spec.uid;
    },
    aigcButtonText() {
      if (this.lastUID !== "" && this.lastUID === this.config.spec.uid) {
        return "已加载";
      }
      return "一键加载";
    }
  },
  methods: {
    confirm() {
      this.$emit("confirm");
    },
    back() {
      this.$emit("back");
    },
    showAdvance() {
      this.switchTab("advance");
    },
    isTab(tab) {
      return this.tab === tab;
    },
    switchTab(tab) {
      this.tab = tab;
    },
    async aigc() {
      if (!this.uid) {
        common_vendor.index.showToast({
          title: `请输入微博uid`,
          icon: "none",
          duration: 3e3
        });
        return;
      }
      const res = await library_apis.apiService.AIGCWeiboCRD(this.uid);
      common_vendor.lodashExports.merge(this.config, res);
      this.lastUID = this.uid;
    },
    create() {
    },
    deleteModule() {
      this.$emit("delete");
    }
  }
};
if (!Array) {
  const _component_ModuleConfigHeader = common_vendor.resolveComponent("ModuleConfigHeader");
  const _component_TextInput = common_vendor.resolveComponent("TextInput");
  const _component_IconInput = common_vendor.resolveComponent("IconInput");
  (_component_ModuleConfigHeader + _component_TextInput + _component_IconInput)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.deleteModule),
    b: common_vendor.p({
      groupIndex: $props.groupIndex,
      moduleIndex: $props.moduleIndex,
      icon: "weibo",
      title: "微博",
      description: "在数字名片上展示你在微博的账号，让访问者可以直接了解你在微博的影响力以及作品。"
    }),
    c: $options.isTab("simple")
  }, $options.isTab("simple") ? {
    d: common_vendor.o(($event) => $props.config.spec.uid = $event),
    e: common_vendor.p({
      label: "UID",
      placeholder: "请输入微博账号UID",
      modelValue: $props.config.spec.uid
    }),
    f: common_vendor.t($options.aigcButtonText),
    g: $options.aigcButtonDisabled,
    h: common_vendor.o((...args) => $options.aigc && $options.aigc(...args)),
    i: common_vendor.o((...args) => $options.back && $options.back(...args)),
    j: common_vendor.o((...args) => $options.showAdvance && $options.showAdvance(...args))
  } : {}, {
    k: $options.isTab("advance")
  }, $options.isTab("advance") ? {
    l: common_vendor.o(($event) => $props.config.spec.title = $event),
    m: common_vendor.p({
      label: "标题",
      placeholder: "请输入标题",
      modelValue: $props.config.spec.title
    }),
    n: common_vendor.o(($event) => $props.config.spec.subtitle = $event),
    o: common_vendor.p({
      label: "描述",
      placeholder: "请输入描述",
      modelValue: $props.config.spec.subtitle
    }),
    p: common_vendor.o(($event) => $props.config.spec.url = $event),
    q: common_vendor.p({
      label: "跳转链接",
      placeholder: "请输入跳转链接",
      modelValue: $props.config.spec.url
    }),
    r: common_vendor.o(($event) => $props.config.spec.icon = $event),
    s: common_vendor.p({
      modelValue: $props.config.spec.icon
    }),
    t: common_vendor.o(($event) => $options.switchTab("simple")),
    v: common_vendor.o((...args) => $options.confirm && $options.confirm(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/modules/Weibo/Config.vue"]]);
wx.createComponent(Component);
