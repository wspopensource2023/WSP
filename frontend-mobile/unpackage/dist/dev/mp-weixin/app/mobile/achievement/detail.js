"use strict";
const common_vendor = require("../../../common/vendor.js");
const library_apis = require("../../../library/apis.js");
const store_storage = require("../../../store/storage.js");
const library_util = require("../../../library/util.js");
require("../../../library/consts.js");
const IconFont = () => "../../../components/base/IconFont.js";
const SBTImage = () => "../../../components/achievement/SBTImage.js";
const LoginModal = () => "../loginModal.js";
const CollectModal = () => "../../../components/achievement/CollectModal.js";
const _sfc_main = {
  data() {
    return {
      achievementId: "",
      achievement: {},
      participants: [],
      participantsTotal: 0,
      isCollectable: false,
      isCollected: false,
      isAutoComplteConditionFinished: false,
      isFirstLoad: true
    };
  },
  components: {
    IconFont,
    SBTImage,
    Icon: common_vendor.Icon,
    LoginModal,
    CollectModal
  },
  computed: {
    accountId() {
      const storage = store_storage.useStorage();
      return storage.$state.accountId;
    }
  },
  onShareAppMessage(res) {
    return {
      title: "xxxxxx",
      path: `app/mobile/achievement/detail?achievementId=${this.achievementId}`
    };
  },
  onShareTimeline() {
    return {
      title: "xxxxxx",
      path: `app/mobile/achievement/detail?achievementId=${this.achievementId}`
    };
  },
  async onLoad(options) {
    console.log("options:", options);
    let achievementId = options.achievementId;
    const scene = this.getScene(options);
    if (scene) {
      try {
        const res = await library_apis.apiService.GetRealParams(scene);
        achievementId = res.achievement_id;
      } catch (e) {
        console.log("failed to GetRealParams", e);
      }
    }
    this.achievementId = achievementId;
    if (!this.achievementId) {
      this.jumpBack();
      return;
    }
    this.getAchievementDetail();
    this.getParticipants();
    this.autoCompleteCondition();
  },
  async onShow() {
    this.getAchievementDetail();
    this.getParticipants();
    this.autoCompleteCondition();
  },
  methods: {
    getScene(options) {
      var _a, _b;
      if (options.q) {
        try {
          const url = decodeURIComponent(options.q);
          const scene = (_b = (_a = common_vendor.urlParse(url, true)) == null ? void 0 : _a.query) == null ? void 0 : _b.scene;
          if (scene) {
            return scene;
          }
        } catch (e) {
          console.log("failed to GetRealParams", e);
        }
      }
      if (options.scene) {
        try {
          return decodeURIComponent(options.scene);
        } catch (e) {
          console.log("failed to GetRealParams", e);
        }
      }
      return null;
    },
    getAchievementId() {
      try {
        return library_util.getCurrentPage().$page.options.achievementId;
      } catch (e) {
        this.jumpBack();
      }
    },
    showLoginModal() {
      this.$refs.LoginModal.show();
    },
    async autoCompleteCondition() {
      const self = this;
      let internvalId;
      internvalId = setInterval(async () => {
        if (this.isAutoComplteConditionFinished) {
          clearInterval(internvalId);
          return;
        }
        await (async () => {
          if (!self.achievement.achievement_id || !self.accountId) {
            return;
          }
          if (!(this.achievement.condition_list && this.achievement.condition_list.length === 1)) {
            return;
          }
          if (!self.accountId) {
            return;
          }
          const conditon = this.achievement.condition_list[0];
          await library_apis.apiService.VerifyCondition(
            self.achievement.achievement_id,
            conditon.condition_template_id,
            {}
          );
          self.isAutoComplteConditionFinished = true;
          await self.getAchievementDetail();
        })();
      }, 1e3);
    },
    jumpIssuer(account_id) {
      common_vendor.index.navigateTo({ url: `/app/mobile/achievement/issuer?account_id=${account_id}` });
    },
    jumpBack() {
      const pages = getCurrentPages();
      if (!pages || pages.length == 1) {
        common_vendor.index.switchTab({ url: "/app/mobile/achievement/list" });
      }
      common_vendor.index.navigateBack();
    },
    async getParticipants() {
      const res = await library_apis.apiService.ListAchievementParticipant(
        this.achievementId,
        1,
        30
      );
      this.participantsTotal = res.total_count;
      this.participants = res.data;
    },
    async getAchievementDetail() {
      if (this.isFirstLoad) {
        common_vendor.index.showLoading({
          title: "加载中",
          mask: true
        });
      }
      if (!this.achievementId) {
        return;
      }
      this.achievement = await library_apis.apiService.GetAchievement(
        this.achievementId
      );
      this.isFirstLoad = false;
      common_vendor.index.hideLoading();
    },
    getCollectBtnText() {
      if (!this.achievement.achievement_id) {
        return "加载中";
      }
      let status = "finished";
      this.isCollectable = false;
      this.achievement.condition_list.forEach((item) => {
        if (item.status !== "finished") {
          status = "unfinished";
        }
      });
      if (!(this.achievement.condition_list && this.achievement.condition_list.length)) {
        return "活动筹备中";
      }
      const currentTime = Date.now() / 1e3;
      if (common_vendor.hooks(this.achievement.issuance_start_time).unix() > currentTime) {
        return "活动尚未开始";
      }
      if (common_vendor.hooks(this.achievement.issuance_end_time).unix() < currentTime) {
        return "活动已结束";
      }
      if (this.achievement.is_received) {
        return "已领取";
      }
      if (status === "unfinished") {
        return "尚未达成领取条件";
      }
      this.isCollectable = true;
      return "立即领取";
    },
    async collectAchievement() {
      try {
        await library_apis.apiService.CollectAchievement(
          this.achievementId
        );
        this.$refs.CollectModal.show();
      } catch (e) {
      }
      this.getAchievementDetail();
      this.getParticipants();
    }
  }
};
if (!Array) {
  const _component_di = common_vendor.resolveComponent("di");
  const _component_LoginModal = common_vendor.resolveComponent("LoginModal");
  const _component_CollectModal = common_vendor.resolveComponent("CollectModal");
  (_component_di + _component_LoginModal + _component_CollectModal)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c, _d;
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.jumpBack && $options.jumpBack(...args)),
    b: common_vendor.t($data.achievement.achievement_name),
    c: common_vendor.f($data.achievement.achievement_tags, (item, k0, i0) => {
      return {
        a: common_vendor.t(item),
        b: item
      };
    }),
    d: $data.achievement.achievement_image
  }, $data.achievement.achievement_image ? {
    e: $data.achievement.achievement_image
  } : {}, {
    f: common_vendor.t($data.achievement.achievement_summary),
    g: (_a = $data.achievement.issuer) == null ? void 0 : _a.avatar,
    h: (_b = $data.achievement.issuer) == null ? void 0 : _b.name,
    i: common_vendor.t((_c = $data.achievement.issuer) == null ? void 0 : _c.name),
    j: common_vendor.t((_d = $data.achievement.issuer) == null ? void 0 : _d.desc),
    k: common_vendor.o(($event) => $options.jumpIssuer($data.achievement.issuer_account_id)),
    l: common_vendor.t($data.achievement.issuance_start_time || "暂无"),
    m: common_vendor.t($data.achievement.issuance_end_time || "暂无"),
    n: common_vendor.t($data.achievement.issuance_quantity || "暂无"),
    o: common_vendor.f($data.achievement.condition_list, (item, k0, i0) => {
      var _a2, _b2;
      return common_vendor.e({
        a: (item == null ? void 0 : item.status) === "finished"
      }, (item == null ? void 0 : item.status) === "finished" ? {} : {}, {
        b: common_vendor.t((_a2 = item == null ? void 0 : item.condition_template) == null ? void 0 : _a2.condition_name),
        c: (item == null ? void 0 : item.status) === "finished"
      }, (item == null ? void 0 : item.status) === "finished" ? {} : {}, {
        d: (item == null ? void 0 : item.status) === "unfinished"
      }, (item == null ? void 0 : item.status) === "unfinished" ? {} : {}, {
        e: common_vendor.t((_b2 = item == null ? void 0 : item.condition_template) == null ? void 0 : _b2.condition_description),
        f: item
      });
    }),
    p: $data.achievement.achievement_introduction,
    q: $data.participants.length
  }, $data.participants.length ? {
    r: common_vendor.t($data.participantsTotal),
    s: common_vendor.f($data.participants, (item, k0, i0) => {
      return {
        a: item.avatar,
        b: item.slug,
        c: common_vendor.o(($event) => $options.jumpIssuer(item.account_id), item),
        d: item
      };
    })
  } : {}, {
    t: !$options.accountId
  }, !$options.accountId ? {
    v: common_vendor.o((...args) => $options.showLoginModal && $options.showLoginModal(...args))
  } : {}, {
    w: $options.accountId
  }, $options.accountId ? common_vendor.e({
    x: !$data.isCollectable
  }, !$data.isCollectable ? {
    y: common_vendor.t($options.getCollectBtnText()),
    z: common_vendor.o((...args) => $options.collectAchievement && $options.collectAchievement(...args))
  } : {}, {
    A: $data.isCollectable
  }, $data.isCollectable ? {
    B: common_vendor.t($options.getCollectBtnText()),
    C: common_vendor.o((...args) => $options.collectAchievement && $options.collectAchievement(...args))
  } : {}) : {}, {
    D: common_vendor.sr("LoginModal", "030b3edd-1"),
    E: common_vendor.sr("CollectModal", "030b3edd-2"),
    F: common_vendor.p({
      achievement: $data.achievement
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/app/mobile/achievement/detail.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
