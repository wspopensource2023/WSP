"use strict";
const common_vendor = require("../../../../common/vendor.js");
const library_apis = require("../../../../library/apis.js");
require("../../../../store/storage.js");
require("../../../../library/consts.js");
const SPIcon = () => "../../../base/SPIcon.js";
const AchievementItem = () => "./AchievementItem.js";
const _sfc_main = {
  props: {
    config: {},
    profile: {}
  },
  components: {
    SPIcon,
    AchievementItem
  },
  data() {
    return {
      achievements: []
    };
  },
  async mounted() {
    await this.loadAchievements();
    console.log("achievements collected", this.achievements);
  },
  computed: {
    accountId() {
      var _a, _b;
      return (_b = (_a = this.profile) == null ? void 0 : _a.spec) == null ? void 0 : _b.accountId;
    }
  },
  methods: {
    getModuleStyle() {
      const style = common_vendor.lodashExports.clone(this.profile.spec.style["module.css"] || {});
      const borderRadius = parseInt(style["border-radius"]) || 0;
      if (borderRadius > 15) {
        style["border-radius"] = "15px";
      }
      return style;
    },
    async loadAchievements() {
      if (this.accountId) {
        const res = await library_apis.apiService.ListCollectedAchievement(
          this.accountId,
          1,
          10
        );
        this.achievements = res.achievement_list;
      }
    }
  }
};
if (!Array) {
  const _component_AchievementItem = common_vendor.resolveComponent("AchievementItem");
  _component_AchievementItem();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.achievements.length
  }, !$data.achievements.length ? {} : {}, {
    b: common_vendor.f($data.achievements, (item, k0, i0) => {
      return {
        a: "d4a798f3-0-" + i0,
        b: common_vendor.p({
          name: item.achievement_name,
          image: item.achievement_image,
          issuer: item.issuer,
          verified: true
        }),
        c: item
      };
    }),
    c: common_vendor.s($options.getModuleStyle())
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d4a798f3"], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/modules/AchievementCollected/View.vue"]]);
wx.createComponent(Component);
