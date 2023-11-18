"use strict";
const common_vendor = require("../../../common/vendor.js");
const Link = () => "./Link/View.js";
const Story = () => "./Story/View.js";
const ZhiHu = () => "./Zhihu/View.js";
const XiaoHongShu = () => "./Xiaohongshu/View.js";
const Bilibili = () => "./Bilibili/View.js";
const Weibo = () => "./Weibo/View.js";
const Title = () => "./Title/View.js";
const AchievementCollected = () => "./AchievementCollected/View.js";
const AchievementIssued = () => "./AchievementIssued/View.js";
const _sfc_main = {
  props: {
    profile: {},
    config: {}
  },
  components: {
    Link,
    Story,
    ZhiHu,
    XiaoHongShu,
    Bilibili,
    Weibo,
    Title,
    AchievementCollected,
    AchievementIssued
  },
  data() {
    return {};
  },
  methods: {
    match(kind) {
      var _a, _b;
      return ((_b = (_a = this.config) == null ? void 0 : _a.kind) == null ? void 0 : _b.toLowerCase()) === (kind == null ? void 0 : kind.toLowerCase());
    }
  }
};
if (!Array) {
  const _component_Link = common_vendor.resolveComponent("Link");
  const _component_Story = common_vendor.resolveComponent("Story");
  const _component_ZhiHu = common_vendor.resolveComponent("ZhiHu");
  const _component_XiaoHongShu = common_vendor.resolveComponent("XiaoHongShu");
  const _component_Bilibili = common_vendor.resolveComponent("Bilibili");
  const _component_Weibo = common_vendor.resolveComponent("Weibo");
  const _component_Title = common_vendor.resolveComponent("Title");
  const _component_AchievementCollected = common_vendor.resolveComponent("AchievementCollected");
  const _component_AchievementIssued = common_vendor.resolveComponent("AchievementIssued");
  (_component_Link + _component_Story + _component_ZhiHu + _component_XiaoHongShu + _component_Bilibili + _component_Weibo + _component_Title + _component_AchievementCollected + _component_AchievementIssued)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $options.match("link")
  }, $options.match("link") ? {
    b: common_vendor.p({
      profile: $props.profile,
      config: $props.config
    })
  } : {}, {
    c: $options.match("story")
  }, $options.match("story") ? {
    d: common_vendor.p({
      profile: $props.profile,
      config: $props.config
    })
  } : {}, {
    e: $options.match("zhihu")
  }, $options.match("zhihu") ? {
    f: common_vendor.p({
      profile: $props.profile,
      config: $props.config
    })
  } : {}, {
    g: $options.match("xiaohongshu")
  }, $options.match("xiaohongshu") ? {
    h: common_vendor.p({
      profile: $props.profile,
      config: $props.config
    })
  } : {}, {
    i: $options.match("bilibili")
  }, $options.match("bilibili") ? {
    j: common_vendor.p({
      profile: $props.profile,
      config: $props.config
    })
  } : {}, {
    k: $options.match("weibo")
  }, $options.match("weibo") ? {
    l: common_vendor.p({
      profile: $props.profile,
      config: $props.config
    })
  } : {}, {
    m: $options.match("title")
  }, $options.match("title") ? {
    n: common_vendor.p({
      profile: $props.profile,
      config: $props.config
    })
  } : {}, {
    o: $options.match("AchievementCollected")
  }, $options.match("AchievementCollected") ? {
    p: common_vendor.p({
      profile: $props.profile,
      config: $props.config
    })
  } : {}, {
    q: $options.match("AchievementIssued")
  }, $options.match("AchievementIssued") ? {
    r: common_vendor.p({
      profile: $props.profile,
      config: $props.config
    })
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/modules/ModuleView.vue"]]);
wx.createComponent(Component);
