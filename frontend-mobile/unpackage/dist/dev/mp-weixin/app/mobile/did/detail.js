"use strict";
const common_vendor = require("../../../common/vendor.js");
require("../../../store/storage.js");
const library_apis = require("../../../library/apis.js");
require("../../../library/consts.js");
const Profile = () => "../../../components/did/modules/Profile/Profile.js";
const IconFont = () => "../../../components/base/IconFont.js";
const ShareModal = () => "../../../components/did/ShareModal.js";
const _sfc_main = {
  data() {
    return {
      loading: true,
      success: false,
      did: "",
      profile: {}
    };
  },
  async created() {
  },
  async onLoad(options) {
    console.log("options:", options);
    let did = options.did;
    const scene = this.getScene(options);
    if (scene) {
      try {
        const res = await library_apis.apiService.GetRealParams(scene);
        did = res.did;
      } catch (e) {
        console.log("failed to GetRealParams", e);
      }
    }
    this.did = did;
    console.log("did", this.did);
    if (!this.did) {
      this.jumpBack();
      return;
    }
    await this.loadProfile();
  },
  computed: {
    accountId() {
      const storage = useStorage();
      return storage.$state.accountId;
    }
  },
  methods: {
    showShare() {
      this.$refs.ShareModal.show();
    },
    getScene(options) {
      var _a, _b;
      if (options.q) {
        try {
          const url = decodeURIComponent(options.q);
          const scene = (_b = (_a = urlparse(url, true)) == null ? void 0 : _a.query) == null ? void 0 : _b.scene;
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
    jumpBack() {
      const pages = getCurrentPages();
      if (!pages || pages.length == 1) {
        common_vendor.index.switchTab({ url: "/app/mobile/did/list" });
      }
      common_vendor.index.navigateBack();
    },
    async loadProfile() {
      try {
        if (this.did) {
          let res = await library_apis.apiService.GetProfile(this.did);
          this.profile = res.profile;
          this.loading = false;
          this.success = true;
          console.log("!!!", this.profile);
          return;
        }
      } catch (e) {
        this.loading = false;
      }
    }
  },
  components: {
    Profile,
    IconFont,
    ShareModal
  }
};
if (!Array) {
  const _component_Profile = common_vendor.resolveComponent("Profile");
  const _component_ShareModal = common_vendor.resolveComponent("ShareModal");
  (_component_Profile + _component_ShareModal)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.jumpBack && $options.jumpBack(...args)),
    b: common_vendor.o((...args) => $options.showShare && $options.showShare(...args)),
    c: $data.success
  }, $data.success ? {
    d: common_vendor.p({
      profile: $data.profile
    })
  } : {}, {
    e: common_vendor.sr("ShareModal", "e154a8e6-1"),
    f: common_vendor.p({
      profile: $data.profile
    }),
    g: !$data.loading && !$data.success
  }, !$data.loading && !$data.success ? {
    h: common_vendor.t($data.did),
    i: common_vendor.o((...args) => _ctx.back && _ctx.back(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/app/mobile/did/detail.vue"]]);
wx.createPage(MiniProgramPage);
