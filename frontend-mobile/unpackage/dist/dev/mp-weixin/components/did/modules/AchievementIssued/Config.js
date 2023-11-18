"use strict";
const common_vendor = require("../../../../common/vendor.js");
const ModuleConfigHeader = () => "../ModuleConfigHeader.js";
const SPIcon = () => "../../../base/SPIcon.js";
const _sfc_main = {
  props: {
    moduleIndex: -1,
    groupIndex: -1,
    config: {}
  },
  components: {
    SPIcon,
    ModuleConfigHeader
  },
  data() {
    return {
      value: "",
      displayOptions: [
        {
          text: "居左",
          value: "left"
        },
        {
          text: "居中",
          value: "left"
        },
        {
          text: "居右",
          value: "left"
        },
        {
          text: "隐藏",
          value: "left"
        },
        {
          text: "自动",
          value: "auto"
        }
      ]
    };
  },
  methods: {
    confirm() {
      this.$emit("confirm");
    },
    back() {
      this.$emit("back");
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
  _component_ModuleConfigHeader();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.deleteModule),
    b: common_vendor.p({
      groupIndex: $props.groupIndex,
      moduleIndex: $props.moduleIndex,
      title: "发行成就",
      description: "展示你发行的数字成就",
      icon: "achievement-issued"
    }),
    c: common_vendor.o((...args) => $options.back && $options.back(...args)),
    d: common_vendor.o((...args) => $options.confirm && $options.confirm(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/modules/AchievementIssued/Config.vue"]]);
wx.createComponent(Component);
