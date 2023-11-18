"use strict";
const library_apis = require("../../library/apis.js");
const store_storage = require("../../store/storage.js");
const library_consts = require("../../library/consts.js");
const common_vendor = require("../../common/vendor.js");
const SPIcon = () => "./SPIcon.js";
const IconFont = () => "./IconFont.js";
const TextInput = () => "./TextInput.js";
const TextareaInput = () => "./TextareaInput.js";
const LoginModal = () => "../../app/mobile/loginModal.js";
const BannerView = () => "./BannerView.js";
const _sfc_main = {
  components: {
    SPIcon,
    IconFont,
    TextInput,
    TextareaInput,
    LoginModal,
    BannerView
  },
  props: {
    modelValue: "",
    defaultValue: library_consts.PROFILE_CONSTS.DEFAULT_ACCOUNT_AVATAR
  },
  data() {
    return {};
  },
  computed: {
    accountId() {
      const storage = store_storage.useStorage();
      return storage.$state.accountId;
    }
  },
  async created() {
  },
  methods: {
    triggerUpload() {
      if (!this.accountId) {
        this.$refs.LoginModal.show();
        return;
      }
      this.$refs.uploader.choose();
    },
    getImage() {
      return this.modelValue || this.defaultValue;
    },
    async upload(data) {
      const tempFilePaths = data == null ? void 0 : data.tempFilePaths;
      if (!tempFilePaths || !tempFilePaths.length)
        return;
      const filepath = tempFilePaths[0];
      const res = await library_apis.apiService.UploadImage(filepath);
      const imageUri = (res == null ? void 0 : res.image_uri) || "";
      if (imageUri) {
        this.$emit("update:modelValue", imageUri);
      }
    }
  }
};
if (!Array) {
  const _component_BannerView = common_vendor.resolveComponent("BannerView");
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _component_LoginModal = common_vendor.resolveComponent("LoginModal");
  (_component_BannerView + _easycom_uni_file_picker2 + _component_LoginModal)();
}
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
if (!Math) {
  _easycom_uni_file_picker();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.triggerUpload && $options.triggerUpload(...args)),
    b: common_vendor.p({
      value: $options.getImage()
    }),
    c: common_vendor.sr("uploader", "63a775bc-1"),
    d: common_vendor.o($options.upload),
    e: common_vendor.p({
      sourceType: ["album"],
      ["del-icon"]: false,
      ["file-mediatype"]: "image",
      limit: "1",
      ["disable-preview"]: true
    }),
    f: common_vendor.sr("LoginModal", "63a775bc-2")
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/base/BannerUploader.vue"]]);
wx.createComponent(Component);
