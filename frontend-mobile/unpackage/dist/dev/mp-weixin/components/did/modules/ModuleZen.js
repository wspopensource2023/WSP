"use strict";
const common_vendor = require("../../../common/vendor.js");
const Link = () => "./Link/Zen.js";
const Bilibili = () => "./Bilibili/Zen.js";
const Story = () => "./Story/Zen.js";
const Weibo = () => "./Weibo/Zen.js";
const ZhiHu = () => "./Zhihu/Zen.js";
const XiaoHongShu = () => "./Xiaohongshu/Zen.js";
const Title = () => "./Title/Zen.js";
const AchievementCollected = () => "./AchievementCollected/Zen.js";
const AchievementIssued = () => "./AchievementIssued/Zen.js";
const SPIcon = () => "../../base/SPIcon.js";
const _sfc_main = {
  props: {
    groupIndex: -1,
    moduleIndex: -1,
    profile: {},
    config: {}
  },
  components: {
    Link,
    Bilibili,
    Story,
    Weibo,
    ZhiHu,
    XiaoHongShu,
    SPIcon,
    Title,
    AchievementCollected,
    AchievementIssued
  },
  data() {
    return {};
  },
  methods: {
    clickModule() {
      this.$emit("clickModuleZen");
    },
    deleteModule() {
      if (this.groupIndex === -1 || this.moduleIndex === -1)
        return;
      try {
        const group = this.profile.spec.children[this.groupIndex];
        const modules = group.spec.children;
        modules.splice(this.moduleIndex, 1);
      } catch (e) {
        console.error(e);
      }
    },
    match(kind) {
      var _a, _b;
      return ((_b = (_a = this.config) == null ? void 0 : _a.kind) == null ? void 0 : _b.toLowerCase()) === (kind == null ? void 0 : kind.toLowerCase());
    }
  }
};
if (!Array) {
  const _component_Title = common_vendor.resolveComponent("Title");
  const _component_Link = common_vendor.resolveComponent("Link");
  const _component_Bilibili = common_vendor.resolveComponent("Bilibili");
  const _component_Story = common_vendor.resolveComponent("Story");
  const _component_Weibo = common_vendor.resolveComponent("Weibo");
  const _component_ZhiHu = common_vendor.resolveComponent("ZhiHu");
  const _component_XiaoHongShu = common_vendor.resolveComponent("XiaoHongShu");
  const _component_AchievementCollected = common_vendor.resolveComponent("AchievementCollected");
  const _component_AchievementIssued = common_vendor.resolveComponent("AchievementIssued");
  (_component_Title + _component_Link + _component_Bilibili + _component_Story + _component_Weibo + _component_ZhiHu + _component_XiaoHongShu + _component_AchievementCollected + _component_AchievementIssued)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $options.match("title")
  }, $options.match("title") ? {
    b: common_vendor.p({
      profile: $props.profile,
      config: $props.config,
      groupIndex: $props.groupIndex,
      moduleIndex: $props.moduleIndex
    })
  } : {}, {
    c: $options.match("link")
  }, $options.match("link") ? {
    d: common_vendor.p({
      profile: $props.profile,
      config: $props.config,
      groupIndex: $props.groupIndex,
      moduleIndex: $props.moduleIndex
    })
  } : {}, {
    e: $options.match("bilibili")
  }, $options.match("bilibili") ? {
    f: common_vendor.p({
      profile: $props.profile,
      config: $props.config,
      groupIndex: $props.groupIndex,
      moduleIndex: $props.moduleIndex
    })
  } : {}, {
    g: $options.match("story")
  }, $options.match("story") ? {
    h: common_vendor.p({
      profile: $props.profile,
      config: $props.config,
      groupIndex: $props.groupIndex,
      moduleIndex: $props.moduleIndex
    })
  } : {}, {
    i: $options.match("weibo")
  }, $options.match("weibo") ? {
    j: common_vendor.p({
      profile: $props.profile,
      config: $props.config,
      groupIndex: $props.groupIndex,
      moduleIndex: $props.moduleIndex
    })
  } : {}, {
    k: $options.match("zhihu")
  }, $options.match("zhihu") ? {
    l: common_vendor.p({
      profile: $props.profile,
      config: $props.config,
      groupIndex: $props.groupIndex,
      moduleIndex: $props.moduleIndex
    })
  } : {}, {
    m: $options.match("xiaohongshu")
  }, $options.match("xiaohongshu") ? {
    n: common_vendor.p({
      profile: $props.profile,
      config: $props.config,
      groupIndex: $props.groupIndex,
      moduleIndex: $props.moduleIndex
    })
  } : {}, {
    o: $options.match("AchievementCollected")
  }, $options.match("AchievementCollected") ? {
    p: common_vendor.p({
      profile: $props.profile,
      config: $props.config,
      groupIndex: $props.groupIndex,
      moduleIndex: $props.moduleIndex
    })
  } : {}, {
    q: $options.match("AchievementIssued")
  }, $options.match("AchievementIssued") ? {
    r: common_vendor.p({
      profile: $props.profile,
      config: $props.config,
      groupIndex: $props.groupIndex,
      moduleIndex: $props.moduleIndex
    })
  } : {}, {
    s: common_vendor.o((...args) => $options.clickModule && $options.clickModule(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/modules/ModuleZen.vue"]]);
wx.createComponent(Component);
