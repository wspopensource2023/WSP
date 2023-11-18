"use strict";
const common_vendor = require("../../../common/vendor.js");
const library_apis = require("../../../library/apis.js");
const library_util = require("../../../library/util.js");
require("../../../store/storage.js");
require("../../../library/consts.js");
const IconFont = () => "../../../components/base/IconFont.js";
const AchievementItem = () => "../../../components/achievement/AchievementItem.js";
const CampaignItem = () => "../../../components/achievement/CampaignItem.js";
const BannerView = () => "../../../components/base/BannerView.js";
const _sfc_main = {
  data() {
    library_util.getCurrentPage();
    return {
      tabIndex: 1,
      // 1: 我的成就 2: 我的发行
      accountId: "",
      issuer: {},
      issuedCampaigns: [],
      issuedCampaignSkip: 1,
      issuedCampaignLimit: 10,
      campaign_list: [],
      isNoMore: true
    };
  },
  components: {
    IconFont,
    AchievementItem,
    CampaignItem,
    BannerView
  },
  async onLoad(options) {
    this.accountId = options.account_id;
    await this.prepareIssuer();
  },
  onReachBottom() {
    if (!this.isNoMore) {
      if (this.tabIndex === 1) {
        this.ListAccountCampaign();
      } else {
        this.ListAccountCampaignIssued();
      }
    }
  },
  methods: {
    async changeTab(type) {
      this.campaign_list = [];
      this.tabIndex = type;
      this.issuedCampaignSkip = 1;
      if (this.tabIndex === 1) {
        await this.ListAccountCampaign();
      } else {
        await this.ListAccountCampaignIssued();
      }
    },
    async jumpToDetailById(achievementId) {
      common_vendor.index.redirectTo({
        url: `/app/mobile/achievement/detail?achievementId=${achievementId}`
      });
    },
    async jumpToDetail(item) {
      if (item.campaign_type === "achievement") {
        const achievement_id = item.achievement_ids[0];
        this.jumpToDetailById(achievement_id);
      }
    },
    getBannerImage() {
      return this.issuer.account_banner || "https://static.xxxxxx.com/images/9214b8c6b205da3c1ecbd2faf63260bdb8653ddf78373f58584f9a7f751a473c.jpg";
    },
    jumpBack() {
      const pages = getCurrentPages();
      if (!pages || pages.length == 1) {
        common_vendor.index.switchTab({
          url: "/app/mobile/achievement/list"
        });
      }
      common_vendor.index.navigateBack();
    },
    async prepareIssuer() {
      const data = await library_apis.apiService.GetAccountProfile(this.accountId);
      this.issuer = data;
      this.issuer.register_time = library_util.dateFormat(
        new Date(this.issuer.register_time * 1e3),
        "yyyy-MM-dd"
      );
      if (this.issuer.issuer) {
        this.tabIndex = 2;
        this.ListAccountCampaignIssued();
      } else {
        this.tabIndex = 1;
        this.ListAccountCampaign();
      }
    },
    async ListAccountCampaignIssued() {
      const res = await library_apis.apiService.ListAccountCampaignIssued(
        this.accountId,
        this.issuedCampaignLimit,
        this.issuedCampaignSkip
      );
      if (res) {
        this.campaign_list.push(...res);
        if (res.length >= this.issuedCampaignLimit) {
          this.issuedCampaignSkip++;
          this.isNoMore = false;
        } else {
          this.isNoMore = true;
        }
      }
    },
    async ListAccountCampaign() {
      const res = await library_apis.apiService.ListAccountCampaign(
        this.accountId,
        this.issuedCampaignLimit,
        this.issuedCampaignSkip
      );
      if (res) {
        this.campaign_list.push(...res);
        if (res.length >= this.issuedCampaignLimit) {
          this.issuedCampaignSkip++;
          this.isNoMore = false;
        } else {
          this.isNoMore = true;
        }
      }
    }
  }
};
if (!Array) {
  const _component_BannerView = common_vendor.resolveComponent("BannerView");
  const _component_AchievementItem = common_vendor.resolveComponent("AchievementItem");
  const _component_CampaignItem = common_vendor.resolveComponent("CampaignItem");
  (_component_BannerView + _component_AchievementItem + _component_CampaignItem)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.jumpBack && $options.jumpBack(...args)),
    b: common_vendor.p({
      value: $data.issuer.account_banner
    }),
    c: $data.issuer.account_avatar,
    d: common_vendor.t($data.issuer.account_name),
    e: common_vendor.t($data.issuer.register_time),
    f: common_vendor.o(($event) => $options.changeTab(1)),
    g: $data.tabIndex === 1 ? 1 : "",
    h: common_vendor.o(($event) => $options.changeTab(2)),
    i: $data.tabIndex === 2 ? 1 : "",
    j: $data.tabIndex === 2
  }, $data.tabIndex === 2 ? common_vendor.e({
    k: $data.campaign_list && $data.campaign_list.length
  }, $data.campaign_list && $data.campaign_list.length ? {
    l: common_vendor.f($data.campaign_list, (item, k0, i0) => {
      return common_vendor.e({
        a: item.campaign_type === "achievement"
      }, item.campaign_type === "achievement" ? {
        b: "d055b576-1-" + i0,
        c: common_vendor.p({
          data: item
        })
      } : {}, {
        d: item.campaign_type === "campaign"
      }, item.campaign_type === "campaign" ? {
        e: "d055b576-2-" + i0,
        f: common_vendor.p({
          data: item
        })
      } : {}, {
        g: common_vendor.o(($event) => $options.jumpToDetail(item), item),
        h: item
      });
    })
  } : {}) : {}, {
    m: $data.tabIndex === 1
  }, $data.tabIndex === 1 ? common_vendor.e({
    n: $data.campaign_list && $data.campaign_list.length
  }, $data.campaign_list && $data.campaign_list.length ? {
    o: common_vendor.f($data.campaign_list, (item, k0, i0) => {
      return {
        a: item.campaign_image,
        b: item.campaign_image,
        c: common_vendor.t(item.campaign_name),
        d: item.issuer_avatar,
        e: common_vendor.t(item.issuer_name),
        f: common_vendor.o(($event) => $options.jumpToDetailById(item.achievement_id), item),
        g: item
      };
    })
  } : {}) : {}, {
    p: !($data.campaign_list && $data.campaign_list.length)
  }, !($data.campaign_list && $data.campaign_list.length) ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/app/mobile/achievement/issuer.vue"]]);
wx.createPage(MiniProgramPage);
