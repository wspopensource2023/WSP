"use strict";
const common_vendor = require("../../../common/vendor.js");
const Story = () => "./Story/Panel.js";
const Link = () => "./Link/Panel.js";
const Bilibili = () => "./Bilibili/Panel.js";
const Weibo = () => "./Weibo/Panel.js";
const Xiaohongshu = () => "./Xiaohongshu/Panel.js";
const Zhihu = () => "./Zhihu/Panel.js";
const AchievementCollected = () => "./AchievementCollected/Panel.js";
const AchievementIssued = () => "./AchievementIssued/Panel.js";
const _sfc_main = {
  props: {
    profile: {},
    config: {}
  },
  components: {
    Story,
    Link,
    Bilibili,
    Weibo,
    Xiaohongshu,
    Zhihu,
    AchievementCollected,
    AchievementIssued
  },
  data() {
    return {};
  },
  methods: {
    match(kind) {
      var _a, _b;
      return ((_b = (_a = this.config) == null ? void 0 : _a.kind) == null ? void 0 : _b.toLowerCase()) === kind.toLowerCase();
    }
  }
};
if (!Array) {
  const _component_Story = common_vendor.resolveComponent("Story");
  const _component_Link = common_vendor.resolveComponent("Link");
  const _component_Bilibili = common_vendor.resolveComponent("Bilibili");
  const _component_Weibo = common_vendor.resolveComponent("Weibo");
  const _component_Xiaohongshu = common_vendor.resolveComponent("Xiaohongshu");
  const _component_Zhihu = common_vendor.resolveComponent("Zhihu");
  const _component_AchievementCollected = common_vendor.resolveComponent("AchievementCollected");
  const _component_AchievementIssued = common_vendor.resolveComponent("AchievementIssued");
  (_component_Story + _component_Link + _component_Bilibili + _component_Weibo + _component_Xiaohongshu + _component_Zhihu + _component_AchievementCollected + _component_AchievementIssued)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $options.match("story")
  }, $options.match("story") ? {
    b: common_vendor.p({
      profile: $props.profile,
      config: $props.config
    })
  } : {}, {
    c: $options.match("link")
  }, $options.match("link") ? {
    d: common_vendor.p({
      profile: $props.profile,
      config: $props.config
    })
  } : {}, {
    e: $options.match("bilibili")
  }, $options.match("bilibili") ? {
    f: common_vendor.p({
      profile: $props.profile,
      config: $props.config
    })
  } : {}, {
    g: $options.match("weibo")
  }, $options.match("weibo") ? {
    h: common_vendor.p({
      profile: $props.profile,
      config: $props.config
    })
  } : {}, {
    i: $options.match("xiaohongshu")
  }, $options.match("xiaohongshu") ? {
    j: common_vendor.p({
      profile: $props.profile,
      config: $props.config
    })
  } : {}, {
    k: $options.match("zhihu")
  }, $options.match("zhihu") ? {
    l: common_vendor.p({
      profile: $props.profile,
      config: $props.config
    })
  } : {}, {
    m: $options.match("AchievementCollected")
  }, $options.match("AchievementCollected") ? {
    n: common_vendor.p({
      profile: $props.profile,
      config: $props.config
    })
  } : {}, {
    o: $options.match("AchievementIssued")
  }, $options.match("AchievementIssued") ? {
    p: common_vendor.p({
      profile: $props.profile,
      config: $props.config
    })
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/modules/ModulePanel.vue"]]);
wx.createComponent(Component);
