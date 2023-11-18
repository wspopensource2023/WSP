"use strict";
const common_vendor = require("../../../common/vendor.js");
const library_apis = require("../../../library/apis.js");
require("../../../store/storage.js");
require("../../../library/consts.js");
const IconFont = () => "../../../components/base/IconFont.js";
const _sfc_main = {
  components: {
    IconFont
  },
  data() {
    return {
      bannerInfo: {}
    };
  },
  onShow() {
    this.loadBannerInfo();
  },
  methods: {
    getCoverImageStyle() {
      return {
        "background": `url(${this.bannerInfo.image}) center center no-repeat`
      };
    },
    jumpBack() {
      const pages = getCurrentPages();
      if (!pages || pages.length == 1) {
        common_vendor.index.switchTab({ url: "/app/mobile/achievement/list" });
      }
      common_vendor.index.navigateBack();
    },
    async loadBannerInfo() {
      const res = await library_apis.apiService.GetAchievementMobileBannerInfo();
      console.log("getBannerInfo", res);
      this.bannerInfo = res;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.jumpBack && $options.jumpBack(...args)),
    b: $data.bannerInfo.content
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/app/mobile/achievement/banner.vue"]]);
wx.createPage(MiniProgramPage);
