"use strict";
const common_vendor = require("../../../../common/vendor.js");
const library_apis = require("../../../../library/apis.js");
require("../../../../store/storage.js");
require("../../../../library/consts.js");
const SPIcon = () => "../../../base/SPIcon.js";
const _sfc_main = {
  props: {
    config: {},
    profile: {}
  },
  components: {
    SPIcon
  },
  data() {
    return {
      achievements: []
    };
  },
  async mounted() {
    await this.loadAchievements();
  },
  computed: {
    accountId() {
      var _a, _b;
      return (_b = (_a = this.profile) == null ? void 0 : _a.spec) == null ? void 0 : _b.accountId;
    }
  },
  methods: {
    async jumpAchievementDetail(achievementId) {
      common_vendor.index.navigateTo({ url: `/app/mobile/achievement/detail?achievementId=${achievementId}` });
    },
    async loadAchievements() {
      const res = await library_apis.apiService.ListCollectedAchievement(
        this.accountId,
        1,
        10
      );
      this.achievements = res.achievement_list;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.achievements, (item, k0, i0) => {
      return {
        a: item.achievement_image,
        b: item.achievement_name,
        c: common_vendor.t(item.achievement_name),
        d: item.issuer.avatar,
        e: common_vendor.t(item.issuer.name),
        f: common_vendor.o(($event) => $options.jumpAchievementDetail(item.achievement_id), item),
        g: item
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/modules/AchievementCollected/Panel.vue"]]);
wx.createComponent(Component);
