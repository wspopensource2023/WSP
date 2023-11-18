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
      options: [
        {
          text: "图像",
          value: "image"
        },
        {
          text: "列表",
          value: "list"
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
    deleteModule() {
      console.log("deleteModule!");
      this.$emit("delete");
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
      title: "收集成就",
      description: "展示你获得的数字成就",
      icon: "achievement-collected"
    }),
    c: common_vendor.o((...args) => $options.back && $options.back(...args)),
    d: common_vendor.o((...args) => $options.confirm && $options.confirm(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/modules/AchievementCollected/Config.vue"]]);
wx.createComponent(Component);
