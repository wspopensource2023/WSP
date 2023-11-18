"use strict";
const common_vendor = require("../../../common/vendor.js");
const library_apis = require("../../../library/apis.js");
const store_storage = require("../../../store/storage.js");
const library_consts = require("../../../library/consts.js");
const SPIcon = () => "../../../components/base/SPIcon.js";
const IconFont = () => "../../../components/base/IconFont.js";
const TextInput = () => "../../../components/base/TextInput.js";
const TextareaInput = () => "../../../components/base/TextareaInput.js";
const AvatarUploader = () => "../../../components/base/AvatarUploader.js";
const BannerUploader = () => "../../../components/base/BannerUploader.js";
const _sfc_main = {
  components: {
    SPIcon,
    IconFont,
    TextInput,
    TextareaInput,
    AvatarUploader,
    BannerUploader
  },
  data() {
    return {
      config: {
        avatar: "",
        name: "",
        description: "",
        banner: ""
      }
    };
  },
  computed: {
    accountId() {
      const storage = store_storage.useStorage();
      return storage.$state.accountId;
    }
  },
  async onShow() {
    if (!this.accountId) {
      common_vendor.index.navigateTo({
        url: "/app/mobile/login"
      });
      return;
    }
    await this.loadMe();
  },
  async created() {
  },
  methods: {
    getAvatarImageStyle() {
      const avatar = this.config.avatar || library_consts.PROFILE_CONSTS.DEFAULT_ACCOUNT_AVATAR;
      return {
        "background": `url(${avatar}) no-repeat center center`,
        "background-size": "cover"
      };
    },
    async save() {
      await library_apis.apiService.UpdateAccountProfile({
        avatar: this.config.avatar,
        name: this.config.name,
        desc: this.config.description,
        banner: this.config.banner
      });
      this.back();
    },
    back() {
      common_vendor.index.switchTab({
        url: "/app/mobile/user/me"
      });
    },
    async loadMe() {
      common_vendor.index.showLoading({
        title: "加载中",
        mask: true
      });
      let res;
      try {
        res = await library_apis.apiService.Me(true);
      } finally {
        this.config = {
          avatar: res.avatar || store_storage.getDefaultAvatar(),
          name: res.name || "",
          description: res.desc || "",
          banner: res.banner || store_storage.getDefaultBanner()
        };
        common_vendor.index.hideLoading();
      }
    },
    async bannerUpload(data) {
      const tempFilePaths = data == null ? void 0 : data.tempFilePaths;
      if (!tempFilePaths || !tempFilePaths.length)
        return;
      const filepath = tempFilePaths[0];
      const res = await library_apis.apiService.UploadImage(filepath);
      const imageUri = (res == null ? void 0 : res.image_uri) || "";
      if (imageUri) {
        this.config.banner = imageUri;
      }
    },
    async avatarUpload(data) {
      const tempFilePaths = data == null ? void 0 : data.tempFilePaths;
      if (!tempFilePaths || !tempFilePaths.length)
        return;
      const filepath = tempFilePaths[0];
      const res = await library_apis.apiService.UploadImage(filepath);
      const imageUri = (res == null ? void 0 : res.image_uri) || "";
      if (imageUri) {
        this.config.avatar = imageUri;
      }
    }
  }
};
if (!Array) {
  const _component_BannerUploader = common_vendor.resolveComponent("BannerUploader");
  const _component_AvatarUploader = common_vendor.resolveComponent("AvatarUploader");
  const _component_TextInput = common_vendor.resolveComponent("TextInput");
  const _component_TextareaInput = common_vendor.resolveComponent("TextareaInput");
  (_component_BannerUploader + _component_AvatarUploader + _component_TextInput + _component_TextareaInput)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.config.banner = $event),
    b: common_vendor.p({
      modelValue: $data.config.banner
    }),
    c: common_vendor.o(($event) => $data.config.avatar = $event),
    d: common_vendor.p({
      modelValue: $data.config.avatar
    }),
    e: common_vendor.o(($event) => $data.config.name = $event),
    f: common_vendor.p({
      label: "昵称",
      placeholder: "请输入昵称",
      modelValue: $data.config.name
    }),
    g: common_vendor.o(($event) => $data.config.description = $event),
    h: common_vendor.p({
      label: "描述",
      placeholder: "请输入描述",
      modelValue: $data.config.description
    }),
    i: common_vendor.o((...args) => $options.back && $options.back(...args)),
    j: common_vendor.o((...args) => $options.save && $options.save(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/app/mobile/user/edit.vue"]]);
wx.createPage(MiniProgramPage);
