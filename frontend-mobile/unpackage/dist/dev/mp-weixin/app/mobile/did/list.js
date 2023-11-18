"use strict";
const common_vendor = require("../../../common/vendor.js");
const store_storage = require("../../../store/storage.js");
const library_apis = require("../../../library/apis.js");
require("../../../library/consts.js");
const SearchModal = () => "../../../components/did/SearchModal.js";
const _sfc_main = {
  data() {
    return {
      loading: true,
      bannerInfo: {}
    };
  },
  computed: {
    profiles() {
      var _a, _b;
      const storage = store_storage.useStorage();
      return (_b = (_a = storage.$state) == null ? void 0 : _a.account) == null ? void 0 : _b.profiles;
    },
    hasProfiles() {
      return this.profiles && this.profiles.length;
    }
  },
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
  onShow() {
    this.loadBannerInfo();
    this.load();
  },
  methods: {
    getBannerStyle() {
      var _a;
      return `background: url(${(_a = this.bannerInfo) == null ? void 0 : _a.image}) center center no-repeat; background-size: cover;`;
    },
    search() {
      this.$refs.SearchModal.show();
    },
    createProfile() {
      common_vendor.index.navigateTo({
        url: `/app/mobile/did/edit`
      });
    },
    jumpProfileEditPage(profile) {
      const profileId = profile.spec.profileId;
      common_vendor.index.navigateTo({
        url: `/app/mobile/did/edit?profileId=${profileId}`
      });
    },
    jumpBannerPage() {
      common_vendor.index.navigateTo({ url: `/app/mobile/did/banner` });
    },
    async load() {
      const {
        commitMe
      } = store_storage.useStorage();
      const res = await library_apis.apiService.Me();
      commitMe(res);
    },
    async loadBannerInfo() {
      const res = await library_apis.apiService.GetDIDMobileBannerInfo();
      this.bannerInfo = res;
    }
  },
  components: {
    SearchModal
  }
};
if (!Array) {
  const _component_SearchModal = common_vendor.resolveComponent("SearchModal");
  _component_SearchModal();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c;
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.search && $options.search(...args)),
    b: (_a = $data.bannerInfo) == null ? void 0 : _a.state
  }, ((_b = $data.bannerInfo) == null ? void 0 : _b.state) ? {
    c: common_vendor.s($options.getBannerStyle()),
    d: common_vendor.t((_c = $data.bannerInfo) == null ? void 0 : _c.title),
    e: common_vendor.o((...args) => $options.jumpBannerPage && $options.jumpBannerPage(...args))
  } : {}, {
    f: !$options.hasProfiles
  }, !$options.hasProfiles ? {} : {}, {
    g: $options.hasProfiles
  }, $options.hasProfiles ? {
    h: common_vendor.f($options.profiles, (profile, k0, i0) => {
      var _a2, _b2, _c2, _d;
      return {
        a: (_a2 = profile == null ? void 0 : profile.spec) == null ? void 0 : _a2.avatar,
        b: common_vendor.t((_b2 = profile == null ? void 0 : profile.spec) == null ? void 0 : _b2.title),
        c: common_vendor.t((_c2 = profile == null ? void 0 : profile.spec) == null ? void 0 : _c2.slug),
        d: common_vendor.t((_d = profile == null ? void 0 : profile.spec) == null ? void 0 : _d.description),
        e: common_vendor.o(($event) => $options.jumpProfileEditPage(profile), profile),
        f: profile
      };
    }),
    i: !$data.loading
  } : {}, {
    j: common_vendor.o((...args) => $options.createProfile && $options.createProfile(...args)),
    k: common_vendor.sr("SearchModal", "5f014e5a-0")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/app/mobile/did/list.vue"]]);
wx.createPage(MiniProgramPage);
