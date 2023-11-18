"use strict";
const common_vendor = require("../../../common/vendor.js");
const library_apis = require("../../../library/apis.js");
const store_storage = require("../../../store/storage.js");
require("../../../library/consts.js");
const IconFont = () => "../../../components/base/IconFont.js";
const SBTImage = () => "../../../components/achievement/SBTImage.js";
const _sfc_main = {
  onShow() {
    this.loadBannerInfo();
    this.page = 1;
    this.achievementList = [];
    this.userAchievementList = [];
    this.campaignList = [];
    this.getUserAchievements();
    this.getCampaignList(true);
  },
  data() {
    return {
      isLoading: false,
      page: 1,
      pageSize: 10,
      userAchievementList: [],
      campaignList: [],
      achievementList: [],
      keywords: "",
      currentSBTProfile: {},
      bannerInfo: {}
    };
  },
  computed: {
    accountId() {
      const storage = store_storage.useStorage();
      return storage.$state.accountId;
    }
  },
  methods: {
    getBannerStyle() {
      var _a;
      return `background: url(${(_a = this.bannerInfo) == null ? void 0 : _a.image}) center center no-repeat; background-size: cover;`;
    },
    jumpAchievement(item) {
      this.jumpAchievementDetail(item.achievement_id);
    },
    async loadBannerInfo() {
      const res = await library_apis.apiService.GetAchievementMobileBannerInfo();
      console.log("getBannerInfo", res);
      this.bannerInfo = res;
    },
    async getUserAchievements() {
      const res = await library_apis.apiService.ListUserAchievements(
        this.accountId,
        this.page,
        this.pageSize
      );
      this.userAchievementList = res.achievement_list;
    },
    async getCampaignList(init) {
      common_vendor.index.showLoading({
        title: "加载中",
        mask: true
      });
      try {
        const res = await library_apis.apiService.ListCampaign(
          null,
          this.page,
          this.pageSize
        );
        if (init) {
          this.campaignList = res.campaign_list;
        } else {
          this.campaignList.push(...res.campaign_list);
        }
        console.log(this.campaignList, "this.campaignList");
      } finally {
        common_vendor.index.hideLoading();
      }
    },
    async getAchievementList() {
      common_vendor.index.showLoading({
        title: "加载中",
        mask: true
      });
      try {
        const res = await library_apis.apiService.ListAchievement(
          this.page,
          this.pageSize,
          this.keywords
        );
        this.achievementList = res.achievement_list;
      } finally {
        common_vendor.index.hideLoading();
      }
    },
    async loadMore() {
      if (this.isLoading)
        return;
      this.isLoading = true;
      this.page++;
      const res = await library_apis.apiService.ListCampaign(
        this.page,
        this.pageSize,
        this.keywords
      );
      this.campaignList = [
        ...this.campaignList,
        ...res.campaignList
      ];
    },
    async onSearch() {
      this.page = 1;
      await this.getAchievementList();
    },
    async onCancel() {
      this.page = 1;
      this.keywords = "";
      await this.getAchievementList();
    },
    async jumpIssuer(account_id) {
      common_vendor.index.navigateTo({ url: `/app/mobile/achievement/issuer?account_id=${account_id}` });
    },
    async jumpAchievementDetail(achievementId) {
      common_vendor.index.navigateTo({ url: `/app/mobile/achievement/detail?achievementId=${achievementId}` });
    },
    jumpBannerPage() {
      common_vendor.index.navigateTo({ url: `/app/mobile/achievement/banner` });
    }
  },
  components: {
    IconFont,
    SBTImage
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c;
  return common_vendor.e({
    a: (_a = $data.bannerInfo) == null ? void 0 : _a.state
  }, ((_b = $data.bannerInfo) == null ? void 0 : _b.state) ? {
    b: common_vendor.s($options.getBannerStyle()),
    c: common_vendor.t((_c = $data.bannerInfo) == null ? void 0 : _c.title),
    d: common_vendor.o((...args) => $options.jumpBannerPage && $options.jumpBannerPage(...args))
  } : {}, {
    e: !($data.userAchievementList && $data.userAchievementList.length)
  }, !($data.userAchievementList && $data.userAchievementList.length) ? {} : {}, {
    f: $data.userAchievementList && $data.userAchievementList.length
  }, $data.userAchievementList && $data.userAchievementList.length ? {
    g: common_vendor.f($data.userAchievementList, (item, k0, i0) => {
      return {
        a: item.achievement_image,
        b: item.achievement_name,
        c: common_vendor.t(item.achievement_name),
        d: common_vendor.t(item.achievement_summary),
        e: common_vendor.o(($event) => $options.jumpAchievement(item), item),
        f: item
      };
    })
  } : {}, {
    h: common_vendor.f($data.campaignList, (item, k0, i0) => {
      return {
        a: item.campaign_image,
        b: item.achievement_name,
        c: common_vendor.t(item.campaign_name),
        d: item.issuer_avatar,
        e: common_vendor.t(item.issuer_name),
        f: common_vendor.t(item.campaign_summary),
        g: item,
        h: common_vendor.o(($event) => $options.jumpAchievementDetail(item.achievement_ids[0]), item)
      };
    }),
    i: common_vendor.o((...args) => $options.loadMore && $options.loadMore(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/app/mobile/achievement/list.vue"]]);
wx.createPage(MiniProgramPage);
