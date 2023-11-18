"use strict";
const common_vendor = require("../../../../common/vendor.js");
const library_apis = require("../../../../library/apis.js");
const store_storage = require("../../../../store/storage.js");
require("../../../../library/consts.js");
const ModuleConfigHeader = () => "../ModuleConfigHeader.js";
const TextInput = () => "../../../base/TextInput.js";
const TextareaInput = () => "../../../base/TextareaInput.js";
const LoginModal = () => "../../../../app/mobile/loginModal.js";
const _sfc_main = {
  props: {
    moduleIndex: -1,
    groupIndex: -1,
    profile: {}
  },
  components: {
    ModuleConfigHeader,
    TextInput,
    TextareaInput,
    LoginModal
  },
  created() {
  },
  computed: {
    accountId() {
      const { accountId } = store_storage.useStorage();
      return accountId;
    }
  },
  methods: {
    editing(info) {
      this.$emit("editing", info);
    },
    confirm() {
      this.back();
    },
    back() {
      this.$emit("editing", {
        type: "profile",
        config: {},
        groupIndex: -1,
        moduleIndex: -1
      });
    },
    uploadAvatar() {
      if (!this.accountId) {
        this.$refs.LoginModal.show();
        return;
      }
      console.log(">>>>>>>>>> avatarUploader", this.$refs.avatarUploader);
      this.$refs.avatarUploader.choose();
    },
    async avatarUpload(data) {
      const tempFilePaths = data == null ? void 0 : data.tempFilePaths;
      if (!tempFilePaths || !tempFilePaths.length)
        return;
      common_vendor.index.showLoading({
        title: "上传中"
      });
      try {
        const filepath = tempFilePaths[0];
        const res = await library_apis.apiService.UploadImage(filepath);
        const imageUri = (res == null ? void 0 : res.image_uri) || "";
        if (imageUri) {
          this.profile.spec.avatar = imageUri;
        }
      } finally {
        common_vendor.index.hideLoading();
      }
    },
    getAvatarImageStyle() {
      var _a, _b;
      return {
        "background": `url(${(_b = (_a = this.profile) == null ? void 0 : _a.spec) == null ? void 0 : _b.avatar}) no-repeat center center`,
        "background-size": "cover"
      };
    }
  }
};
if (!Array) {
  const _component_ModuleConfigHeader = common_vendor.resolveComponent("ModuleConfigHeader");
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _component_TextInput = common_vendor.resolveComponent("TextInput");
  const _component_TextareaInput = common_vendor.resolveComponent("TextareaInput");
  const _component_LoginModal = common_vendor.resolveComponent("LoginModal");
  (_component_ModuleConfigHeader + _easycom_uni_file_picker2 + _component_TextInput + _component_TextareaInput + _component_LoginModal)();
}
const _easycom_uni_file_picker = () => "../../../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
if (!Math) {
  _easycom_uni_file_picker();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(_ctx.deleteModule),
    b: common_vendor.p({
      groupIndex: $props.groupIndex,
      moduleIndex: $props.moduleIndex,
      title: "基础资料",
      description: "基础资料支持录入头像、描述等信息",
      icon: "fingerprint"
    }),
    c: common_vendor.s($options.getAvatarImageStyle()),
    d: common_vendor.o((...args) => $options.uploadAvatar && $options.uploadAvatar(...args)),
    e: common_vendor.sr("avatarUploader", "38e2c958-1"),
    f: common_vendor.o($options.avatarUpload),
    g: common_vendor.p({
      sourceType: ["album"],
      ["del-icon"]: false,
      ["file-mediatype"]: "image",
      limit: "1",
      ["disable-preview"]: true
    }),
    h: common_vendor.o(($event) => $props.profile.spec.title = $event),
    i: common_vendor.p({
      label: "昵称",
      placeholder: "请输入昵称",
      modelValue: $props.profile.spec.title
    }),
    j: common_vendor.o(($event) => $props.profile.spec.description = $event),
    k: common_vendor.p({
      label: "描述",
      placeholder: "请输入描述",
      modelValue: $props.profile.spec.description
    }),
    l: common_vendor.o(($event) => $props.profile.spec.slug = $event),
    m: common_vendor.p({
      prefix: "https://xxxxxx.com/",
      label: "个性域名",
      placeholder: "请输入个性域名",
      modelValue: $props.profile.spec.slug
    }),
    n: common_vendor.o((...args) => $options.back && $options.back(...args)),
    o: common_vendor.o((...args) => $options.confirm && $options.confirm(...args)),
    p: common_vendor.sr("LoginModal", "38e2c958-5")
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/modules/Metadata/Config.vue"]]);
wx.createComponent(Component);
