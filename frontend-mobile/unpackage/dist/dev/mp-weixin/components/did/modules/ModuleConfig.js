"use strict";
const common_vendor = require("../../../common/vendor.js");
const Title = () => "./Title/Config.js";
const Link = () => "./Link/Config.js";
const Story = () => "./Story/Config.js";
const ZhiHu = () => "./Zhihu/Config.js";
const XiaoHongShu = () => "./Xiaohongshu/Config.js";
const Bilibili = () => "./Bilibili/Config.js";
const Weibo = () => "./Weibo/Config.js";
const AchievementCollected = () => "./AchievementCollected/Config.js";
const AchievementIssued = () => "./AchievementIssued/Config.js";
const _sfc_main = {
  name: "ModuleConfig",
  props: {
    profile: {},
    config: {},
    groupIndex: -1,
    moduleIndex: -1
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
    back() {
      this.$emit("back");
    },
    confirm() {
      this.$emit("confirm");
    },
    match(kind) {
      var _a, _b;
      return ((_b = (_a = this.config) == null ? void 0 : _a.kind) == null ? void 0 : _b.toLowerCase()) === kind.toLowerCase();
    },
    deleteModule() {
      console.log("收到删除信号", this.groupIndex, this.moduleIndex, "正在删除...");
      if (this.groupIndex === -1 || this.moduleIndex === -1)
        return;
      try {
        const group = this.profile.spec.children[this.groupIndex];
        const modules = group.spec.children;
        modules.splice(this.moduleIndex, 1);
        this.$emit("delete", {});
      } catch (e) {
        console.error(e);
      }
    }
  }
};
if (!Array) {
  const _component_Link = common_vendor.resolveComponent("Link");
  const _component_Bilibili = common_vendor.resolveComponent("Bilibili");
  const _component_Story = common_vendor.resolveComponent("Story");
  const _component_ZhiHu = common_vendor.resolveComponent("ZhiHu");
  const _component_XiaoHongShu = common_vendor.resolveComponent("XiaoHongShu");
  const _component_Weibo = common_vendor.resolveComponent("Weibo");
  const _component_Title = common_vendor.resolveComponent("Title");
  const _component_AchievementCollected = common_vendor.resolveComponent("AchievementCollected");
  const _component_AchievementIssued = common_vendor.resolveComponent("AchievementIssued");
  (_component_Link + _component_Bilibili + _component_Story + _component_ZhiHu + _component_XiaoHongShu + _component_Weibo + _component_Title + _component_AchievementCollected + _component_AchievementIssued)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $options.match("link")
  }, $options.match("link") ? {
    b: common_vendor.o($options.back),
    c: common_vendor.o($options.confirm),
    d: common_vendor.o($options.deleteModule),
    e: common_vendor.p({
      groupIndex: $props.groupIndex,
      moduleIndex: $props.moduleIndex,
      config: $props.config
    })
  } : {}, {
    f: $options.match("bilibili")
  }, $options.match("bilibili") ? {
    g: common_vendor.o($options.back),
    h: common_vendor.o($options.confirm),
    i: common_vendor.o($options.deleteModule),
    j: common_vendor.p({
      groupIndex: $props.groupIndex,
      moduleIndex: $props.moduleIndex,
      config: $props.config
    })
  } : {}, {
    k: $options.match("story")
  }, $options.match("story") ? {
    l: common_vendor.o($options.back),
    m: common_vendor.o($options.confirm),
    n: common_vendor.o($options.deleteModule),
    o: common_vendor.p({
      groupIndex: $props.groupIndex,
      moduleIndex: $props.moduleIndex,
      config: $props.config
    })
  } : {}, {
    p: $options.match("zhihu")
  }, $options.match("zhihu") ? {
    q: common_vendor.o($options.back),
    r: common_vendor.o($options.confirm),
    s: common_vendor.o($options.deleteModule),
    t: common_vendor.p({
      groupIndex: $props.groupIndex,
      moduleIndex: $props.moduleIndex,
      config: $props.config
    })
  } : {}, {
    v: $options.match("xiaohongshu")
  }, $options.match("xiaohongshu") ? {
    w: common_vendor.o($options.back),
    x: common_vendor.o($options.confirm),
    y: common_vendor.o($options.deleteModule),
    z: common_vendor.p({
      groupIndex: $props.groupIndex,
      moduleIndex: $props.moduleIndex,
      config: $props.config
    })
  } : {}, {
    A: $options.match("weibo")
  }, $options.match("weibo") ? {
    B: common_vendor.o($options.back),
    C: common_vendor.o($options.confirm),
    D: common_vendor.o($options.deleteModule),
    E: common_vendor.p({
      groupIndex: $props.groupIndex,
      moduleIndex: $props.moduleIndex,
      config: $props.config
    })
  } : {}, {
    F: $options.match("title")
  }, $options.match("title") ? {
    G: common_vendor.o($options.back),
    H: common_vendor.o($options.confirm),
    I: common_vendor.o($options.deleteModule),
    J: common_vendor.p({
      groupIndex: $props.groupIndex,
      moduleIndex: $props.moduleIndex,
      config: $props.config
    })
  } : {}, {
    K: $options.match("AchievementCollected")
  }, $options.match("AchievementCollected") ? {
    L: common_vendor.o($options.back),
    M: common_vendor.o($options.confirm),
    N: common_vendor.o($options.deleteModule),
    O: common_vendor.p({
      groupIndex: $props.groupIndex,
      moduleIndex: $props.moduleIndex,
      config: $props.config
    })
  } : {}, {
    P: $options.match("AchievementIssued")
  }, $options.match("AchievementIssued") ? {
    Q: common_vendor.o($options.back),
    R: common_vendor.o($options.confirm),
    S: common_vendor.o($options.deleteModule),
    T: common_vendor.p({
      groupIndex: $props.groupIndex,
      moduleIndex: $props.moduleIndex,
      config: $props.config
    })
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/modules/ModuleConfig.vue"]]);
wx.createComponent(Component);
